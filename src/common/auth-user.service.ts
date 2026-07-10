import { Injectable } from '@nestjs/common';

type JwtPayload = Record<string, unknown>;

@Injectable()
export class AuthUserService {
  getChangedBy(authorization?: string): string {
    if (!authorization?.startsWith('Bearer ')) {
      return 'unknown';
    }

    const token = authorization.slice('Bearer '.length).trim();
    const [, payload] = token.split('.');

    if (!payload) {
      return 'unknown';
    }

    try {
      const parsedPayload = JSON.parse(
        Buffer.from(this.normalizeBase64(payload), 'base64').toString('utf-8'),
      ) as JwtPayload;

      const changedBy = this.pickUserId(parsedPayload);

      return changedBy ?? 'unknown';
    } catch {
      return 'unknown';
    }
  }

  private pickUserId(payload: JwtPayload): string | undefined {
    const candidates = [
      payload.userId,
      payload.user_id,
      payload.sub,
      payload.id,
    ];

    for (const candidate of candidates) {
      if (candidate !== undefined && candidate !== null && candidate !== '') {
        return String(candidate);
      }
    }

    return undefined;
  }

  private normalizeBase64(value: string): string {
    const normalized = value.replace(/-/g, '+').replace(/_/g, '/');
    const padding = normalized.length % 4;

    if (padding === 0) {
      return normalized;
    }

    return normalized.padEnd(normalized.length + (4 - padding), '=');
  }
}
