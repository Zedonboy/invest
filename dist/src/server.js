"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const csurf_1 = __importDefault(require("csurf"));
const cookie_session_1 = __importDefault(require("cookie-session"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const middleware_1 = require("./server_components/middleware");
const controller_1 = require("./server_components/controller");
const config_1 = require("../config");
let csrfProtection = csurf_1.default({
    cookie: true
});
const app = express_1.default();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded());
app.use(cookie_session_1.default({
    secret: config_1.sessionSecret
}));
app.use(cookie_parser_1.default());
//app.use(express.static("public"))
//Api
app.use(csrfProtection);
app.get("/", csrfProtection, controller_1.home);
app.get("/dashboard/", middleware_1.Authenticated, controller_1.dashboard);
app.post("/api/v1/login", csrfProtection, middleware_1.loginMiddleware, controller_1.loginController);
app.post("/api/v1/createUser", csrfProtection, middleware_1.loginMiddleware, controller_1.registerController);
app.get("/api/v1/logout", controller_1.logoutController);
app.post("/api/v1/withdraw", csrfProtection, middleware_1.Authenticated, controller_1.withdrawFund);
app.post("/api/v1/activate/investment", csrfProtection, middleware_1.Authenticated, controller_1.activateInvestmentPlan);
app.get("/api/v1/verification", csrfProtection, middleware_1.Authenticated, controller_1.verificationStep);
app.post("/api/v1/searchUser", csrfProtection, middleware_1.Authenticated, middleware_1.IsAdmin, controller_1.searchUserController);
app.get("/api/v1/getUser", csrfProtection, controller_1.getUser);
app.post("/api/v1/updateUser", csrfProtection, middleware_1.Authenticated, middleware_1.IsAdmin, controller_1.updateUser);
app.get("/activateUser", controller_1.activateUser);
app.use(express_1.default.static("public"));
app.listen(8080, () => {
    console.log("Server Started");
});
//# sourceMappingURL=server.js.map