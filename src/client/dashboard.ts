import Vue from "vue"
//@ts-ignore
import App from "./dashboard_components/App.vue"
import router from "./utils/dashboardRouter"
import InvestAPI from "./utils/Api";
import store from "./utils/store"
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
    store,
    router,
    render : h => h(App),
    mounted () {
      this.$router.push("/home")
      InvestAPI.init(getMeta("csrf_token"))
      InvestAPI.getUser().then(resp => {
        store.commit('updateUser', resp.data.user)
      })
    }
})