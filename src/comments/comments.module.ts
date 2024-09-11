import { Module } from '@nestjs/common';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from 'src/typeorm/entities/Comment';
import { Card } from 'src/typeorm/entities/Card';
import { Coll } from 'src/typeorm/entities/Coll';
import { User } from 'src/typeorm/entities/User';
import { CardsService } from 'src/cards/cards.service';
import { ColumnsService } from 'src/columns/columns.service';
import { UsersService } from 'src/users/users.service';

@Module({
  imports: [TypeOrmModule.forFeature([Comment,Card,Coll,User])],
  controllers: [CommentsController],
  providers: [CommentsService,CardsService,ColumnsService,UsersService]
})
export class CommentsModule {}
