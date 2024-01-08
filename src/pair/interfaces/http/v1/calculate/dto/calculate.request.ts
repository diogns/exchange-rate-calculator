import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CalculateRequestDTO {
  @IsNumber()
  @ApiProperty({ description: 'monto' })
  monto: number;

  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @ApiProperty({ description: 'moneda de origen' })
  moneda_origen: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @ApiProperty({ description: 'moneda de destino' })
  moneda_destino: string;
}
