import {
  Injectable,
  ForbiddenException,
  ServiceUnavailableException,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class PharmacyPermissionService {
  private readonly pharmacyServiceUrl =
    process.env.PHARMACY_SERVICE_URL || 'http://sophia-pharmacy-service:8080';

  async validatePermission(
    pharmacyId: number,
    authorization?: string,
  ): Promise<void> {
    if (!authorization || !authorization.startsWith('Bearer ')) {
      throw new UnauthorizedException('Authorization Bearer token is required');
    }

    let response: Response;

    try {
      response = await fetch(
        `${this.pharmacyServiceUrl}/pharmacy/${pharmacyId}/permissions`,
        {
          method: 'GET',
          headers: {
            Authorization: authorization,
          },
        },
      );
    } catch {
      throw new ServiceUnavailableException(
        'Could not reach pharmacy service',
      );
    }

    if (response.status === 401) {
      throw new UnauthorizedException('Invalid or missing token');
    }

    if (response.status === 403) {
      throw new ForbiddenException(
        'User does not have permission for this pharmacy',
      );
    }

    if (!response.ok) {
      throw new ForbiddenException('Could not validate pharmacy permission');
    }
  }
}
