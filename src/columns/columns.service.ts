import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateColumnParams, UpdateColumnOrderParams, UpdateColumnParams } from './utils/types';
import { Coll } from 'src/typeorm/entities/Coll';
import { UsersService } from 'src/users/users.service';
import { SortFunc } from 'src/utils/sortFunc';

@Injectable()
export class ColumnsService {
    constructor(
        @InjectRepository(Coll) private collRepository: Repository<Coll>,
        private userService: UsersService
    ){}

    async createColumn(userid:number,columnData:CreateColumnParams){
        const user = await this.userService.getUserById(userid)
        const columnsSet = await this.getColumnsByUserId(userid)
        let order_number = columnsSet.length
        if(typeof(order_number)!='number'){
            order_number=0
        }
        const newColumn = this.collRepository.create({
            ...columnData,
            user,
            order_number:order_number+1
        })
        const saveColumn = await this.collRepository.save(newColumn)
        return saveColumn
    }

    async getColumnsByUserId(userid:number){
        const user = await this.userService.getUserById(userid)
        const columns = await this.collRepository.find({where: {
            user: user
        }})
        if(!columns){
            throw new HttpException('Columns Not Found',404); 
        }
        return columns
    }

    async getColumnById(userid:number,columnid:number){
        const user = await this.userService.getUserById(userid)
        const column = await this.collRepository.findOneBy({id: columnid })
        if(!column){
            throw new HttpException('Column Not Found',404)
        }
        return column
    }

    async updateColumn(userid:number,columnid:number,columnData:UpdateColumnParams){
        if(!columnData.description&&!columnData.title){
            throw new HttpException('No data was set for an update',404)
        }
        const column = await this.collRepository.update({id: columnid},{...columnData})
        if(column.affected==0){
            throw new HttpException('Column Not Found',404)
        }
        return {msg:'Column data have been updated'}
    }

    async updateColumnOrder(userid:number,columnid:number,columnData:UpdateColumnOrderParams){
        const user = await this.userService.getUserById(userid)
        let columns = await this.getColumnsByUserId(userid)
        const theColumnIndex = columns.findIndex((element) => element.id==columnid)
        if(columnData.direction=='before'){
            columns[theColumnIndex].order_number=columnData.placeid-0.5
        }else{
            columns[theColumnIndex].order_number=columnData.placeid+0.5
        }
        columns=SortFunc('order_number',columns)
        let i=1
        columns.forEach((element)=>{element.order_number=i++})
        const saveColumns = await this.collRepository.save(columns)
        return saveColumns
    }

    async deleteColumn(userid:number,columnid:number){
        const user = await this.userService.getUserById(userid)
        const column = await this.collRepository.delete({id: columnid})
        if(column.affected==0){
            throw new HttpException('Column Not Found',404) 
        }
        return {msg:'Column have been deleted'}
    }
}
