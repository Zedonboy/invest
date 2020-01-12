<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-3">
          <div class="card">
            <div class="header">
              <h4 class="title">
                ${{ this.user ? this.user.depositedAmt : "0" }}
              </h4>
              <p class="category">Deposited Amount</p>
            </div>
          </div>
        </div>

        <div class="col-md-3">
          <div class="card">
            <div class="header">
              <h4 class="title">0</h4>
              <p class="category">Referals</p>
            </div>       
          </div>
        </div>

        <div class="col-md-3">
          <div class="card">
            <div class="header">
              <h4 class="title">
                {{newAmount}}
              </h4>
              <p class="category">Invested Amount</p>
            </div>
          </div>
        </div>

        <div class="col-md-3">
          <div class="card">
            <div class="header">
              <h4 class="title">${{newAmount + (this.user ? this.user.depositedAmt : 0)}}</h4>
              <p class="category">Total Revenue</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      user: this.$store.state.user
    };
  },

  computed : {
    newAmount (){
      if(!this.user && !this.user.investAmt) return 0
      let investmnt = this.user.investAmt
      let planId = this.user.investMent
      let plan = this.$store.state.mainPlans[planId]
      let roi = plan.interest / 100
      let today = new Date()
      let invested = new Date(this.user.timeOfInvest)
      let milisecs = today - invested
      let daysElapse = Math.floor(milisecs / 86400000 * parseInt(plan.duration))
      if(daysElapse >= parseInt(plan.duration)){
        let multiples = Math.floor(daysElapse / parseInt(plan.duration))
        return investmnt + investmnt * roi * multiples
      } else return investmnt
    }
  }
};
</script>
