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
          <header class="col-md-4">
            <h1 class="mt-5 ml-2">WheyPal</h1>
          </header>
          <img class="col-md-7" src="../assets/cyclists.png" />
        </div>
        <!-- <hr class="bdr-dark-blue mb-5 mt-3"> -->
        <card>
          <div slot="header">
            <h3>Sign up</h3>
          </div>
          <ul class="list-highlight">
            <li class="my-2">
              <custom-input
                v-model="name"
                label="Name"
                placeholder="Name"
              ></custom-input>
            </li>
            <li class="my-2">
              <custom-input
                v-model="email"
                label="Email"
                placeholder="Email"
                type="email"
              ></custom-input>
            </li>
            <li class="my-2">
              <custom-input
                v-model="password"
                label="Password"
                placeholder="Password"
                secure="true"
                type="password"
              ></custom-input>
            </li>
            <li class="my-2">
              <date-picker v-model="birthday" label="Birthday"></date-picker>
            </li>
            <li class="my-2">
              <custom-input
                v-model="interest"
                label="Interest"
                placeholder="Interest"
              ></custom-input>
            </li>
            <li class="my-2">
              <custom-input
                v-model="location"
                label="Location"
                placeholder="Location"
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
                  Sign up
                </custom-button>
                <br />
                Already a member?
                <br />
                <router-link to="/signIn">
                  <custom-button class="mt-1" color="primary" outline>
                    Sign in
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
  Modal,
  DatePicker
} from "rbc-wm-framework-vuejs/dist/wm/components";
import { mapActions, mapState } from "vuex";
export default {
  name: "SignUp",
  components: {
    card: Card,
    "custom-input": Input,
    "custom-button": Button,
    modal: Modal,
    "date-picker": DatePicker
  },
  data() {
    return {
      name: "",
      email: "",
      password: "",
      birthday: "",
      interest: "",
      location: "",
      modalIsOpen: false,
      error: "",
      image: "cyclists.png",
      emailRegex: `/^(([^<>()[]\\.,;:s@"]+(.[^<>()[]\\.,;:s@"]+)*)|(".+"))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z\0-9]+.)+[a-zA-Z]{2,}))$/`
    };
  },
  computed: {
    ...mapState({
      userId: state => state.wheypal.userId
    })
  },
  methods: {
    ...mapActions(["createUser"]),

    checkForm() {
      if (
        this.name === "" ||
        this.password === "" ||
        this.email === "" ||
        this.birthday === "" ||
        this.interest === "" ||
        this.location === ""
      ) {
        this.error = "Field required.";
        this.modalIsOpen = !this.modalIsOpen;
      } else if (!this.validEmail(this.email)) {
        this.error = "Valid email required.";
        this.modalIsOpen = !this.modalIsOpen;
      } else {
        this.signUp();
      }
    },

    validEmail(email) {
      var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    },

    async signUp() {
      this.error = "";
      const body = {
        name: this.name,
        email: this.email,
        password: this.password,
        birthday: `${this.birthday}`,
        location: this.location,
        interest: this.interest
      };
      try {
        await this.createUser(body);
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
  font-size: 4rem;
}
h3 {
  font-size: 2.074rem;
}
.header {
  position: relative;
  text-align: center;
}
</style>
