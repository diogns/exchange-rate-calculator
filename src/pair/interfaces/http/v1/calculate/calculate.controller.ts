import { Body, Controller, Post, Version, UseGuards } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ResponseDescription } from '../response-description';
import { GeneralResponse } from '../../general.response';
import { CalculateQuery } from '@pair/application/queries/calculate';
import { CalculateResponseDTO } from './dto/calculate.response';
import { CalculateRequestDTO } from './dto/calculate.request';
import { JwtAuthGuard } from '../../../../../auth/jwt-auth.guard';

@ApiTags('Pair')
@Controller('pair')
export class CalculateController {
  constructor(readonly queryBus: QueryBus) {}

  @Version('1')
  @UseGuards(JwtAuthGuard)
  @Post('convert')
  @ApiCreatedResponse({
    description: ResponseDescription.OK,
    type: CalculateResponseDTO,
  })
  @ApiBadRequestResponse({
    description: ResponseDescription.BAD_REQUEST,
    type: GeneralResponse,
  })
  @ApiInternalServerErrorResponse({
    description: ResponseDescription.INTERNAL_SERVER_ERROR,
    type: GeneralResponse,
  })
  async calculate(@Body() body: CalculateRequestDTO) {
    const query = new CalculateQuery(
      body.monto,
      body.moneda_origen,
      body.moneda_destino,
    );
    return this.queryBus.execute(query);
  }
}
