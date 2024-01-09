import { Logger, Module } from '@nestjs/common';
import { UserRepository } from '../repositories/user';

const infrastructure = [UserRepository];

const domain = [];

const application = [];

@Module({
  imports: [],
  providers: [Logger, ...infrastructure, ...application, ...domain],
  exports: [...infrastructure],
})
export class UserModule {}
