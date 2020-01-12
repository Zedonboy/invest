import { Response } from "express";

export function returnError(res : Response, status : number, mssg : string){
    res.statusMessage = mssg
    res.status(status).end()
}