import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PairModule } from './pair/infrastructure/nestjs/pair.module';
import { UserModule } from './user/infrastructure/nestjs/user.module';
import { AuthModule } from './auth/auth.module';

import { TerminusModule } from '@nestjs/terminus';
import { HttpModule } from '@nestjs/axios';
import { HealthController } from './healthcheck.controller';

@Module({
  imports: [
    AuthModule,
    UserModule,
    PairModule,
    TerminusModule,
    HttpModule,
    ConfigModule.forRoot(),
  ],
  controllers: [HealthController],
  providers: [],
})
export class AppModule {}
