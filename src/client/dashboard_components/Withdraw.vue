<template>
    <div class="content flex column horizontal-center vertical-center">
      <div v-if="error" class="alert alert-danger" role="alert" v-html="errorMssg"></div>
    <div v-if="success" class="alert alert-success" role="alert" v-html="successMssg"></div>
    <div class="panel">
        <form
          @submit.prevent="submitForm"
          class="container flex column space-around vertical-center"
        >
          <input
            autofocus
            v-model="walletId"
            required
            class="input full-width"
            placeholder="Wallet Address"
            type="text"
          />
          <input
            v-model="amount"
            required
            min="0"
            class="input full-width"
            placeholder="Amount"
            type="number"
          />
          <button type="submit" class="btn margin-10">Withdraw</button>
        </form>
      </div>
    </div>
</template>
<script>
import InvestAPI from '../utils/Api';
import MH from "./MessageHandler"
export default {
  mixins : [MH],
  data () {
    return {
      walletId : "",
      amount : 0
    }
  },

  methods : {
    submitForm () {
      if(this.amount > 0) InvestAPI.withdraw(this.walletId, this.amount).then(resp => {
        if(resp.status == 200){
          this.successMssg = resp.statusText
        } else if(resp.status >= 400) {
          this.errorMssg = resp.statusText
        }
      }).catch(err => {
        
        this.errorMssg = "Something is not right, try again"
      })
    },

    
  },

  watch : {
    walletId (old, newV) {
      this.clearMessages()
    },

    amount (old, newV) {
      this.clearMessages()
    }
  }

}
</script>
