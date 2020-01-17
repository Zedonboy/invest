import Vue from "vue"
import Vuex from "vuex"
import Plan from "../types/Plan"

Vue.use(Vuex)
let mainPlans = [new Plan(0,8,"3 days", 500, 5000, "STARTER INVESTMENT PLAN"), 
new Plan(1, 25, "5 days", 10000, 30000, "PREMIUM INVESTMENT PLAN"), 
new Plan(2, 35, "15 Days", 15000, 50000, "SILVER  INVESTMENT PLAN"), 
new Plan(3, 60, "30 Days", 40000, 1000000, "SUPER VIP INVESTMENT PLAN"), 
new Plan(4, 4, "2 days", 200, 200, "FAST TRADER INVESTMENT PLAN"),
new Plan(5, 10, "5 days", 8000, 50000, "Au24A GOLD INVESTMENT PLAN"), new Plan(6, 17.5, "14 days", 20000, 100000, "Au1022 GOLD INVESTMENT PLAN"), new Plan(7, 25, "21 Days", 45000, 1000000, "Au5081 GOLD INVESTMENT PLAN"),new Plan(8, 9, "7 Days", 13500, 50000, "CA24A INVESTMENT PLAN"), new Plan(9, 22, "15 Days", 13500, 50000, "CA56A INVESTMENT PLAN"),
new Plan(10, 6, "3 days", 9000, 15000, "OG5000 ONE-TIME INVESTMENT PLAN"), new Plan(11, 15, "10 days", 18000, 80000, "OG8000 LIQUIFIED INVESTMENT PLAN"), new Plan(12, 20, "20 days", 10000, 100000, "OG10X22 PMS INVESTMENT PLAN"), new Plan(13, 30, "25 Days", 25000, 901120, "OG9112 OIL & GAS INVESTMENT PLAN"),
new Plan(14, 13.88, "5 days", 18000, 50000, "EU-EX455 HOUSING INVESTMENT PLAN"), new Plan(15, 14.6, "15 days", 50000, 100000, "EU-EX455 HOUSING INVESTMENT PLAN"), new Plan(16, 14.6, "15 days", 50000, 100000, "AM-EX555 HOUSING INVESTMENT PLAN"),
new Plan(17, 9, "7 days", 15500, 50000, "AGR24A INVESTMENT PLAN"), new Plan(18, 22, "15 days", 22000, 500000, "AGR56A INVESTMENT PLAN")]
let forex = [0,1,2,3,4]
let gold = [5,6,7]
let canabis = [8,9]
let oil = [10,11,12,13]
let estate = [14,15,16]
let agric = [17,18]

const store = new Vuex.Store({
    state : {
        mainPlans,
        plans : [forex, gold, canabis, estate, agric, oil],
        user : {}
    },

    mutations : {
        updateUser (state, payload){
            state.user = payload
        }
    }
})

export default store