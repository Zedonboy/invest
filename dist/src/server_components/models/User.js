"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//@ts-nocheck
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
            this.isAdmin = mongooseDoc.isAdmin;
            this.investment = mongooseDoc.investment;
            this.deposited = mongooseDoc.depositedAmt;
        }
    }
}
exports.UserData = UserData;
//# sourceMappingURL=User.js.map