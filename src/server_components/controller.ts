//@ts-nocheck
import { Request, Response } from "express";
import mongoose from "mongoose";
import { UserDBModel, UserData } from "./models/User";
import { returnError as returnResponse, returnError } from "./utils";
import { DB_Uri, Mail, adminEmail, baseUrl } from "../../config";
import fs from "fs"
import Handlebars from 'handlebars'
import nodemailer from "nodemailer";
import rnd from "randomstring"
const transpoter = nodemailer.createTransport({
  host: Mail.host,
  port: Mail.port,
  secure: Mail.secured,
  auth: {
    user: Mail.auth.user,
    pass: Mail.auth.pass
  }
});
mongoose.connect(DB_Uri).catch(reason => {
  console.error("Error occured in Database Connection");
  console.log(reason);
  process.exit(1);
});
let db = mongoose.connection;
export function home (req : Request, res : Response){
  fs.readFile("public/index.html", (err, data) => {
    if(err) {
      res.send("Error getting page, its not your fault. contact web admin")
      return
    }
    let template = Handlebars.compile(data.toString("utf8"))
    res.send(template({
      //@ts-ignore
      csrfToken : req.csrfToken()
    }))
  })
}

export function dashboard(req : Request, res : Response){
  //@ts-ignore
  UserDBModel.findById(req.session.userId, (err, doc) => {
    if(err){
      return
    }
    //@ts-ignore
    if(doc.isAdmin){
      // show admin
      fs.readFile("public/admin.html", (err, data) => {
        if(err){
          res.send("Error getting page, its not your fault. contact web admin")
          return
        }
        let template = Handlebars.compile(data.toString("utf8"))
        res.send(template({
          //@ts-ignore
          csrfToken : req.csrfToken()
        }))
      })
    } else {
      if(err) {
        res.send("Error getting page, its not your fault. contact web admin")
        return
      }
      fs.readFile("public/dashboard.html", (err, data) => {
        let template = Handlebars.compile(data.toString("utf8"))
        res.send(template({
          //@ts-ignore
          csrfToken : req.csrfToken()
        }))
      })
    }
  })
  
}
export function loginController(req: Request, res: Response) {
  UserDBModel.findOne(
    {
      email: req.body.email,
      password: req.body.password
    },
    (err, doc) => {
      if (err) {
        returnResponse(res, 500, "Error in accessing Database during Login");
      } else {
        if (!doc) {
          returnResponse(res, 404, "Such credentials not found");
        } else {
          //@ts-ignore
          req.session.userId = doc._id;
          // res.json({
          //   user: new UserData(doc)
          // });
          redirect(res, "/dashboard")
          //@ts-ignore
          sendMail(adminEmail, `${doc.email} wants to login`, "Someone wants to login")
        }
      }
    }
  );
}

export function registerController(req: Request, res: Response) {
  UserDBModel.exists(
    {
      email: req.body.email
    },
    (err, exists) => {
      if (err) {
        returnResponse(
          res,
          500,
          "Error accessing database during check whether credentials exist"
        );
      } else if (exists) {
        returnResponse(res, 409, "Credentials already exists in database");
      } else {
        UserDBModel.create(
          {
            email: req.body.email,
            password: req.body.password
          },
          (err, doc) => {
            if (err) {
              returnResponse(
                res,
                500,
                "Error accessing database during check whether credentials exist"
              );
            } else {
              //@ts-ignore

              req.session.userId = doc._id;
              redirect(res, "/dashboard")
              let cnts = ` Hello\n\n Click <a href="${baseUrl}/activateUser?activationCode=${rnd.generate()}">this</a> to confirm the creation of Account\n`
              sendMail(doc.email, cnts, "Confirm Email")
              sendMail(adminEmail, `${doc.email} has added`, "Someone has created account")
            }
          }
        );
      }
    }
  );

  // send acc
}

export function activateInvestmentPlan(req: Request, res: Response) {
  if (!req.body.investmentPlan && !Number.isInteger(req.body.investmentPlan) && !req.body.investAmt && !Number.isInteger(req.body.investAmt)) {
    returnResponse(
      res,
      401,
      "You didn't supply investment Plan you are interested"
    );
    return;
  }

  // @ts-ignore
  UserDBModel.findById(req.session.userId, (err, doc) => {
    if (err) {
      returnResponse(
        res,
        400,
        "Error in Database during database access for activation of invest plan"
      );
    } else {
      if (doc) {
        // @ts-ignore
        doc.investMent = req.body.investmentPlan;
        //@ts-ignore
        doc.investedAmt = req.body.investAmt
        //@ts-ignore
        doc.timeOfInvest = new Date()
        doc
          .save()
          .then(v => {
            res.json({
              user: new UserData(doc)
            });
          })
          .catch(err => {
            returnResponse(
              res,
              500,
              "Error in database saving activated Investment Plan"
            );
          });
      }
    }
  });
}

/**
 * @requires amount
 * @requires walletAddress
 * @param req 
 * @param res 
 */

export function withdrawFund(req: Request, res: Response) {
  // notify grant on withdrawal
  let amount = req.body.amount
  let walletAddress = req.body.walletAddress
  if(!amount && !walletAddress) {
    returnResponse(res, 409, "required field is not complete")
  }
  // do checkings here
  //@ts-ignore
  UserDBModel.findById(req.session.userId, (err, doc) => {
    if (err) {
      returnResponse(res, 500, "Error accessing database during withdrawal fund")
    } else {
      if(doc){
        //@ts-ignore
        let contnts = `<p> ${doc.email} is requesting to withdraw ${amount} with wallet Address of ${walletAddress}`
        //@ts-ignore
        sendMail(doc.email, contnts, "Client wants to Withdraw")
        returnResponse(res, 200, "Your Withdrawal Transaction is being processed. Admins will contact you shortly")
      }
    }
  })
}

export function verificationStep(req: Request, res: Response) {}

export function logoutController(req : Request, res : Response){
  //@ts-ignore
  req.session = null
  redirect(res, "/")
}

function sendMail(to: string, contents: string, subject: string) : Promise<any> {
  let info = transpoter.sendMail({
    from: "no-reply@waf.com",
    to: to,
    html: contents,
    subject: subject
  });

  return info
}

export function searchUserController(req : Request, res : Response){
  if(req.body.searchTerm){
    UserDBModel.findOne({
      email : req.body.searchTerm
    }, (err, doc) => {
      if(err){
        returnResponse(res, 409, "Error accessing Database during Search User Op")
      } else if(doc){
        res.json({
          user : new UserData(doc)
        })
      } else {
        returnResponse(res, 404, "Could not any user with such credentials")
      }
    })
  }
}

export function updateUser(req : Request, res : Response){
  if(req.body.user && req.body.searchEmail){
    let editedUser = req.body.user
    UserDBModel.updateOne({
      email : req.body.searchEmail
    }, {...editedUser}, (err , doc) => {
      if(err){
        returnResponse(res, 500, "Error Database during Update Op")
      } else if(doc){
        returnResponse(res, 200, "Successfully")
      }
    })
  }
}

export function activateUser(req : Request, res : Response){
  let code = req.query.activationCode
  UserDBModel.findOne({
    activationCode : code
  }, (err, doc) => {
    // handle error later
    if(doc){
      //@ts-ignore
      doc.activated = true
      doc.save()
      res.redirect(baseUrl)
    }
  })
}

export function getUser(req : Request, res : Response){
  //@ts-ignore
  if(req.session && req.session.userId){
    //@ts-ignore
    UserDBModel.findById(req.session.userId, (err, doc) => {  
      res.json({
        user : err ? null : new UserData(doc)
      })
    })
  }
}

export function redirect(res : Response,url : string){
  res.status(200).json({
    _redirectUrl : url
  }).se
}
