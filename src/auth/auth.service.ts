import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from '../user/infrastructure/repositories/user';

@Injectable()
export class AuthService {
  constructor(
    private userRepository: UserRepository,
    private jwtTokenService: JwtService,
  ) {}

  async validateUserCredentials(
    username: string,
    password: string,
  ): Promise<any> {
    const user = await this.userRepository.getUser(username);
    if (user && user.password === password) {
      const { ...result } = user;
      return result;
    }
    return null;
  }

  async loginWithCredentials(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtTokenService.sign(payload),
    };
  }
}
