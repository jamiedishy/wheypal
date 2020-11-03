<template>
  <div class="container">
    <div class="row">
      <div class="col-md-12">
        <rbc-modal
          id="basicModal"
          :active="modalIsOpen"
          title="Error"
          :show-button="false"
          @toggle="modalIsOpen = false"
        >
          <p>{{ this.error }}</p>
        </rbc-modal>
        <div class="col-md-8">
          <header class="mb-3">
            <h1>WheyPal</h1>
          </header>
        </div>
        <div class="col-md-8">
          <rbc-card>
            <div slot="header">
              <h3>Sign up</h3>
            </div>
            <ul class="list-highlight">
              <li class="my-2">
                <rbc-input
                  v-model="name"
                  label="Name"
                  placeholder="name"
                ></rbc-input>
              </li>
              <li class="my-2">
                <rbc-input
                  v-model="email"
                  label="Email"
                  placeholder="placeholder@gmail.com"
                ></rbc-input>
              </li>
              <li class="my-2">
                <rbc-input
                  v-model="password"
                  label="Password"
                  placeholder="password"
                ></rbc-input>
              </li>
            </ul>
            <div slot="footer">
              <div class="row ml-1">
                <div class="col-md-4">
                  <rbc-button @click="signUp()" class="mb-1" color="primary">
                    Sign up
                  </rbc-button>
                  <br />
                  Already a member?
                  <router-link to="/signIn">
                    <rbc-button class="mt-1" color="primary" outline>
                      Sign in
                    </rbc-button>
                  </router-link>
                </div>
              </div>
            </div>
          </rbc-card>
        </div>
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
  name: "Home",
  components: {
    "rbc-card": Card,
    "rbc-input": Input,
    "rbc-button": Button,
    "rbc-modal": Modal
  },
  data() {
    return {
      name: "",
      email: "",
      password: "",
      modalIsOpen: false,
      error: ""
    };
  },
  computed: {
    ...mapState({
      userId: state => state.wheypal.userId
    })
  },
  methods: {
    ...mapActions(["createUser", "logoffUser"]),

    async signUp() {
      this.error = "";
      const body = {
        name: this.name,
        email: this.email,
        password: this.password
      };
      if (body.name === "" || body.email === "" || body.password === "") {
        this.error = "Cannot sign up. Please enter all credentials.";
        this.modalIsOpen = !this.modalIsOpen;
      } else {
        try {
          await this.createUser(body);
          this.$router.push("/discover");
        } catch (e) {
          this.error = e;
          this.modalIsOpen = !this.modalIsOpen;
        }
      }
    },
    mounted() {
      this.logoffUser(); // clear all states
    }
  }
};
</script>

<style scoped>
h3 {
  font-size: 2.074rem;
}
</style>
