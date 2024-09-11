import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { CommentsService } from 'src/comments/comments.service';
import { UserRole } from 'src/typeorm/utils/types';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class UserAccessForCommentsGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private commentsService: CommentsService,
    private userService: UsersService
  ) {}

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const request = context.switchToHttp().getRequest()
    const comment = await this.commentsService.getCommentById(request.userid,request.columnid,request.cardid,request.commentid)
    const user = await this.userService.getUserById(request.params.userid)

    let access_list=[]
    if(user.access_list&&user.access_list.length){
        access_list = user.access_list.split(',')
    }
    let checkIfAccessGranted = access_list.includes(request.user.id.toString())

    const checkIfItIsOwnComment = await this.commentsService.getCommentByCommentIdAndOwnerId(request.params.commentid,request.user.id)

    //only comment owner can update comments. Admins and users can delete comment if they don't like it  
    if(request.method=='PUT'&&!checkIfItIsOwnComment){
      return false
    }

    if(request.user.role==UserRole.ADMIN||request.user.id==request.params.userid||checkIfAccessGranted||checkIfItIsOwnComment){
      return true
    }
    return false
  }
}
