//@ts-nocheck
import VueRouter from "vue-router"
import Home from "../homepage_components/Home.vue"
import Login from "../homepage_components/Login.vue"
import Register from "../homepage_components/Register.vue"
import Vue from "vue"

Vue.use(VueRouter)
const router = new VueRouter({
    routes : [
        {
            path : "/",
            component : Home
        },
        {
            path : "/login",
            component : Login
        }, 
        {
            path : "/register",
            component : Register
        }
    ]
})

export default router