import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean } from 'class-validator';
import { ListUsersResponseDTO } from '../../list-users/dto/list-users.response';

export class UpdateUserResponseDTO {
  @IsBoolean()
  @ApiProperty({ description: 'indicator of successfully operation' })
  success: boolean;

  @ApiProperty({ description: 'updated user data' })
  user: ListUsersResponseDTO;

  constructor(success: boolean, user: ListUsersResponseDTO) {
    this.success = success;
    this.user = user;
  }
}