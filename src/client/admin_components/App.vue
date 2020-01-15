<template>
  <div class="wrapper">
      <SideNav/>
      <Main/>
  </div>
</template>
<script>
import Main from "./Home"
import SideNav from "./SideNav"
export default {
    components : {SideNav, Main}
}
</script>

