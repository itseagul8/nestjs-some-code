import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/createUser.dto';
import { UpdateUserDto } from './dtos/updateUser.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { RoleCheckGuard } from 'src/auth/guards/rolecheck.guard';
import { UserRole } from 'src/typeorm/utils/types';
import { Roles } from 'src/typeorm/utils/roles.decorator';
import { UserAccessGuard } from 'src/auth/guards/useraccess.guard';
import { ManageAcceessDto } from './dtos/manageAcceess.dto';

@Controller('users')
export class UsersController {
    constructor(private userService: UsersService ){}

    @Post()
    createUser(@Body() userData:CreateUserDto){
        return this.userService.createUser(userData)
    }

    @Get(':userid')
    @Roles(UserRole.USER,UserRole.ADMIN)
    @UseGuards(JwtAuthGuard,RoleCheckGuard,UserAccessGuard)
    getUserById(@Param('userid',ParseIntPipe) userid:number){
        return this.userService.getUserById(userid)
    }

    @Put(':userid')
    @Roles(UserRole.USER,UserRole.ADMIN)
    @UseGuards(JwtAuthGuard,RoleCheckGuard,UserAccessGuard)
    async updateUser(@Param('userid',ParseIntPipe) userid:number,@Body() userData:UpdateUserDto){
        return await this.userService.updateUser(userid,userData)
    }

    @Patch(':userid')
    @Roles(UserRole.USER,UserRole.ADMIN)
    @UseGuards(JwtAuthGuard,RoleCheckGuard,UserAccessGuard)
    async grantAcceess(@Param('userid',ParseIntPipe) userid:number,@Body() data:ManageAcceessDto){
        return await this.userService.manageAcceess(userid,data)
    }

    @Delete(':userid')
    @Roles(UserRole.USER,UserRole.ADMIN)
    @UseGuards(JwtAuthGuard,RoleCheckGuard,UserAccessGuard)
    async deleteUser(@Param('userid',ParseIntPipe) userid:number){
        return await this.userService.deleteUser(userid)
    }

    @Roles(UserRole.ADMIN)
    @UseGuards(JwtAuthGuard,RoleCheckGuard)
    @Get()
    async getUsers(){
        const users = await this.userService.getUsers()
        return users
    }
}
