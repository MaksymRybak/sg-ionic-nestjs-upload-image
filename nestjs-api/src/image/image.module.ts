import { HttpException, HttpStatus, Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { TypegooseModule } from 'nestjs-typegoose';
import { extname } from 'path';
import { ImageController } from './image.controller';
import { ApiImage } from './image.model';
import { ImageService } from './image.service';

const imageFilter = function (req, file, cb) {
  console.log('filter file: ', file);
  // accept image only
  if (!file.originalname.match(/\.(jpg|jpeg|png|pdf)$/)) {
    cb(new HttpException(`Unsupported file type ${extname(file.originalname)}`, HttpStatus.BAD_REQUEST), false);
  }
  cb(null, true);
};

@Module({
  controllers: [ImageController],
  providers: [ImageService],
  imports: [
    TypegooseModule.forFeature([
      {
        typegooseClass: ApiImage,
        schemaOptions: { versionKey: false },
      },
    ]),
    MulterModule.registerAsync({
      useFactory: () => ({
        fileFilter: imageFilter   // register filter to accept only images
      })
    })
  ],
})
export class ImageModule {}
