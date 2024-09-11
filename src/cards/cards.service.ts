import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Card } from 'src/typeorm/entities/Card';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { CreateCardParams, UpdateCardOrderParams, UpdateCardParams } from './utils/types';
import { ColumnsService } from 'src/columns/columns.service';
import { SortFunc } from 'src/utils/sortFunc';

@Injectable()
export class CardsService {
    constructor(
        @InjectRepository(Card) private cardRepository: Repository<Card>,
        private userService: UsersService,
        private columnService: ColumnsService
    ){}

    async createCard(userid:number,columnid:number,cardData:CreateCardParams){
        const user = await this.userService.getUserById(userid)
        const column = await this.columnService.getColumnById(userid,columnid)
        const cardsSet = await this.getCardsByColumnId(userid,columnid)
        let order_number = cardsSet.length
        if(typeof(order_number)!='number'){
            order_number=0
        }
        const newCard = this.cardRepository.create({
            ...cardData,
            user,
            coll:column,
            order_number:order_number+1
        })
        const saveCard = await this.cardRepository.save(newCard)
        return saveCard
    }

    async getCardsByColumnId(userid:number,columnid:number){
        const column = await this.columnService.getColumnById(userid,columnid)
        const cards = await this.cardRepository.find({where: {
            coll: column
        }})
        if(!cards){
            throw new HttpException('Cards Not Found',404); 
        }
        return cards
    }

    async getCardById(userid:number,columnid:number,cardid:number){
        const column = await this.columnService.getColumnById(userid,columnid)
        const card = await this.cardRepository.findOneBy({id: cardid })
        if(!card){
            throw new HttpException('Card Not Found',404); 
        }
        return card
    }

    async updateCard(userid:number,columnid:number,cardid:number,cardData:UpdateCardParams){
        const column = await this.columnService.getColumnById(userid,columnid)
        const card = await this.cardRepository.update({id: cardid},{...cardData})
        if(card.affected==0){
            throw new HttpException('Card Not Found',404); 
        }
        return {msg:'Card data have been updated'}
    }

    async updateCardOrder(userid:number,columnid:number,cardid:number,cardData:UpdateCardOrderParams){
        if(cardData.action=='change-order'){//card changes it's order inside of column
            let cards = await this.getCardsByColumnId(userid,columnid)
            const theCardIndex = cards.findIndex((element) => element.id==cardid)
            if(cardData.direction=='before'){
                cards[theCardIndex].order_number=cardData.placeid-0.5
            }else if(cardData.direction=='after'){
                cards[theCardIndex].order_number=cardData.placeid+0.5
            }else{
                throw new HttpException('Direction was not set',404)
            }
            cards=SortFunc('order_number',cards)
            let i=1
            cards.forEach((element)=>{element.order_number=i++})
            const saveCards = await this.cardRepository.save(cards)
            return saveCards
        }else if(cardData.action=='change-position'){//card travels between columns
            const columnFrom = await this.columnService.getColumnById(userid,columnid)
            const columnTo = await this.columnService.getColumnById(userid,cardData.placeid)
            const columnToLength=[columnTo].length
            const card = await this.cardRepository.update({id: cardid},{coll:columnTo,order_number:columnToLength+1})
            let cards = await this.getCardsByColumnId(userid,columnid)
            cards=SortFunc('order_number',cards)
            let i=1
            cards.forEach((element)=>{element.order_number=i++})
            const saveCards = await this.cardRepository.save(cards)
            if(card.affected==0){
                throw new HttpException('Card Not Found',404)
            }
            return {msg:'Card data have been updated'}
        }else{
            throw new HttpException('Invalid action',404)
        }
    }

    async deleteCard(userid:number,columnid:number,cardid:number){
        const column = await this.columnService.getColumnById(userid,columnid)
        const card = await this.cardRepository.delete({id: cardid})
        if(card.affected==0){
            throw new HttpException('Card Not Found',404) 
        }
        return {msg:'Card have been deleted'}
    }
}
