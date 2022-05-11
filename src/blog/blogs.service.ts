import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Blog } from './blogs.entity';
import { Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
@Injectable()
export class BlogsService {

  constructor(
    @InjectRepository(Blog)
    private readonly blogsRepository: Repository<Blog>,    //Create a repository with my Blog Entity 
  ) { }
  async findOne(id: number): Promise<Blog> {
    let result = await this.blogsRepository.findOne(id);   //waiting response data with await
    if (result) {
      return result;
    }
    throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
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
  async findImage(id: number): Promise<Blog> {
    return await this.blogsRepository.findOne(id);
  }
}
