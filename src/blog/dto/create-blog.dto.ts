export class CreateBlogDto {
    title: string;
    content: string;
    image_path: string;
    visitor: number;
    create_at: Date;
    create_by: string;
    update_at: Date;
    update_by: string;
}