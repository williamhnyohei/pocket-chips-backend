import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

interface JwtPayload {
  sub: number;
  email: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET') || 'defaultSecret', // Garantindo um valor padrão
    });
  }

  async validate(
    payload: JwtPayload,
  ): Promise<{ userId: number; email: string }> {
    // A expressão `await` é adicionada para satisfazer o ESLint
    await Promise.resolve(); // Simulação para atender à exigência de um método async

    return { userId: payload.sub, email: payload.email };
  }
}
