import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { BlogModule } from './blog/blogs.module'

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'root',
    database: 'blog',
    autoLoadEntities: true,
    synchronize: true,
  }),
    UsersModule,
    BlogModule,
  ],
})
export class AppModule { }


/* 
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule } from '@nestjs/config';
import configuration from './../config/configuration';

import { join } from 'path';

ServeStaticModule.forRoot({
    rootPath: join(__dirname, '../images')
}), */