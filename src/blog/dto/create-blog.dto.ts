import { ApiProperty } from '@nestjs/swagger';

export class CreateBlogDto {
    @ApiProperty()
    title: string;
    @ApiProperty()
    content: string;
    @ApiProperty()
    image_path: string;
    @ApiProperty()
    visitor: number;
    @ApiProperty()
    create_at: Date;
    @ApiProperty()
    create_by: string;
    @ApiProperty()
    update_at: Date;
    @ApiProperty()
    update_by: string;
}