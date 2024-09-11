import { Injectable } from "@nestjs/common"
import { PassportStrategy } from "@nestjs/passport"
import { ExtractJwt, Strategy } from "passport-jwt"

Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExiration:false,
            secretOrKey:'5E0B2F0D4CAEDD314984768EE5E1AF65'
        })
    }
    validate(payload:any){
        return payload
    }
}