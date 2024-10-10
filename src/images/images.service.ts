import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Image } from './entities/image.entity';
import { ImageDocument } from './schemas/image.schema';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';

@Injectable()
export class ImagesService {
  constructor(
    @InjectModel('Image') private imageModel: Model<ImageDocument>,
  ) {}

  private toEntity(doc: ImageDocument): Image {
    return new Image({
      id: doc._id.toString(),
      userId: doc.userId,
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

  async create(createImageDto: CreateImageDto): Promise<Image> {
    const createdImage = new this.imageModel(createImageDto);
    const doc = await createdImage.save();
    return this.toEntity(doc);
  }

  async findAll(): Promise<Image[]> {
    const docs = await this.imageModel.find().exec();
    return docs.map(doc => this.toEntity(doc));
  }

  async findOne(id: string): Promise<Image> {
    const doc = await this.imageModel.findById(id).exec();
    if (!doc) {
      throw new NotFoundException(`Image with ID ${id} not found`);
    }
    return this.toEntity(doc);
  }

  async update(id: string, updateImageDto: UpdateImageDto): Promise<Image> {
    const updatedDoc = await this.imageModel
      .findByIdAndUpdate(id, updateImageDto, { new: true })
      .exec();
    
    if (!updatedDoc) {
      throw new NotFoundException(`Image with ID ${id} not found`);
    }
    
    return this.toEntity(updatedDoc);
  }

  async remove(id: string): Promise<Image> {
    const deletedDoc = await this.imageModel.findByIdAndDelete(id).exec();
    
    if (!deletedDoc) {
      throw new NotFoundException(`Image with ID ${id} not found`);
    }
    
    return this.toEntity(deletedDoc);
  }
}