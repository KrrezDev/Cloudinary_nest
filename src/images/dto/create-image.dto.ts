import { IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateImageDto {
  @IsString()
  userId: string;

  @IsString()
  cloudinaryPublicId: string;

  @IsString()
  cloudinaryUrl: string;

  @IsOptional()
  @IsString()
  originalFilename?: string;

  @IsOptional()
  @IsNumber()
  fileSize?: number;

  @IsOptional()
  @IsString()
  fileType?: string;

  @IsOptional()
  @IsNumber()
  width?: number;

  @IsOptional()
  @IsNumber()
  height?: number;

  @IsOptional()
  data?: Buffer; 
}