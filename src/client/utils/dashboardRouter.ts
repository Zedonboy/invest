//@ts-nocheck
import VueRouter from "vue-router";
import Vue from "vue"
Vue.use(VueRouter)
import Home from "../dashboard_components/Home.vue"
import Withdraw from "../dashboard_components/Withdraw.vue"
import Deposit from "../dashboard_components/Deposit.vue"
import investPlan from "../dashboard_components/InvestPlan.vue"
const router = new VueRouter({
    routes : [{
        path : "/home",
        component : Home
    },{
        path : "/withdraw",
        component : Withdraw
    },{
        path : "/deposit",
        component : Deposit
    }, {
        path : "/verify"
    },{
        path : "/investmentPlan",
        component : investPlan
    }]
})

export default router