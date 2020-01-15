<template>
  <div class="wrapper row1">
    <header id="header" class="hoc clear">
      <!-- ################################################################################################ -->
      <div id="logo" class="fl_left">
        <h1><a href="/">Wealth Assests Financing</a></h1>
      </div>
      <nav id="mainav" class="fl_right">
        <ul class="clear">
          <router-link active-class="active" tag="li" to="/" exact
            ><a>Home</a></router-link
          >

          <router-link tag="li" active-class="active" to="/register" exact
            ><a>Sign Up</a></router-link
          >
          <router-link tag="li" active-class="active" to="/login" exact
            ><a>Sign In</a></router-link
          >
        </ul>
        <form action="#">
          <select v-model="url">
            <option value="/">Home</option>
            <option value="/register">Sign Up</option>
            <option value="/login">Sign In </option>
          </select>
        </form>
      </nav>
      <!-- ################################################################################################ -->
    </header>
  </div>
</template>
<script>
export default {
  data () {
    return {
      url : null
    }
  },

  watch : {
    url (n, oldV){
      this.$router.push(n)
    }
  }
}
</script>

