"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const User_1 = require("./models/User");
const utils_1 = require("./utils");
const config_1 = require("../../config");
const fs_1 = __importDefault(require("fs"));
const handlebars_1 = __importDefault(require("handlebars"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const randomstring_1 = __importDefault(require("randomstring"));
const transpoter = nodemailer_1.default.createTransport({
    host: config_1.Mail.host,
    port: config_1.Mail.port,
    secure: config_1.Mail.secured,
    auth: {
        user: config_1.Mail.auth.user,
        pass: config_1.Mail.auth.pass
    }
});
mongoose_1.default.connect(config_1.DB_Uri).catch(reason => {
    console.error("Error occured in Database Connection");
    console.log(reason);
    process.exit(1);
});
let db = mongoose_1.default.connection;
function home(req, res) {
    fs_1.default.readFile("public/index.html", (err, data) => {
        if (err) {
            res.send("Error getting page, its not your fault. contact web admin");
            return;
        }
        let template = handlebars_1.default.compile(data.toString("utf8"));
        res.send(template({
            //@ts-ignore
            csrfToken: req.csrfToken()
        }));
    });
}
exports.home = home;
function dashboard(req, res) {
    //@ts-ignore
    User_1.UserDBModel.findById(req.session.userId, (err, doc) => {
        if (err) {
            return;
        }
        //@ts-ignore
        if (doc.isAdmin) {
            // show admin
            fs_1.default.readFile("public/admin.html", (err, data) => {
                if (err) {
                    res.send("Error getting page, its not your fault. contact web admin");
                    return;
                }
                let template = handlebars_1.default.compile(data.toString("utf8"));
                res.send(template({
                    //@ts-ignore
                    csrfToken: req.csrfToken()
                }));
            });
        }
        else {
            if (err) {
                res.send("Error getting page, its not your fault. contact web admin");
                return;
            }
            fs_1.default.readFile("public/dashboard.html", (err, data) => {
                let template = handlebars_1.default.compile(data.toString("utf8"));
                res.send(template({
                    //@ts-ignore
                    csrfToken: req.csrfToken()
                }));
            });
        }
    });
}
exports.dashboard = dashboard;
function loginController(req, res) {
    User_1.UserDBModel.findOne({
        email: req.body.email,
        password: req.body.password
    }, (err, doc) => {
        if (err) {
            utils_1.returnError(res, 500, "Error in accessing Database during Login");
        }
        else {
            if (!doc) {
                utils_1.returnError(res, 404, "Such credentials not found");
            }
            else {
                //@ts-ignore
                req.session.userId = doc._id;
                // res.json({
                //   user: new UserData(doc)
                // });
                redirect(res, "/dashboard");
                //@ts-ignore
                sendMail(config_1.adminEmail, `${doc.email} wants to login`, "Someone wants to login");
            }
        }
    });
}
exports.loginController = loginController;
function registerController(req, res) {
    User_1.UserDBModel.exists({
        email: req.body.email
    }, (err, exists) => {
        if (err) {
            utils_1.returnError(res, 500, "Error accessing database during check whether credentials exist");
        }
        else if (exists) {
            utils_1.returnError(res, 409, "Credentials already exists in database");
        }
        else {
            User_1.UserDBModel.create({
                email: req.body.email,
                password: req.body.password
            }, (err, doc) => {
                if (err) {
                    utils_1.returnError(res, 500, "Error accessing database during check whether credentials exist");
                }
                else {
                    //@ts-ignore
                    req.session.userId = doc._id;
                    redirect(res, "/dashboard");
                    let cnts = ` Hello\n\n Click <a href="${config_1.baseUrl}/activateUser?activationCode=${randomstring_1.default.generate()}">this</a> to confirm the creation of Account\n`;
                    sendMail(doc.email, cnts, "Confirm Email");
                    sendMail(config_1.adminEmail, `${doc.email} has added`, "Someone has created account");
                }
            });
        }
    });
    // send acc
}
exports.registerController = registerController;
function activateInvestmentPlan(req, res) {
    if (!req.body.investmentPlan && !Number.isInteger(req.body.investmentPlan) && !req.body.investAmt && !Number.isInteger(req.body.investAmt)) {
        utils_1.returnError(res, 401, "You didn't supply investment Plan you are interested");
        return;
    }
    // @ts-ignore
    User_1.UserDBModel.findById(req.session.userId, (err, doc) => {
        if (err) {
            utils_1.returnError(res, 400, "Error in Database during database access for activation of invest plan");
        }
        else {
            if (doc) {
                // @ts-ignore
                doc.investMent = req.body.investmentPlan;
                //@ts-ignore
                doc.investedAmt = req.body.investAmt;
                //@ts-ignore
                doc.timeOfInvest = new Date();
                doc
                    .save()
                    .then(v => {
                    res.json({
                        user: new User_1.UserData(doc)
                    });
                })
                    .catch(err => {
                    utils_1.returnError(res, 500, "Error in database saving activated Investment Plan");
                });
            }
        }
    });
}
exports.activateInvestmentPlan = activateInvestmentPlan;
/**
 * @requires amount
 * @requires walletAddress
 * @param req
 * @param res
 */
function withdrawFund(req, res) {
    // notify grant on withdrawal
    let amount = req.body.amount;
    let walletAddress = req.body.walletAddress;
    if (!amount && !walletAddress) {
        utils_1.returnError(res, 409, "required field is not complete");
    }
    // do checkings here
    //@ts-ignore
    User_1.UserDBModel.findById(req.session.userId, (err, doc) => {
        if (err) {
            utils_1.returnError(res, 500, "Error accessing database during withdrawal fund");
        }
        else {
            if (doc) {
                //@ts-ignore
                let contnts = `<p> ${doc.email} is requesting to withdraw ${amount} with wallet Address of ${walletAddress}`;
                //@ts-ignore
                sendMail(doc.email, contnts, "Client wants to Withdraw");
                utils_1.returnError(res, 200, "Your Withdrawal Transaction is being processed. Admins will contact you shortly");
            }
        }
    });
}
exports.withdrawFund = withdrawFund;
function verificationStep(req, res) { }
exports.verificationStep = verificationStep;
function logoutController(req, res) {
    //@ts-ignore
    req.session = null;
    redirect(res, "/");
}
exports.logoutController = logoutController;
function sendMail(to, contents, subject) {
    let info = transpoter.sendMail({
        from: "no-reply@waf.com",
        to: to,
        html: contents,
        subject: subject
    });
    return info;
}
function searchUserController(req, res) {
    if (req.body.searchTerm) {
        User_1.UserDBModel.findOne({
            email: req.body.searchTerm
        }, (err, doc) => {
            if (err) {
                utils_1.returnError(res, 409, "Error accessing Database during Search User Op");
            }
            else if (doc) {
                res.json({
                    user: new User_1.UserData(doc)
                });
            }
            else {
                utils_1.returnError(res, 404, "Could not any user with such credentials");
            }
        });
    }
}
exports.searchUserController = searchUserController;
function updateUser(req, res) {
    if (req.body.user && req.body.searchEmail) {
        let editedUser = req.body.user;
        User_1.UserDBModel.updateOne({
            email: req.body.searchEmail
        }, Object.assign({}, editedUser), (err, doc) => {
            if (err) {
                utils_1.returnError(res, 500, "Error Database during Update Op");
            }
            else if (doc) {
                utils_1.returnError(res, 200, "Successfully");
            }
        });
    }
}
exports.updateUser = updateUser;
function activateUser(req, res) {
    let code = req.query.activationCode;
    User_1.UserDBModel.findOne({
        activationCode: code
    }, (err, doc) => {
        // handle error later
        if (doc) {
            //@ts-ignore
            doc.activated = true;
            doc.save();
            res.redirect(config_1.baseUrl);
        }
    });
}
exports.activateUser = activateUser;
function getUser(req, res) {
    //@ts-ignore
    if (req.session && req.session.userId) {
        //@ts-ignore
        User_1.UserDBModel.findById(req.session.userId, (err, doc) => {
            res.json({
                user: err ? null : new User_1.UserData(doc)
            });
        });
    }
}
exports.getUser = getUser;
function redirect(res, url) {
    res.status(200).json({
        _redirectUrl: url
    }).se;
}
exports.redirect = redirect;
//# sourceMappingURL=controller.js.map