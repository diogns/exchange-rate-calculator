import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, IsNotEmpty } from 'class-validator';

export class CalculateResponseDTO {
  @IsNumber()
  @ApiProperty({ description: 'monto' })
  monto: number;

  @IsNumber()
  @ApiProperty({ description: 'monto con tipo de cambio' })
  monto_con_tipo_de_cambio: number;
  

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'moneda de origen' })
  moneda_origen: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'moneda de destino' })
  moneda_destino: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'tipo de cambio' })
  tipo_de_cambio: string;

  constructor(
    monto: number, 
    monto_con_tipo_de_cambio: number,
    moneda_origen: string,
    moneda_destino: string,
    tipo_de_cambio: string,
    ) {
    this.monto = monto;
    this.monto_con_tipo_de_cambio = monto_con_tipo_de_cambio;
    this.moneda_origen = moneda_origen;
    this.moneda_destino = moneda_destino;
    this.tipo_de_cambio = tipo_de_cambio;
  }
}
