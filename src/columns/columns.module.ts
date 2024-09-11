import { Module } from '@nestjs/common';
import { ColumnsController } from './columns.controller';
import { ColumnsService } from './columns.service';
import { Coll } from 'src/typeorm/entities/Coll';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/typeorm/entities/User';

@Module({
  imports: [TypeOrmModule.forFeature([Coll,User])],
  controllers: [ColumnsController],
  providers: [ColumnsService,UsersService]
})
export class ColumnsModule {}
