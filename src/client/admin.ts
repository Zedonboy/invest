import Vue from "vue"
//@ts-ignore
import App from "./admin_components/App.vue"
import InvestAPI from "./utils/Api";
function getMeta(metaName) {
    const metas = document.getElementsByTagName('meta');
  
    for (let i = 0; i < metas.length; i++) {
      if (metas[i].getAttribute('name') === metaName) {
        return metas[i].getAttribute('content');
      }
    }
  
    return '';
  }
new Vue({
    el : "#root",
    render : h => h(App),
    mounted () {
      this.$router.push("/home")
      InvestAPI.init(getMeta("csrf_token"))
    }
})