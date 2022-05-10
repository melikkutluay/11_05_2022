import { ApiProperty } from '@nestjs/swagger';

export class UpdateBlogDto {
    @ApiProperty()
    title: string;
    @ApiProperty()
    content: string;
    @ApiProperty()
    image_path: string;
    @ApiProperty()
    visitor: number;
    @ApiProperty({format: "date-time"})
    update_at: Date;
    @ApiProperty()
    update_by: string;
}