import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { Blog } from './blogs.entity';
import { BlogsService } from './blogs.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger'

@Controller('blogs')
@ApiTags('Blogs')
export class BlogsController {
  constructor(private readonly blogsService: BlogsService) { }

  @Get(':id')
  @ApiOkResponse({ description: 'Blog retrieved successfully.' })
  @ApiNotFoundResponse({ description: 'Blog not found.' })
  async findOne(@Param('id') id: number,): Promise<Blog> {
    const result = await this.blogsService.findOne(id);
    if (Object.keys(result).length > 0) {
      let new_visitor = result.visitor + 1;
      result.visitor = new_visitor;
      await this.blogsService.update(id, result)
      result.image_path = `${process.env.SERVER_HOST}/${process.env.SERVER_PORT}${result['image_path']}`;
    }
    return result;
  }
  @Get()
  @ApiOkResponse({ description: 'Blogs retrieved successfully.' })
  findAll(): Promise<Blog[]> {
    return this.blogsService.findAll();
  }
  @Post()
  create(@Body() createBlogDto: CreateBlogDto): Promise<Blog> {
    return this.blogsService.create(createBlogDto);
  }
  @Put(':id')
  update(@Param('id') id: number, @Body() updateBlogDto: UpdateBlogDto) {
    return this.blogsService.update(id, updateBlogDto);
  }
  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.blogsService.remove(id);
  }
  @Get('/images/:id')
  async findImage(@Param('id') id: number): Promise<Object> {
    const result = await this.blogsService.findImage(id);
    return { URL: `localhost:3000/${result['image_path']}` };
  }
}

