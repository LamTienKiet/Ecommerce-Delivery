import { Injectable, BadRequestException } from '@nestjs/common';
import { v2 as cloudinary, UploadApiResponse, UploadApiErrorResponse } from 'cloudinary';
// eslint-disable-next-line @typescript-eslint/no-require-imports
const streamifier = require('streamifier');

@Injectable()
export class CloudinaryService {
  constructor() {
    cloudinary.config({
      cloud_name: 'dkosqrf6',
      api_key: '553598152726312',
      api_secret: 'jQ-YuzzcjNUkjNOMljJrSh8v5Q8',
    });
  }

  uploadFile(file: Express.Multer.File): Promise<UploadApiResponse | UploadApiErrorResponse> {
    return new Promise((resolve, reject) => {
      if (!file) {
        return reject(new BadRequestException('Không tìm thấy file'));
      }

      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: 'ecommerce' }, // Thư mục lưu trên Cloudinary
        (error, result) => {
          if (error) return reject(error);
          resolve(result!);
        },
      );

      streamifier.createReadStream(file.buffer).pipe(uploadStream);
    });
  }
}
