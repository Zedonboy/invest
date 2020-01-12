<template>
  <div class="content">
    <div class="container-fluid flex column">
      <div class="row">
        <div :key="plan.id" v-for="plan in subplans" class="col-md-4">
          <InvestCard v-on:activateplan="submitForm" :plan="plan" />
        </div>
      </div>
      <div class="row">
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
          <input class="input" v-model="investAmount" type="number" placeholder="Deposit Amount to invest"/>
          <label>Choose your Investment Category</label>
            <select v-model="plan">
              <option value="0">Forex Investment</option>
              <option value="1">Gold Investment</option>
              <option value="2">Cannabis Investment</option>
              <option value="3">Real Estate Investment</option>
              <option value="4">Agriculture Investment</option>
              <option value="5">Oil and Gas Investment</option>
            </select>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import InvestAPI from "../utils/Api";
import MH from "./MessageHandler"
import InvestCard from "./investmentCard"
export default {
  mixins : [MH],
  components : {InvestCard},
  data() {
    let arr = this.$store.state.plans[0]
    return {
      investAmount : 0,
      subplans : arr.map(v => this.$store.state.mainPlans[v]),
      plan: "0"
    };
  },

  methods: {
    submitForm(id) {
      InvestAPI.activateInvestment(id, this.investAmount)
        .then(resp => {
          if(resp.status == 200){
            this.successMssg = resp.statusText
          } else if(resp.status >= 400){
            this.errorMssg = resp.statusText
          }
        })
        .catch(err => {
          this.errorMssg = "Something's not right. try again"
        });
    },

    test(){}
  },

  watch : {
    plan (newV, old){
      this.clearMessages()
      let arr = this.$store.state.plans[parseInt(newV)]
      this.subplans = arr.map(v => this.$store.state.mainPlans[v])

    }
  },


};
</script>
