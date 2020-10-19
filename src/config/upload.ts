import path from 'path';
import crypto from 'crypto';
import multer, { StorageEngine } from 'multer';

const uploadsFolder = path.resolve(__dirname, '..', '..', 'uploads');
const tmpFolder = path.resolve(uploadsFolder, 'tmp');

interface IUploadConfig {
  driver: 'disk';

  tmpFolder: string;
  uploadsFolder: string;

  multer: {
    storage: StorageEngine;
  };
}

export default {
  driver: process.env.STORAGE_DRIVER,

  tmpFolder,
  uploadsFolder,

  multer: {
    storage: multer.diskStorage({
      destination: tmpFolder,
      filename: (_request, file, callback) => {
        const fileHash = crypto.randomBytes(10).toString('hex');
        const fileName = `${fileHash}-${file.originalname}`;

        return callback(null, fileName);
      },
    }),
  },
} as IUploadConfig;
