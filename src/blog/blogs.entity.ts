import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Blog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column({default: 0})
  visitor: number;

  @Column()
  image_path: string;

  @CreateDateColumn()
  create_at: Date;

  @Column()
  create_by: string;

  @UpdateDateColumn()
  update_at: Date;
  
  @Column()
  update_by: string;
}
