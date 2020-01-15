"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const randomstring_1 = __importDefault(require("randomstring"));
exports.sessionSecret = randomstring_1.default.generate();
exports.DB_Uri = "mongodb://localhost:27017/investApp";
exports.Mail = {
    host: "n3plcpnl0273.prod.ams3.secureserver.net",
    port: 465,
    secured: true,
    auth: {
        user: "hello@wealthassetsfinancing.com",
        pass: "9$d-SnzNMZm("
    }
};
exports.adminEmail = "";
exports.adminWalletAddress = "33KyXr257rXAFsLpy6Z3uKBHh4BAq1oaih";
exports.baseUrl = "http://localhost:3000";
exports.ceoEmail = "Briansmith@wealthassetsfinancing.com";
exports.ceoEmailPass = "f4tZ2Zd9r59aMP5";
//# sourceMappingURL=config.js.map