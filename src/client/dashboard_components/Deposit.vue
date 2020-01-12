<template>
  <div class="content flex column horizontal-center vertical-center">
    <div v-if="error" class="alert alert-danger" role="alert" v-html="errorMssg"></div>
    <div v-if="success" class="alert alert-success" role="alert" v-html="successMssg"></div>
    <div v-if="showForm" class="panel">
      <form
        @submit.prevent="submitForm"
        class="container flex column space-around vertical-center"
      >
        <input
          v-model="amount"
          required
          min="0"
          class="input full-width"
          placeholder="Amount"
          type="number"
        />
        <button type="submit" class="btn margin-10">Deposit</button>
      </form>
    </div>
  </div>
</template>
<script>
import InvestAPI from "../utils/Api";
import MH from "./MessageHandler"
import { adminWalletAddress } from '../../../config';
export default {

  mixins : [MH],
  data() {
    return {
      showForm : true,
      amount: 0,
     
    };
  },

  
  watch : {
    amount (old, newValue) {
      this.successMssg = ""
      this.errorMssg = ""  
    }
  },

  methods: {
    submitForm() {
      // show mssg to deposit
      if(this.amount > 2000){
        this.showForm = false
      this.successMssg = `Deposit ${this.amount} into <strong>${adminWalletAddress}</strong>`
      } else {
        this.errorMssg = "Minimum Amount to Deposit is <strong>$2000</strong>"
      }
    }
  }
};
</script>
