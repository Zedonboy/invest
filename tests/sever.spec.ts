import chai from "chai"
import chaiHttp from "chai-http"
let assert = chai.assert
let should = chai.should()
require("../src/server")
chai.use(chaiHttp)
let chaiReq = chai.request("http://localhost:8080")
describe("Server Apis", () => {
    it("login", () => {
        chaiReq
        .post("/api/v1/login")
        .send({
            email : "declan@vermail.com",
            password : "dec"
        })
        .end((err, res) => {
            assert.notExists(err)
            should.equal(200, res.status)
        })
    })

    it("registration", () => {
        chaiReq
        .post("/api/v1/createUser")
        .send({
            email : "declan@vermail.com",
            password : "dec"
        })
        .end((err, res) => {
            assert.notExists(err)
            should.equal(200, res.status)
        })
    })
})
