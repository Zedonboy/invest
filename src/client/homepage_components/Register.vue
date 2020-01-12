<template>
<section class="flex column vertical-center">
    <Navbar />
    <div class="container flex column vertical-center">
      <div
          v-if="error"
          class="alert alert-danger"
          role="alert"
          v-html="errorMssg"
        ></div>
        <div
          v-if="success"
          class="alert alert-success"
          role="alert"
          v-html="successMssg"
        ></div>
      <div class="panel">
        <form
          @submit.prevent="submitForm"
          class="container flex column space-around vertical-center"
        >
          <input
            autofocus
            v-model="email"
            required
            class="input full-width color-ededed bg-color-transparent"
            placeholder="Email"
            type="email"
          />
          <input
            v-model="password"
            required
            class="input full-width color-ededed bg-color-transparent"
            placeholder="Password"
            type="password"
          />
          <button type="submit" class="btn margin-10">Sign Up</button>
        </form>
      </div>
    </div>
  </section>
</template>
<script>
import Navbar from "./Nav.vue"
import InvestAPI from '../utils/Api';
import MH from "../dashboard_components/MessageHandler"
export default {
  components : {Navbar},
  mixins : [MH],
  data () {
    return {
      email : "",
      password : ""
    }
  },
  methods : {
    submitForm () {
      InvestAPI.register(this.email, this.password).then(resp => {
        if(resp.status == 200){
            window.location.href = resp.data._redirectUrl
            return
          }
          this.successMssg = resp.statusText
      }).catch(err => {
        if(err.response){
          this.errorMssg = err.response.statusText
        } else {
          this.errorMssg = err.message
        }
      })
    }
  },

   watch : {
    email (newV, oldV) {
      this.clearMessages()
    },

    password (newV, oldV) {
      this.clearMessages()
    }
  },
}
</script>
