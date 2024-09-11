import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Coll } from "./Coll";
import { Card } from "./Card";
import { Comment } from "./Comment";
import { UserRole } from "../utils/types";
import { Exclude, instanceToPlain } from "class-transformer";

@Entity({name:'users'})
export class User{
    @PrimaryGeneratedColumn()
    id:number
    @Column({
        type: "varchar",
        length: 80,
        unique: true,
        nullable:false
    })
    email:string
    @Column({
        type: "varchar",
        length: 124,
        nullable:false
    })
    @Exclude({ toPlainOnly: true })
    password:string
    @Column({
        type: "set",
        enum: UserRole,
        default: [UserRole.USER],
    })
    role:UserRole[]
    @Column({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
        nullable:false
    })
    createdAt: Date
    @Column({
        type: "varchar",
        nullable:true
    })
    access_list: string
    @OneToMany(()=>Coll,(coll)=> coll.user)
    colls: Coll[]
    @OneToMany(()=>Card,(card)=> card.user)
    cards: Card[]
    @OneToMany(()=>Comment,(comment)=> comment.user)
    comments: Comment[]
    @OneToMany(()=>Comment,(comment)=> comment.owner)
    personal_comments: Comment[]
    toJSON() {
        return instanceToPlain(this)
    }
}