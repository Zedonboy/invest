<script>
export default {
  data() {
    return {
      successMssg: "",
      errorMssg: ""
    };
  },

  methods : {
    clearMessages () {
      this.successMssg = ""
      this.errorMssg = ""
    }
  },

  computed : {
    success () {
      let ans = this.successMssg.length > 0 ? true : false
      return ans
    },

    error () {
      let ans = this.errorMssg.length > 0 ? true :false
      return ans
    }
  },
};
</script>
