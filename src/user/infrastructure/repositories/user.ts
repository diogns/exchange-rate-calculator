import { Inject, Logger } from '@nestjs/common';
import { UserEntity } from '@user/domain/entities/user.entity';
export class UserRepository {
  @Inject()
  private readonly logger: Logger;
  private readonly users = [
    {
      userId: 1,
      username: 'admin',
      password: 'admin',
    },
    {
      userId: 2,
      username: 'user',
      password: 'user',
    },
  ];

  async getUser(username: string): Promise<UserEntity | undefined> {
    return this.users.find((user) => user.username === username);
  }
}
