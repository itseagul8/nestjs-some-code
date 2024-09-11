import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRole } from 'src/typeorm/utils/types';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class UserAccessGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private userService: UsersService
  ) {}

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const request = context.switchToHttp().getRequest()
    const user = await this.userService.getUserById(request.params.userid)
    let access_list=[]
    if(user.access_list&&user.access_list.length){
        access_list = user.access_list.split(',')
    }
    let checkIfAccessGranted = access_list.includes(request.user.id.toString())
    if(request.user.role==UserRole.ADMIN||request.user.id==request.params.userid||checkIfAccessGranted){
      return true
    }
    return false
  }
}
