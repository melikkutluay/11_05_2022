import { Test } from '@nestjs/testing';
import { BlogsController } from "./blogs.controller";
import { BlogsService } from "./blogs.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Blog } from "./blogs.entity"

describe('TagController', () => {
    let tagController: BlogsController;
    let tagService: BlogsService;

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            imports: [  TypeOrmModule.forRoot()/* , TypeOrmModule.forFeature([Blog]) */],
            controllers: [BlogsController],
            providers: [BlogsService],
        }).compile();

        tagService = module.get<BlogsService>(BlogsService);
        tagController = module.get<BlogsController>(BlogsController);
    });

    describe('findAll', () => {
        it('should return an array of tags', async () => {
            const tags: Blog[] = [];
            const createTag = (id, title, content, visitor, image_path, create_at, create_by, update_at, update_by) => {
                const tag = new Blog();
                tag.id = id;
                tag.title = title;
                tag.content = content;
                tag.visitor = visitor;
                tag.image_path = image_path;
                tag.create_at = create_at;
                tag.create_by = create_by;
                tag.update_at = update_at
                tag.update_by = update_by
                return tag;
            }
            tags.push(createTag(1, 'first',"first",1,"/images/test.jpeg","2022-05-08T19:13:40.073Z","melik","2022-05-08T19:13:40.073Z", "melik"));
            jest.spyOn(tagService, 'findAll').mockImplementation(() => Promise.resolve(tags));

            const findAllResult = await tagController.findAll();
            expect(findAllResult).toBe(tags);
        });
    });
});