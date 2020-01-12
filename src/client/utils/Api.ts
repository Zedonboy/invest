import Axios, { AxiosInstance } from "axios"
export default class InvestAPI {
    private static csrf_token : string = null
    private static instance : AxiosInstance = null
    static init(csrf : string){
        this.csrf_token = csrf
        this.instance = Axios.create({
            withCredentials : true,
            headers : {
                'csrf-token' : this.csrf_token
            }
        })
    }
    static login(email : string, pwd : string){
        this.checkToken()
        return this.instance.post("/api/v1/login", {
            email : email,
            password : pwd
        })
    }

    static register(email : string, password : string){
        this.checkToken()
        return this.instance.post("/api/v1/createUser", {
            email, password
        }, {
            xsrfHeaderName : this.csrf_token
        })
    }

    static logout(){
        this.checkToken()
        return this.instance.get("/api/v1/logout")
    }

    static getUser(){
        this.checkToken()
        return this.instance.get("/api/v1/getUser")
    }

    static withdraw(walletID : string, amount : number){
        this.checkToken()
        return this.instance.post("/api/v1/withdraw", {
            amount,
            walletAddress : walletID
        })
    }

    static activateInvestment(plan : number, amt : number){
        this.checkToken()
        return this.instance.post("/api/v1/activate/investment", {
            investmentPlan : plan,
            investAmt : amt
        })
    }

    static searchUser(email : string) {
        this.checkToken()
        return this.instance.post("/api/v1/searchUser", {
            searchTerm : email
        })
    }

    static updateUser(user : any, searchEmail : string){
        this.checkToken()
        return this.instance.post("/api/v1/updateUser", {
            user,
            searchEmail
        })
    }

    private static checkToken(){
        if(!this.csrf_token){
            console.error("CSRF token not initialized")
        }
    }
}