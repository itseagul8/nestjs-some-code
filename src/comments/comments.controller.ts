import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Req, UseGuards } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { UpdateCommentDto } from './dtos/updateComment.dto';
import { CreateCommentDto } from './dtos/createComment.dto';
import { Roles } from 'src/typeorm/utils/roles.decorator';
import { UserRole } from 'src/typeorm/utils/types';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { RoleCheckGuard } from 'src/auth/guards/rolecheck.guard';
import { UserAccessGuard } from 'src/auth/guards/useraccess.guard';
import { Request } from 'express';
import { UserAccessForCommentsGuard } from 'src/auth/guards/useraccessforcomments.guard';

@Controller('users/:userid/columns/:columnid/cards/:cardid/comments')
export class CommentsController {
    constructor(private commentsService: CommentsService){}
    
    @Post()
    @Roles(UserRole.USER,UserRole.ADMIN)
    @UseGuards(JwtAuthGuard,RoleCheckGuard,UserAccessGuard)
    createCard(
        @Param('userid',ParseIntPipe) userid:number,
        @Param('columnid',ParseIntPipe) columnid:number,
        @Param('cardid',ParseIntPipe) cardid:number,
        @Body() commentData:CreateCommentDto,
        @Req() req: Request
    ){
        return this.commentsService.createComment(userid,columnid,cardid,req.user,commentData)
    }

    @Get()
    @Roles(UserRole.USER,UserRole.ADMIN)
    @UseGuards(JwtAuthGuard,RoleCheckGuard,UserAccessGuard)
    async getCommentsByCardId(
        @Param('userid',ParseIntPipe) userid:number,
        @Param('columnid',ParseIntPipe) columnid:number,
        @Param('cardid',ParseIntPipe) cardid:number){
        return await this.commentsService.getCommentsByCardId(userid,columnid,cardid)
    }

    @Get(':commentid')
    @Roles(UserRole.USER,UserRole.ADMIN)
    @UseGuards(JwtAuthGuard,RoleCheckGuard,UserAccessForCommentsGuard)
    async getCommentById(
        @Param('userid',ParseIntPipe) userid:number,
        @Param('columnid',ParseIntPipe) columnid:number,
        @Param('cardid',ParseIntPipe) cardid:number,
        @Param('commentid',ParseIntPipe) commentid:number
    ){
        return await this.commentsService.getCommentById(userid,columnid,cardid,commentid)
    }

    @Put(':commentid')
    @Roles(UserRole.USER,UserRole.ADMIN)
    @UseGuards(JwtAuthGuard,RoleCheckGuard,UserAccessForCommentsGuard)
    async updateCard(
        @Param('userid',ParseIntPipe) userid:number,
        @Param('columnid',ParseIntPipe) columnid:number,
        @Param('cardid',ParseIntPipe) cardid:number,
        @Param('commentid',ParseIntPipe) commentid:number,
        @Body() cardData:UpdateCommentDto
    ){
        return await this.commentsService.updateComment(userid,columnid,cardid,commentid,cardData)
    }

    @Delete(':commentid')
    @Roles(UserRole.USER,UserRole.ADMIN)
    @UseGuards(JwtAuthGuard,RoleCheckGuard,UserAccessForCommentsGuard)
    async deleteCard(
        @Param('userid',ParseIntPipe) userid:number,
        @Param('columnid',ParseIntPipe) columnid:number,
        @Param('cardid',ParseIntPipe) cardid:number,
        @Param('commentid',ParseIntPipe) commentid:number
    ){
        return await this.commentsService.deleteComment(userid,columnid,cardid,commentid)
    }
}
