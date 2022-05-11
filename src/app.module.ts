import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlogModule } from './blog/blogs.module'

@Module({
  imports: [
  TypeOrmModule.forRoot(), // Import connection DB parameter
    BlogModule,
  ],
})
export class AppModule {}