import { Module } from '@nestjs/common';
import { BlogsController } from './blogs.controller';
import { BlogsService } from './blogs.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Blog } from "./blogs.entity";
@Module({
    imports: [TypeOrmModule.forFeature([Blog])],
    providers: [BlogsService],
    controllers: [BlogsController],
})
export class BlogModule { }
