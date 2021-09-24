import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb://ubjq9tlpxbkapi0zo7jo:1oMAzfZlbsD4Kd2DwenE@bgdtj5zaksne5ru-mongodb.services.clever-cloud.com:27017/bgdtj5zaksne5ru',
    ),
  ],
})
export class MongoModule {}
