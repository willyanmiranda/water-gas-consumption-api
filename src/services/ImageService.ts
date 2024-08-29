import path from 'node:path';
import fs from 'node:fs';

import { IMAGES_FOLDER_PATH } from '@/utils/paths';
import { SERVER_URL } from '@/server.config';

export class ImageService {

  private ImageServiceBaseURL = `http://${SERVER_URL}/images/`;
  
  constructor() {}

  async saveImage(data: string, filename: string) {
    try {
    
      const buffer = Buffer.from(data, 'base64');
      
      const imageFilePath = path.join(IMAGES_FOLDER_PATH, filename);
      fs.writeFileSync(imageFilePath, buffer);
  
      return `${this.ImageServiceBaseURL}${filename}`;
  
    } catch(error) {
      throw {
        error,
        message: 'Unable to ImageService.saveImage'
      };
    }
  }

  async deleteImage(filename: string) {
    try {
  
      const imageFilePath = path.join(IMAGES_FOLDER_PATH, filename);
      fs.unlinkSync(imageFilePath);
  
    } catch(error) {
      throw {
        error,
        message: 'Unable to ImageService.deleteImage'
      };
    }
  }

}