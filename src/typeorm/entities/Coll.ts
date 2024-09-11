import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";
import { Card } from "./Card";
import { Comment } from "./Comment";

@Entity({name:'user_colls'})
export class Coll{
    @PrimaryGeneratedColumn()
    id:number
    @Column({
        type: "varchar",
        length: 150,
        nullable:false
    })
    title:string
    @Column({
        type: "varchar",
        length: 200,
        nullable:true
    })
    description:string
    @Column({
        type: "int",
        nullable:false
    })
    order_number:number
    @Column({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
        nullable:false
    })
    createdAt: Date
    @ManyToOne(()=>User,(user)=>user.colls,{
        onDelete: "CASCADE",
    })
    user:User
    @OneToMany(()=>Card,(card)=> card.coll)
    cards: Card[]
    @OneToMany(()=>Comment,(comment)=> comment.coll)
    comments: Comment[]
}