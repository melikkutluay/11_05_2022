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
  @ApiOkResponse({ description: 'Blog retrieved successfully.' })  // Use for view swagger response descriptions
  @ApiNotFoundResponse({ description: 'Blog not found.' })
  async findOne(@Param('id') id: number,): Promise<Blog> {   //Get blog contenct 
    const result = await this.blogsService.findOne(id);
    if (Object.keys(result).length > 0) {
      let new_visitor = result.visitor + 1;       // Increase the number of visitor information 
      result.visitor = new_visitor;
      await this.blogsService.update(id, result)      //Update new blog information in database
      result.image_path = `${process.env.SERVER_HOST}/${process.env.SERVER_PORT}${result['image_path']}`;  //Return to image URL in written database row
    }
    return result;
  }
  @Get()
  @ApiOkResponse({ description: 'Blogs retrieved successfully.' })  
  findAll(): Promise<Blog[]> {          //Return All blogs
    return this.blogsService.findAll();
  }
  @Post()
  create(@Body() createBlogDto: CreateBlogDto): Promise<Blog> {   //Create a blog 
    return this.blogsService.create(createBlogDto);
  }
  @Put(':id')
  update(@Param('id') id: number, @Body() updateBlogDto: UpdateBlogDto) {  //Update a blog
    return this.blogsService.update(id, updateBlogDto);
  }
  @Delete(':id')            //Remove a blog
  remove(@Param('id') id: number): Promise<void> {
    return this.blogsService.remove(id);
  }
  @Get('/images/:id')         //Return to image URL in written database row
  async findImage(@Param('id') id: number): Promise<Object> {
    const result = await this.blogsService.findImage(id);
    return { URL: `${process.env.SERVER_HOST}/${process.env.SERVER_PORT}${result['image_path']}` };
  }
}

