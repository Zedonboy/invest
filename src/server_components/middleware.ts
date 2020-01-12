import { Request, Response } from "express";
import validator from "validator";
import { returnError } from "./utils";
import { UserDBModel } from "./models/User";
import { redirect } from "./controller";

export function loginMiddleware(req : Request, res : Response, next : () => void){
    validator.trim(req.body.email)
    validator.trim(req.body.password)
    if(validator.isEmail(req.body.email) && req.body.password && req.body.password.length > 0){
        next()
    } else {
        returnError(res, 400, "email or password is not valid or empty")
    }
}

export function Authenticated(req : Request, res : Response, next : () => void){
    // @ts-ignore
    if(req.session && req.session.userId){
        next()
    } else {
        //redirect(res, "/#/login")
        res.redirect("/#/login")
        //returnError(res, 401, "route is not authorised")
    }
}

export function IsAdmin(req : Request, res : Response, next : () => void){
    //@ts-ignore
    UserDBModel.findById(req.session.userId, (err, doc) => {
        if(err){
            returnError(res, 409, "Could not find user")
        } else if(doc) {
            //@ts-ignore
            if(doc.isAdmin){
                next()
            } else {
                returnError(res, 409, "You are not admin! :(")
            }
        }
    })
}