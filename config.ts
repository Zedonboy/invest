import rnd from "randomstring"
export const sessionSecret = rnd.generate()
export const DB_Uri = "mongodb://localhost:27017/investApp"
export const Mail = {
    host : "",
    port : 0,
    secured : false,
    auth : {
        user : "",
        pass : ""
    }
}
export const adminEmail = ""
export const adminWalletAddress = "33KyXr257rXAFsLpy6Z3uKBHh4BAq1oaih"
export const baseUrl = "http://localhost:3000"