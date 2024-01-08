import { Body, Controller, Post, Version } from '@nestjs/common';
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

@ApiTags('Pair')
@Controller('pair')
export class CalculateController {
  constructor(readonly queryBus: QueryBus) {}

  @Version('1')
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
  async addUser(@Body() user: CalculateRequestDTO) {
    const query = new CalculateQuery(
      user.monto,
      user.moneda_origen,
      user.moneda_destino,
    );
    return this.queryBus.execute(query);
  }
}
