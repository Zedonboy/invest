"use strict";
//@ts-nocheck
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
let schema = new mongoose_1.Schema({
    email: {
        type: mongoose_1.Schema.Types.String,
        unique: true
    },
    investment: mongoose_1.Schema.Types.Number,
    password: mongoose_1.Schema.Types.String,
    //transactions : Schema.Types.DocumentArray,
    isAdmin: {
        type: mongoose_1.Schema.Types.Boolean,
        default: false
    },
    timeOfInvest: mongoose_1.Schema.Types.Date,
    investedAmt: mongoose_1.Schema.Types.Number,
    verifyStep: mongoose_1.Schema.Types.Number,
    activated: mongoose_1.Schema.Types.Boolean,
    activationCode: {
        type: mongoose_1.Schema.Types.String,
        unique: true
    },
    depositedAmt: mongoose_1.Schema.Types.Number
});
exports.UserDBModel = mongoose_1.model('Users', schema);
class UserData {
    constructor(mongooseDoc) {
        if (mongooseDoc) {
            //@ts-ignore
            this.email = mongooseDoc.email;
            //@ts-ignore
            this.isAdmin = mongooseDoc.isAdmin;
            //@ts-ignore
            this.investment = mongooseDoc.investment;
            //@ts-ignore
            this.deposited = mongooseDoc.depositedAmt;
            //@ts-ignore
            this.investedAmt = mongooseDoc.investedAmt;
        }
    }
}
exports.UserData = UserData;
//# sourceMappingURL=User.js.map