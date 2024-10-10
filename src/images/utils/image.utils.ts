import { Image } from '../entities/image.entity';
import { ImageDocument } from '../schemas/image.schema';

export function toEntity(doc: ImageDocument): Image {
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