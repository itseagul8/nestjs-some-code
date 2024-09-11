import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put, UseGuards } from '@nestjs/common';
import { CardsService } from './cards.service';
import { CreateCardDto } from './dtos/createCard.dto';
import { UpdateCardDto } from './dtos/updateCard.dto';
import { Roles } from 'src/typeorm/utils/roles.decorator';
import { UserRole } from 'src/typeorm/utils/types';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { RoleCheckGuard } from 'src/auth/guards/rolecheck.guard';
import { UserAccessGuard } from 'src/auth/guards/useraccess.guard';
import { UpdateCardOrderDto } from './dtos/updateCardOrder.dto';

@Controller('users/:userid/columns/:columnid/cards')
export class CardsController {
    constructor(private cardsService: CardsService){}
    
    @Post()
    @Roles(UserRole.USER,UserRole.ADMIN)
    @UseGuards(JwtAuthGuard,RoleCheckGuard,UserAccessGuard)
    createCard(
        @Param('userid',ParseIntPipe) userid:number,
        @Param('columnid',ParseIntPipe) columnid:number,
        @Body() cardData:CreateCardDto){
        return this.cardsService.createCard(userid,columnid,cardData)
    }

    @Get()
    @Roles(UserRole.USER,UserRole.ADMIN)
    @UseGuards(JwtAuthGuard,RoleCheckGuard,UserAccessGuard)
    async getCardsByColumnId(
        @Param('userid',ParseIntPipe) userid:number,
        @Param('columnid',ParseIntPipe) columnid:number,){
        return await this.cardsService.getCardsByColumnId(userid,columnid)
    }

    @Get(':cardid')
    @Roles(UserRole.USER,UserRole.ADMIN)
    @UseGuards(JwtAuthGuard,RoleCheckGuard,UserAccessGuard)
    async getCardById(
        @Param('userid',ParseIntPipe) userid:number,
        @Param('columnid',ParseIntPipe) columnid:number,
        @Param('cardid',ParseIntPipe) cardid:number){
        return await this.cardsService.getCardById(userid,columnid,cardid)
    }

    @Put(':cardid')
    @Roles(UserRole.USER,UserRole.ADMIN)
    @UseGuards(JwtAuthGuard,RoleCheckGuard,UserAccessGuard)
    async updateCard(
        @Param('userid',ParseIntPipe) userid:number,
        @Param('columnid',ParseIntPipe) columnid:number,
        @Param('cardid',ParseIntPipe) cardid:number,
        @Body() cardData:UpdateCardDto){
        return await this.cardsService.updateCard(userid,columnid,cardid,cardData)
    }

    @Patch(':cardid')
    @Roles(UserRole.USER,UserRole.ADMIN)
    @UseGuards(JwtAuthGuard,RoleCheckGuard,UserAccessGuard)
    async updateCardOrder(
        @Param('userid',ParseIntPipe) userid:number,
        @Param('columnid',ParseIntPipe) columnid:number,
        @Param('cardid',ParseIntPipe) cardid:number,
        @Body() cardData:UpdateCardOrderDto
    ){
        return await this.cardsService.updateCardOrder(userid,columnid,cardid,cardData)
    }

    @Delete(':cardid')
    @Roles(UserRole.USER,UserRole.ADMIN)
    @UseGuards(JwtAuthGuard,RoleCheckGuard,UserAccessGuard)
    async deleteCard(
        @Param('userid',ParseIntPipe) userid:number,
        @Param('columnid',ParseIntPipe) columnid:number,
        @Param('cardid',ParseIntPipe) cardid:number
    ){
        return await this.cardsService.deleteCard(userid,columnid,cardid)
    }
}
