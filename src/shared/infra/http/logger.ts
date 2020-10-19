import fs from 'fs';
import { createStream } from 'rotating-file-stream';
import path from 'path';
import morgan from 'morgan';

const accessLogStream = fs.createWriteStream(
  path.join(__dirname, '..', '..', '..', '..', 'logs', 'access.log'),
  { flags: 'a' },
);

// const accessLogStream = createStream('access.log', {
//   interval: '1d',
//   path: path.join(__dirname, 'logs'),
// });

const logger = morgan('combined', { stream: accessLogStream });

export default logger;
