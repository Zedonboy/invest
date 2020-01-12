<template>
  <section class="flex column vertical-center">
    <Navbar />
    <div class="container flex column vertical-center">
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
          <input
            autofocus
            v-model="email"
            required
            class="input full-width bg-color-transparent color-ededed"
            placeholder="Email"
            type="email"
          />
          <input
            v-model="password"
            required
            class="input full-width bg-color-transparent color-ededed"
            placeholder="Password"
            type="password"
          />
          <button type="submit" class="btn margin-10">Login</button>
        </form>
      </div>
    </div>
  </section>
</template>
<script>
import Navbar from "./Nav.vue";
import InvestAPI from "../utils/Api";
import MH from "../dashboard_components/MessageHandler";
export default {
  mixins: [MH],
  data() {
    return {
      email: "",
      password: ""
    };
  },

  methods: {
    submitForm() {
      InvestAPI.login(this.email, this.password)
        .then(resp => {
          if(resp.status == 200){
            window.location.href = resp.data._redirectUrl
            return
          }
          this.successMssg = resp.statusText;

        })
        .catch(err => {
          if (err.response) {
            this.errorMssg = err.response.statusText;
          } else {
            this.errorMssg = err.message;
          }
        });
    }
  },

  watch: {
    email(newV, oldV) {
      this.clearMessages();
    },

    password(newV, oldV) {
      this.clearMessages();
    }
  },
  components: { Navbar }
};
</script>

<style>
@media screen and (min-width: 978px) {
  .panel {
    max-width: 45%;
    min-width: 45%;
    height: 330px;
  }
}

@media screen and (max-width: 900px) {
  .panel {
    width: 85%;
    height: 70%;
  }
}

.panel {
  border-radius: 10px;
  border: thin solid #ededed;
}

.full-width {
  width: 80%;
}
.space-around {
  justify-content: space-around;
}
.input {
  border-style: none;
  border-bottom-style: solid;
  border-bottom-width: medium;
  padding: 15px;
  font-family: inherit;
  font-size: 20px;
}

.bg-color-transparent {
  background-color: transparent;
}
.color-ededed {
  color: #ededed;
}

:focus {
  border-color: #a2b70d;
}
.container {
  width: 100%;
  height: 100%;
}
.horizontal-center {
  justify-content: center;
}
.vertical-center {
  align-items: center;
}
.column {
  flex-direction: column;
}
.flex {
  display: flex;
}

.margin-10 {
  margin: 10px;
}

html,
body {
  width: 100%;
  height: 100%;
}
</style>
