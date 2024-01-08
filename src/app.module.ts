import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PairModule } from './pair/infrastructure/nestjs/pair.module';
import { TerminusModule } from '@nestjs/terminus';
import { HttpModule } from '@nestjs/axios';
import { HealthController } from './healthcheck.controller';

@Module({
  imports: [PairModule, TerminusModule, HttpModule, ConfigModule.forRoot()],
  controllers: [HealthController],
  providers: [],
})
export class AppModule {}
