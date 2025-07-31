import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(configService: ConfigService) {
        if (!configService.get('JWT_SECRET')) {
            throw new Error('NO JWT SECRET PROVIDED IN .ENV FILE')
        }
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: configService.get('JWT_SECRET') || '',
            ignoreExpiration: true,
        });
    }

    async validate(payload: any) {
        return { userId: payload.sub, username: payload.username };
    }
}
