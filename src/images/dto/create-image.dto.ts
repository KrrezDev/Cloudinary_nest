import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateImageDto {
  @IsString()
  @ApiProperty({ description: 'ID del usuario que sube la imagen' })
  userId: string;

  @ApiProperty({ type: 'string', format: 'binary', description: 'Archivo de imagen a subir' })
  file: any;
}