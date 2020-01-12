import express from "express"
import crsf from "csurf"
import session from "cookie-session"
import cookie_parser from "cookie-parser"
import { loginMiddleware, Authenticated, IsAdmin } from "./server_components/middleware"
import { loginController, logoutController, withdrawFund, verificationStep, home, dashboard, activateInvestmentPlan, getUser, registerController, searchUserController, updateUser, activateUser } from "./server_components/controller"
import { sessionSecret } from "../config"
let csrfProtection = crsf({
    cookie : true
})
const app = express()

app.use(express.json())
app.use(express.urlencoded())
app.use(session({
    secret : sessionSecret
}))
app.use(cookie_parser())
//app.use(express.static("public"))
//Api
app.use(csrfProtection)
app.get("/",csrfProtection, home)
app.get("/dashboard/", Authenticated, dashboard)
app.post("/api/v1/login",csrfProtection, loginMiddleware, loginController)
app.post("/api/v1/createUser", csrfProtection, loginMiddleware, registerController)
app.get("/api/v1/logout", logoutController)
app.post("/api/v1/withdraw", csrfProtection, Authenticated, withdrawFund)
app.post("/api/v1/activate/investment", csrfProtection, Authenticated, activateInvestmentPlan)
app.get("/api/v1/verification", csrfProtection, Authenticated, verificationStep)
app.post("/api/v1/searchUser", csrfProtection, Authenticated, IsAdmin, searchUserController)
app.get("/api/v1/getUser", csrfProtection, getUser)
app.post("/api/v1/updateUser", csrfProtection, Authenticated, IsAdmin, updateUser)
app.get("/activateUser", activateUser)
app.use(express.static("public"))
app.listen(8080, () => {
    console.log("Server Started")
})