//@ts-nocheck
import {Schema, model, MongooseDocument } from "mongoose";

let schema = new Schema({
    email : {
        type : Schema.Types.String,
        unique : true
    },
    investment : Schema.Types.Number,
    password : Schema.Types.String,
    //transactions : Schema.Types.DocumentArray,
    isAdmin : {
        type : Schema.Types.Boolean,
        default : false
    },
    timeOfInvest : Schema.Types.Date,
    investedAmt : Schema.Types.Number,
    verifyStep : Schema.Types.Number,
    activated : Schema.Types.Boolean,
    activationCode : {
        type : Schema.Types.String,
        unique : true   
    },
    depositedAmt : Schema.Types.Number
})
export const UserDBModel = model('Users', schema)
export class UserData{
    email : string
    investment : number
    deposited : number
    transactions : []
    name : string
    verifyStep : number
    activated : boolean
    isAdmin : boolean
    constructor(mongooseDoc ?: MongooseDocument){
        if(mongooseDoc){
            //@ts-ignore
            this.email = mongooseDoc.email
            this.isAdmin = mongooseDoc.isAdmin
            this.investment = mongooseDoc.investment
            this.deposited = mongooseDoc.depositedAmt
        }
    }
}