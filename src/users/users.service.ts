import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/typeorm/entities/User';
import * as bcrypt from 'bcrypt';
import { CreateUserParams, ManageAccessParams, UpdateUserParams } from './utils/types';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
    ){}

    async createUser(userData:CreateUserParams){
        userData.password = await bcrypt.hash(userData.password, 10)
        const user = await this.userRepository.create({
            ...userData
        })
        return this.userRepository.save(user)
    }

    async getUserById(userid:number):Promise<User>{
        const user = await this.userRepository.findOneBy({id: userid })
        if(!user){
            throw new HttpException('User Not Found',404)
        }
        return user
    }

    async getUserByEmail(email:string):Promise<User>{
        const user = await this.userRepository.findOneBy({email: email })
        if(!user){
            throw new HttpException('User Not Found',404)
        }
        return user
    }

    async updateUser(userid:number,userData:UpdateUserParams){
        const resp = await this.userRepository.update({id: userid},{...userData})
        if(resp.affected==0){
            throw new HttpException('User Not Found',404)
        }
        return {msg:'user data have been updated'}
    }

    async manageAcceess(userid:number,data:ManageAccessParams){
        const user = await this.getUserById(userid)
        let otherUser = await this.getUserByEmail(data.email)
        otherUser.id.toString()
        let access_list=[]
        if(user.access_list&&user.access_list.length){
            access_list = user.access_list.split(',')
        }
        const checkIfIsSet = access_list.includes(otherUser)
        if(data.action=='grant'){
            if(!checkIfIsSet){
                access_list.push(otherUser)
            }else{
                throw new HttpException('User already has access',404)
            }
        }else if(data.action=='exclude'){
            if(checkIfIsSet){
                const index = access_list.indexOf(otherUser)
                access_list.splice(index, 1)
            }else{
                throw new HttpException('User already don\'t have access',404)
            }
        }else{
            throw new HttpException('No action was provided',404)
        }
        const resp = await this.userRepository.update({id: userid},{access_list:access_list.join()})
        if(resp.affected==0){
            throw new HttpException('User Not Found',404)
        }
        return {msg:'user data have been updated'}
    }

    async deleteUser(userid:number){
        const resp = await this.userRepository.delete({id: userid})
        if(resp.affected==0){
            throw new HttpException('User Not Found',404)
        }
        return {msg:'user have been deleted'}
    }

    async getUsers(){
        return await this.userRepository.find()
    }
}
