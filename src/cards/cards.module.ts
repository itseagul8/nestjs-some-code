import { Module } from '@nestjs/common';
import { CardsController } from './cards.controller';
import { CardsService } from './cards.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Card } from 'src/typeorm/entities/Card';
import { Coll } from 'src/typeorm/entities/Coll';
import { User } from 'src/typeorm/entities/User';
import { ColumnsService } from 'src/columns/columns.service';
import { UsersService } from 'src/users/users.service';

@Module({
  imports: [TypeOrmModule.forFeature([Card,Coll,User])],
  controllers: [CardsController],
  providers: [CardsService,ColumnsService,UsersService]
})
export class CardsModule {}
