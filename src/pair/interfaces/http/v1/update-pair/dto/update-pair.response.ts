import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, IsNotEmpty } from 'class-validator';

export class UpdatePairResponseDTO {
  @IsNumber()
  @ApiProperty({ description: 'monto' })
  value: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'moneda de origen' })
  pair: string;

  constructor(value: number, pair: string) {
    this.value = value;
    this.pair = pair;
  }
}
