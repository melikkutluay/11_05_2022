import { Controller, Get, Post, Put, Delete, Param, Body, Res, Req } from '@nestjs/common';
import { Blog } from './blogs.entity';
import { BlogsService } from './blogs.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';

@Controller('blogs')
export class BlogsController {
  constructor(private readonly blogsService: BlogsService) { }
 
  @Get(':id')
  findOne(@Param('id') id: number/* , @Res() res: Response */): Promise<Blog> {    
    const result = this.blogsService.findOne(id);
    result.then(res => {
      let new_visitor = res.visitor + 1;
      res.visitor = new_visitor;
      this.blogsService.update(id, res)
    })
    //res.status(200).json(result);
    return result;
  }
  @Get()
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


  /* @Get('images/:imageName')
  findImage(@Param('imageName') imageName, @Res() res): Observable<Object> {
    return of(res.sendFile(join(__dirname, '../../' + imageName)));
  }

  @Post('images')
  ResUrl(@Req() req, @Res() res): Observable<Object> {
    return of(res.sendFile(join(__dirname, '../../' + req.body.path)));
  } */
}
