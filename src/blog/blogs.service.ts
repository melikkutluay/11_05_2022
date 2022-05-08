import { Injectable } from '@nestjs/common';
import { Blog } from './blogs.entity';
import { Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { User } from 'src/users/user.entity';
@Injectable()
export class BlogsService {

  constructor(
    @InjectRepository(Blog)
    private readonly blogsRepository: Repository<Blog>,
  ) { }
  async findOne(id: number): Promise<Blog> {
    return this.blogsRepository.findOne(id);
  }
  async findAll(): Promise<Blog[]> {
    return this.blogsRepository.find();
  }
  create(createBlogDto: CreateBlogDto): Promise<Blog> {
    return this.blogsRepository.save(createBlogDto);
  }
  async remove(id: number): Promise<void> {
    await this.blogsRepository.delete(id);
  }
  update(id: number, updateBlogDto: UpdateBlogDto): Promise<UpdateResult> {
    return this.blogsRepository.update(id, updateBlogDto);
  }
}
