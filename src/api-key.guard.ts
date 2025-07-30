import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    // อ่านค่า api-key จาก header
    const apiKey = request.headers['x-api-key'];
    // กำหนด key ที่ยอมรับ
    const validKey = process.env.API_KEY || 'CREATE_BY_MK_250721';

    if (apiKey === validKey) {
      return true;
    }
    throw new UnauthorizedException('Invalid API Key');
  }
}
