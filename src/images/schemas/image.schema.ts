import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Image {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  cloudinaryPublicId: string;

  @Prop({ required: true })
  cloudinaryUrl: string;

  @Prop()
  originalFilename?: string;

  @Prop()
  fileSize?: number;

  @Prop()
  fileType?: string;

  @Prop()
  width?: number;

  @Prop()
  height?: number;

  @Prop({ default: Date.now })
  createdAt?: Date;

  @Prop({ default: Date.now })
  updatedAt?: Date;

  @Prop({ required: true })
  data: Buffer;
}

export type ImageDocument = Image & Document;
export const ImageSchema = SchemaFactory.createForClass(Image);