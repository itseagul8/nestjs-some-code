import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";
import { Coll } from "./Coll";
import { Comment } from "./Comment";

@Entity({name:'user_cards'})
export class Card{
    @PrimaryGeneratedColumn()
    id:number
    @Column({
        type: "varchar",
        length: 200,
        nullable:true
    })
    title:string
    @Column({
        type: "varchar",
        length: 300,
        nullable:false
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
    @ManyToOne(()=>Coll,(coll)=>coll.cards,{
        onDelete: "CASCADE",
    })
    coll:Coll
    @OneToMany(()=>Comment,(comment)=> comment.card)
    comments: Comment[]
}