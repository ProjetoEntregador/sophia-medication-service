import { Injectable, ForbiddenException, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class PharmacyPermissionService {
  private readonly pharmacyServiceUrl =
    process.env.PHARMACY_SERVICE_URL || 'http://sophia-pharmacy-service:8080';

  async validatePermission(pharmacyId: number, authorization?: string): Promise<void> {
    if (!authorization) {
      throw new UnauthorizedException('Authorization token is required');
    }

    const response = await fetch(
      `${this.pharmacyServiceUrl}/pharmacy/${pharmacyId}/permissions`,
      {
        method: 'GET',
        headers: {
          Authorization: authorization,
        },
      },
    );

    if (response.status === 401) {
      throw new UnauthorizedException('Invalid or missing token');
    }

    if (response.status === 403) {
      throw new ForbiddenException('User does not have permission for this pharmacy');
    }

    if (!response.ok) {
      throw new ForbiddenException('Could not validate pharmacy permission');
    }
  }
}