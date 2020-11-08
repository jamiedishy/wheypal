<template>
  <div class="container">
    <div class="row">
      <div class="col-md-12">
        <modal
          id="basicModal"
          :active="modalIsOpen"
          title="Error"
          :show-button="false"
          @toggle="modalIsOpen = false"
        >
          <p>{{ this.error }}</p>
        </modal>
        <div class="row">
          <header class="col-md-4 ml-2">
            <h1 style="font-size: 4rem;" class="mt-5">WheyPal</h1>
          </header>
          <img class="col-md-6" src="../assets/weights.png" />
        </div>
        <!-- <hr class="bdr-dark-blue mb-5 mt-3"> -->
        <card>
          <div slot="header">
            <h3>Sign in</h3>
          </div>
          <ul class="list-highlight">
            <li class="my-2">
              <custom-input
                label="Email"
                placeholder="Email"
                v-model="email"
                type="email"
              ></custom-input>
            </li>
            <li class="my-2">
              <custom-input
                v-model="password"
                label="Password"
                placeholder="Password"
                type="password"
                secure="true"
              ></custom-input>
            </li>
          </ul>
          <div slot="footer">
            <div class="row ml-1">
              <div class="col-md-4">
                <custom-button
                  @click="checkForm()"
                  class="mb-1"
                  color="primary"
                >
                  Sign in
                </custom-button>
                <br />
                Forgot your password?
                <br />
                <router-link to="/">
                  <custom-button class="mt-1" color="primary" outline>
                    Sucks
                  </custom-button>
                </router-link>
              </div>
            </div>
          </div>
        </card>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import {
  Card,
  Input,
  Button,
  Modal
} from "rbc-wm-framework-vuejs/dist/wm/components";
import { mapActions, mapState } from "vuex";
export default {
  name: "SignIn",
  components: {
    card: Card,
    "custom-input": Input,
    "custom-button": Button,
    modal: Modal
  },
  data() {
    return {
      email: "",
      password: "",
      modalIsOpen: false,
      error: ""
    };
  },
  computed: {
    ...mapState({
      userId: state => state.wheypal.userId,
      userToken: state => state.wheypal.userToken
    })
  },
  methods: {
    ...mapActions(["loginUser"]),

    checkForm() {
      if (this.password === "" || this.email === "") {
        this.error = "Field required.";
        this.modalIsOpen = !this.modalIsOpen;
      } else if (!this.validEmail(this.email)) {
        this.error = "Valid email required.";
        this.modalIsOpen = !this.modalIsOpen;
      } else {
        this.signInUser();
      }
    },

    validEmail(email) {
      var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    },

    async signInUser() {
      this.error = "";
      const body = {
        email: this.email,
        password: this.password
      };
      try {
        await this.loginUser(body);
        this.$router.push("/discover");
      } catch (e) {
        this.error = e;
        this.modalIsOpen = !this.modalIsOpen;
      }
    }
  }
};
</script>

<style scoped>
h1 {
  font-size: 3.074rem;
}
h3 {
  font-size: 2.074rem;
}
</style>
