import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class UpdatePairRequestDTO {
  @IsNumber()
  @ApiProperty({ description: 'par' })
  value: number;

  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @ApiProperty({ description: 'valor' })
  pair: string;
}
