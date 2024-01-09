import { Body, Controller, Patch, Version, UseGuards } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ResponseDescription } from '../response-description';
import { GeneralResponse } from '../../general.response';
import { UpdatePairQuery } from '@pair/application/queries/update-pair';
import { UpdatePairRequestDTO } from './dto/update-pair.request';
import { UpdatePairResponseDTO } from './dto/update-pair.response';
import { JwtAuthGuard } from '../../../../../auth/jwt-auth.guard';

@ApiTags('Pair')
@Controller('pair')
export class UpdatePairController {
  constructor(readonly queryBus: QueryBus) {}

  @Version('1')
  @UseGuards(JwtAuthGuard)
  @Patch()
  @ApiCreatedResponse({
    description: ResponseDescription.OK,
    type: UpdatePairResponseDTO,
  })
  @ApiBadRequestResponse({
    description: ResponseDescription.BAD_REQUEST,
    type: GeneralResponse,
  })
  @ApiInternalServerErrorResponse({
    description: ResponseDescription.INTERNAL_SERVER_ERROR,
    type: GeneralResponse,
  })
  async updatePair(@Body() body: UpdatePairRequestDTO) {
    const query = new UpdatePairQuery(body.value, body.pair);
    return this.queryBus.execute(query);
  }
}
