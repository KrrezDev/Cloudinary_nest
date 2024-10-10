import { ApiProperty } from '@nestjs/swagger';
import { Document, Types } from 'mongoose';

export interface IImage {
  id?: string;
  userId: string;
  cloudinaryPublicId: string;
  cloudinaryUrl: string;
  originalFilename?: string;
  fileSize?: number;
  fileType?: string;
  width?: number;
  height?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Image implements IImage {
  @ApiProperty({ example: '507f1f77bcf86cd799439011' })
  id?: string;

  @ApiProperty({ example: '507f1f77bcf86cd799439011' })
  userId: string;

  @ApiProperty({ example: 'sample_image_123' })
  cloudinaryPublicId: string;

  @ApiProperty({ example: 'https://res.cloudinary.com/demo/image/upload/sample.jpg' })
  cloudinaryUrl: string;

  @ApiProperty({ example: 'vacation-photo.jpg' })
  originalFilename?: string;

  @ApiProperty({ example: 1024567 })
  fileSize?: number;

  @ApiProperty({ example: 'image/jpeg' })
  fileType?: string;

  @ApiProperty({ example: 1920 })
  width?: number;

  @ApiProperty({ example: 1080 })
  height?: number;

  @ApiProperty({ example: '2024-01-01T00:00:00.000Z' })
  createdAt?: Date;

  @ApiProperty({ example: '2024-01-01T00:00:00.000Z' })
  updatedAt?: Date;

  constructor(partial: Partial<IImage> = {}) {
    Object.assign(this, partial);
  }
}