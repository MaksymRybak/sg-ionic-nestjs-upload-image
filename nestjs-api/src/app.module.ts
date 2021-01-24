import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { ImageModule } from './image/image.module';

@Module({
  imports: [ImageModule, TypegooseModule.forRoot('mongodb://localhost:27017/imageapi', {
    useNewUrlParser: true
  })],
  controllers: [],
  providers: [],
})
export class AppModule {}
