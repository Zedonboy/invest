<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-8">
          <div class="card">
            <div class="header">
              <h4 class="title">Edit Profile</h4>
            </div>
            <div class="content">
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
              <form>
                <div class="row">
                  <div class="col-md-5">
                    <div class="form-group">
                      <label>Search Here</label>
                      <input
                        type="text"
                        v-model="searchEmail"
                        @keypress.enter="searchUser"
                        class="form-control"
                        placeholder="Search by email"
                      />
                      <button
                        @click="searchUser"
                        class="btn btn-info btn-fill pull-right"
                      >
                        Search
                      </button>
                    </div>
                  </div>
                  <div class="col-md-3">
                    <div class="form-group">
                      <label>Username</label>
                      <input
                        type="text"
                        class="form-control"
                        v-model="user.name"
                        placeholder="Username"
                        value="michael23"
                      />
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="form-group">
                      <label for="exampleInputEmail1">Email address</label>
                      <input
                        type="email"
                        v-model="user.email"
                        class="form-control"
                        placeholder="Email"
                      />
                    </div>
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-6">
                    <div class="form-group">
                      <label>First Name</label>
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Company"
                        value="Mike"
                      />
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                      <label>Last Name</label>
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Last Name"
                        value="Andrew"
                      />
                    </div>
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-12">
                    <div class="form-group">
                      <label>Address</label>
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Home Address"
                        value="Bld Mihail Kogalniceanu, nr. 8 Bl 1, Sc 1, Ap 09"
                      />
                    </div>
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-4">
                    <div class="form-group">
                      <label>Deposited Amount</label>
                      <input
                        type="number"
                        class="form-control"
                        v-model="user.depositedAmt"
                        placeholder="0"
                        value="Mike"
                      />
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="form-group">
                      <label>Activated Account</label>
                      <input type="radio" v-model="user.activated" />
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="form-group">
                      <label>Activated Investment Plan</label>
                      <input
                        type="number"
                        class="form-control"
                        v-model="user.investment"
                      />
                    </div>
                  </div>
                </div>
                <button
                  @click="submitUpdate"
                  class="btn btn-info btn-fill pull-right"
                >
                  Update Profile
                </button>
                <div class="clearfix"></div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import InvestAPI from "../utils/Api";
import MH from "../dashboard_components/MessageHandler";
export default {
  mixins: [MH],
  data() {
    return {
      searchEmail: "",
      user: {}
    };
  },

  methods: {
    searchUser() {
      if (this.searchEmail.length == 0) return;
      InvestAPI.searchUser(this.searchEmail)
        .then(resp => {
          if (resp.status == 200) {
            this.user = resp.data.user;
          } else {
            this.errorMssg = resp.statusText;
          }
        })
        .catch(err => {});
    },

    submitUpdate() {
      this.user.depositedAmt = parseInt(this.user.depositedAmt ? this.user.depositedAmt : "0")
      InvestAPI.updateUser(this.user, this.searchEmail).then(resp => {
        if (resp.status == 200) {
          this.successMssg = resp.statusText;
        } else {
          this.errorMssg = resp.statusText;
        }
      });
    }
  },

  watch: {
    searchEmail(newV, oldV) {
      this.clearMessages();
    }
  }
};
</script>
