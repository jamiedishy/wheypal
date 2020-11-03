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
              <h3>Sign in</h3>
            </div>
            <ul class="list-highlight">
              <li class="my-2">
                <rbc-input
                  label="Email"
                  placeholder="Email"
                  v-model="email"
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
                  <rbc-button
                    @click="signInUser()"
                    class="mb-1"
                    color="primary"
                  >
                    Sign in
                  </rbc-button>
                  <br />
                  Forgot your password?

                  <rbc-button class="mt-1" color="primary" outline>
                    Sucks
                  </rbc-button>
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
  name: "SignIn",
  components: {
    "rbc-card": Card,
    "rbc-input": Input,
    "rbc-button": Button,
    "rbc-modal": Modal
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

    async signInUser() {
      this.error = "";
      const body = {
        email: this.email,
        password: this.password
      };
      console.log(body.email);
      console.log(body.password);
      if (body.email === "" || body.password === "") {
        this.error = "Cannot sign in. Please enter all credentials.";
        this.modalIsOpen = !this.modalIsOpen;
      } else {
        try {
          await this.loginUser(body);
          this.$router.push("/discover");
        } catch (e) {
          this.error = e;
          this.modalIsOpen = !this.modalIsOpen;
        }
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
