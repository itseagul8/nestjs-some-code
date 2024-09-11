import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put, UseGuards } from '@nestjs/common';
import { ColumnsService } from './columns.service';
import { CreateColumnDto } from './dtos/createColumn.dto';
import { UpdateColumnDto } from './dtos/updateColumn.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { RoleCheckGuard } from 'src/auth/guards/rolecheck.guard';
import { UserRole } from 'src/typeorm/utils/types';
import { Roles } from 'src/typeorm/utils/roles.decorator';
import { UpdateColumnOrderDto } from './dtos/updateColumnOrder.dto';
import { UserAccessGuard } from 'src/auth/guards/useraccess.guard';

@Controller('users/:userid/columns')
export class ColumnsController {
    constructor(private columnsService: ColumnsService){}
    
    @Post()
    @Roles(UserRole.USER,UserRole.ADMIN)
    @UseGuards(JwtAuthGuard,RoleCheckGuard,UserAccessGuard)
    createColumn(@Param('userid',ParseIntPipe) userid:number,@Body() columnData:CreateColumnDto){
        return this.columnsService.createColumn(userid,columnData)
    }

    @Get()
    @Roles(UserRole.USER,UserRole.ADMIN)
    @UseGuards(JwtAuthGuard,RoleCheckGuard,UserAccessGuard)
    async getColumnsByUserId(@Param('userid',ParseIntPipe) userid:number){
        return await this.columnsService.getColumnsByUserId(userid)
    }

    @Get(':columnid')
    @Roles(UserRole.USER,UserRole.ADMIN)
    @UseGuards(JwtAuthGuard,RoleCheckGuard,UserAccessGuard)
    async getColumnById(@Param('userid',ParseIntPipe) userid:number,@Param('columnid',ParseIntPipe) columnid:number){
        return await this.columnsService.getColumnById(userid,columnid)
    }

    @Put(':columnid')
    @Roles(UserRole.USER,UserRole.ADMIN)
    @UseGuards(JwtAuthGuard,RoleCheckGuard,UserAccessGuard)
    async updateColumn(@Param('userid',ParseIntPipe) userid:number,@Param('columnid',ParseIntPipe) columnid:number,@Body() columnData:UpdateColumnDto){
        return await this.columnsService.updateColumn(userid,columnid,columnData)
    }

    @Patch(':columnid')
    @Roles(UserRole.USER,UserRole.ADMIN)
    @UseGuards(JwtAuthGuard,RoleCheckGuard,UserAccessGuard)
    async updateColumnOrder(
        @Param('userid',ParseIntPipe) userid:number,
        @Param('columnid',ParseIntPipe) columnid:number,
        @Body() columnData:UpdateColumnOrderDto
    ){
        return await this.columnsService.updateColumnOrder(userid,columnid,columnData)
    }

    @Delete(':columnid')
    @Roles(UserRole.USER,UserRole.ADMIN)
    @UseGuards(JwtAuthGuard,RoleCheckGuard,UserAccessGuard)
    async deleteColumn(
        @Param('userid',ParseIntPipe) userid:number,
        @Param('columnid',ParseIntPipe) columnid:number
    ){
        return await this.columnsService.deleteColumn(userid,columnid)
    }
}
