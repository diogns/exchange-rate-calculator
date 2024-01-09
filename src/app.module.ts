import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PairModule } from './pair/infrastructure/nestjs/pair.module';
import { UserModule } from './user/infrastructure/nestjs/user.module';
import { AuthModule } from './auth/auth.module';

import { TerminusModule } from '@nestjs/terminus';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    AuthModule,
    UserModule,
    PairModule,
    TerminusModule,
    HttpModule,
    ConfigModule.forRoot(),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
