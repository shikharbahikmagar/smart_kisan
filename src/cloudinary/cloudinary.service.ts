import { Injectable } from '@nestjs/common';
import {v2 as cloudinary} from 'cloudinary';
import { Express } from 'express'; // Import Express namespace

@Injectable()
export class CloudinaryService {
  constructor() {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
  }

  // Generic function for uploading media to a specific folder
  async uploadMedia(file: Express.Multer.File, folder: string): Promise<string> {
    return new Promise((resolve, reject) => {
      // If file is in memory (buffer), use the upload_stream method
      if (file.buffer) {
        const uploadOptions = {
          folder,
          resource_type: 'auto' as 'auto', // Explicitly casting to 'auto'
        };
  
        const uploadStream = cloudinary.uploader.upload_stream(uploadOptions, (error, result) => {
          if (error) {
            return reject(error);
          }
          if (result && result.secure_url) {
            return resolve(result.secure_url); // Return the URL of the uploaded file
          }
          return reject(new Error('Failed to upload media: no secure_url returned'));
        });
  
        // Push buffer data to Cloudinary's upload stream
        uploadStream.end(file.buffer);
      } else {
        // If file is stored on disk (using multer diskStorage), use upload
        cloudinary.uploader.upload(file.path, { folder }, (error, result) => {
          if (error) {
            return reject(error);
          }
          if (result && result.secure_url) {
            return resolve(result.secure_url); // Return the URL of the uploaded file
          }
          return reject(new Error('Failed to upload media: no secure_url returned'));
        });
      }
    });
  }

  // Upload user avatar to 'users/avatars' folder
  async uploadUserAvatar(file: Express.Multer.File): Promise<string> {
    return this.uploadMedia(file, 'users/avatars');
  }

  // Upload product image to 'products/images' folder
  async uploadProductImage(file: Express.Multer.File): Promise<string> {
    return this.uploadMedia(file, 'products/images');
  }

  // Upload item image to 'items/images' folder
  async uploadItemImage(file: Express.Multer.File): Promise<string> {
    return this.uploadMedia(file, 'items/images');
  }

  // Upload item video to 'items/videos' folder
  async uploadItemVideo(file: Express.Multer.File): Promise<string> {
    return this.uploadMedia(file, 'items/videos');
  }
}
