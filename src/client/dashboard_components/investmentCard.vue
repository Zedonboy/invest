<template>
  <div class="card card-body padding">
      <div class="header">
          <h5 class="title">{{ this.plan.title }}</h5>
      </div>
    <div class="content">
      <ul>
        <li>
          {{ this.plan.interest }}% interest after {{ this.plan.duration }}
        </li>
        <li>Minimum: ${{ this.plan.min }}</li>
        <li>Maximum: ${{ this.plan.max }}</li>
      </ul>
      <button :disabled="!userDeposited" class="btn btn-primary"  @click="activatePlan">Activate</button>
    </div>
  </div>
</template>
<script>
export default {
  props: ["plan"],
  methods: {
    activatePlan() {
      this.$emit("activateplan", this.plan.id);
    }
  },

  computed :{
    userDeposited(){
      if(this.$store.state.user.deposited && (this.$store.state.user.deposited > 0)){
        return true
      } else {
        return false
      }
    }
  }
};
</script>
