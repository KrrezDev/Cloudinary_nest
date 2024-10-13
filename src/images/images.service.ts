import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Image } from './entities/image.entity';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import cloudinary from '../config/cloudinary.config';

@Injectable()
export class ImagesService {
  constructor(private prisma: PrismaService) {}

  private toEntity(doc: any): Image {
    return new Image({
      id: doc.id.toString(),
      cloudinaryPublicId: doc.cloudinaryPublicId,
      cloudinaryUrl: doc.cloudinaryUrl,
      originalFilename: doc.originalFilename,
      fileSize: doc.fileSize,
      fileType: doc.fileType,
      width: doc.width,
      height: doc.height,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    });
  }

  async create(createImageDto: CreateImageDto, file: Express.Multer.File): Promise<Image> {
    const result = await cloudinary.uploader.upload(file.buffer.toString('base64'), {
      resource_type: 'auto',
      folder: 'your-folder-name',
      transformation: [
        { effect: 'ai_background_removal' },
        { overlay: 'tenebrous_background', gravity: 'center', width: 'auto', height: 'auto', crop: 'fill' }
      ],
    });

    const createdImage = await this.prisma.image.create({
      data: {
        cloudinaryPublicId: result.public_id,
        cloudinaryUrl: result.secure_url,
        originalFilename: file.originalname,
        fileSize: file.size,
        fileType: file.mimetype,
        width: result.width,
        height: result.height,
      },
    });

    return this.toEntity(createdImage);
  }

  async findAll(): Promise<Image[]> {
    const docs = await this.prisma.image.findMany();
    return docs.map(doc => this.toEntity(doc));
  }

  async findOne(id: string): Promise<Image> {
    const doc = await this.prisma.image.findUnique({
      where: { id: id },
    });
    if (!doc) {
      throw new NotFoundException(`Image with ID ${id} not found`);
    }
    return this.toEntity(doc);
  }

  async update(id: string, updateImageDto: UpdateImageDto): Promise<Image> {
    const updatedDoc = await this.prisma.image.update({
      where: { id: id },
      data: updateImageDto,
    });

    if (!updatedDoc) {
      throw new NotFoundException(`Image with ID ${id} not found`);
    }

    return this.toEntity(updatedDoc);
  }

  async remove(id: string): Promise<Image> {
    const deletedDoc = await this.prisma.image.delete({
      where: { id: id },
    });

    if (!deletedDoc) {
      throw new NotFoundException(`Image with ID ${id} not found`);
    }

    return this.toEntity(deletedDoc);
  }
}