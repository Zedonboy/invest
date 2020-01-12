"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const validator_1 = __importDefault(require("validator"));
const utils_1 = require("./utils");
const User_1 = require("./models/User");
const controller_1 = require("./controller");
function loginMiddleware(req, res, next) {
    validator_1.default.trim(req.body.email);
    validator_1.default.trim(req.body.password);
    if (validator_1.default.isEmail(req.body.email) && req.body.password && req.body.password.length > 0) {
        next();
    }
    else {
        utils_1.returnError(res, 400, "email or password is not valid or empty");
    }
}
exports.loginMiddleware = loginMiddleware;
function Authenticated(req, res, next) {
    // @ts-ignore
    if (req.session && req.session.userId) {
        next();
    }
    else {
        controller_1.redirect(res, "/#/login");
        //res.redirect("/#/login")
        //returnError(res, 401, "route is not authorised")
    }
}
exports.Authenticated = Authenticated;
function IsAdmin(req, res, next) {
    //@ts-ignore
    User_1.UserDBModel.findById(req.session.userId, (err, doc) => {
        if (err) {
            utils_1.returnError(res, 409, "Could not find user");
        }
        else if (doc) {
            //@ts-ignore
            if (doc.isAdmin) {
                next();
            }
            else {
                utils_1.returnError(res, 409, "You are not admin! :(");
            }
        }
    });
}
exports.IsAdmin = IsAdmin;
//# sourceMappingURL=middleware.js.map