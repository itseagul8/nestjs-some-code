import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";
import { Card } from "./Card";
import { Coll } from "./Coll";

@Entity({name:'user_comments'})
export class Comment{
    @PrimaryGeneratedColumn()
    id:number
    @Column({
        type: "varchar",
        length: 150,
        nullable:false
    })
    text:string
    @Column({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
        nullable:false
    })
    createdAt: Date
    @ManyToOne(()=>User,(user)=>user.comments,{
        onDelete: "CASCADE",
    })
    user:User
    @ManyToOne(()=>Coll,(column)=>column.comments,{
        onDelete: "CASCADE",
    })
    coll:Coll
    @ManyToOne(()=>Card,(card)=>card.comments,{
        onDelete: "CASCADE",
    })
    card:Card
    @ManyToOne(()=>User,(user)=>user.personal_comments,{
        onDelete: "CASCADE",
    })
    owner:User
}