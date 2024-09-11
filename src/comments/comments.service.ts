import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CardsService } from 'src/cards/cards.service';
import { ColumnsService } from 'src/columns/columns.service';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { CreateCommentParams, UpdateCommentParams } from './utils/types';
import { Comment } from 'src/typeorm/entities/Comment';

@Injectable()
export class CommentsService {
    constructor(
        @InjectRepository(Comment) private commentRepository: Repository<Comment>,
        private userService: UsersService,
        private columnService: ColumnsService,
        private cardService: CardsService
    ){}

    async createComment(userid:number,columnid:number,cardid:number,creator:any,commentData:CreateCommentParams){
        const user = await this.userService.getUserById(userid)
        const creatorObj = await this.userService.getUserById(creator.id)
        const column = await this.columnService.getColumnById(userid,columnid)
        const card = await this.cardService.getCardById(userid,columnid,cardid)
        const newComment = this.commentRepository.create({
            ...commentData,
            user:user,
            coll:column,
            card:card,
            owner:creatorObj
        })
        const saveComment = await this.commentRepository.save(newComment)
        return saveComment
    }

    async getCommentsByCardId(userid:number,columnid:number,cardid:number){
        const card = await this.cardService.getCardById(userid,columnid,cardid)
        const comments = await this.commentRepository.find({where: {
            card: card
        }})
        if(!comments){
            throw new HttpException('Comments Not Found',404); 
        }
        return comments
    }

    async getCommentById(userid:number,columnid:number,cardid:number,commentid:number){
        const card = await this.cardService.getCardById(userid,columnid,cardid)
        const comment = await this.commentRepository.findOneBy({id: commentid })
        if(!comment){
            throw new HttpException('Comment Not Found',404)
        }
        return comment
    }

    async updateComment(userid:number,columnid:number,cardid:number,commentid:number,commentData:UpdateCommentParams){
        const comment =await this.getCommentById(userid,columnid,cardid,commentid)
        const request = await this.commentRepository.update(comment,{...commentData})
        if(request.affected==0){
            throw new HttpException('Comment Not Found',404)
        }
        return {msg:'Comment data have been updated'}
    }

    async deleteComment(userid:number,columnid:number,cardid:number,commentid:number){
        const card = await this.cardService.getCardById(userid,columnid,cardid)
        const comment = await this.commentRepository.delete({id: commentid})
        if(comment.affected==0){
            throw new HttpException('Comment Not Found',404) 
        }
        return {msg:'Comment have been deleted'}
    }

    async getCommentByCommentIdAndOwnerId(commentid:number,ownerId:number){
        const owner = await this.userService.getUserById(ownerId)
        const comment = await this.commentRepository.findOneBy({
            id:commentid,
            owner:owner
        })
        if(comment){
            return true 
        }
        return false
    }
}
