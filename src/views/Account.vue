<template>
  <div>
    <layout
      top-nav
      logo="https://i.ibb.co/5GFxj30/handcuffs-2.png"
      :router="true"
      :side-nav="sideNav"
      toggle="full"
      class="profile"
    >
      <div class="container" slot="content">
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
              <header class="col-md-3 ml-3">
                <h1 style="font-size: 4rem;" class="mt-5">Profile</h1>
              </header>
              <img class="col-md-8" src="../assets/profile.png" />
            </div>
            <card>
              <div slot="header">
                <h3>Update login credentials</h3>
              </div>
              <ul class="list-highlight">
                <li class="my-2">
                  <custom-input
                    v-model="currEmail"
                    label="Current email"
                    placeholder="Current email"
                  ></custom-input>
                </li>
                <li class="my-2">
                  <custom-input
                    v-model="currPassword"
                    label="Current password"
                    placeholder="Current password"
                  ></custom-input>
                </li>
                <li class="my-2">
                  <custom-input
                    v-model="newEmail"
                    label="New email"
                    placeholder="New email"
                    type="email"
                  ></custom-input>
                </li>
                <li class="my-2">
                  <custom-input
                    v-model="newPassword"
                    label="New password"
                    placeholder="New password"
                  ></custom-input>
                </li>
              </ul>
              <div slot="footer">
                <custom-button @click="verifyCreds()" color="primary">
                  Confirm
                </custom-button>
              </div>
            </card>
          </div>
        </div>
      </div>
    </layout>
  </div>
</template>

<script>
import {
  Layout,
  Card,
  Button,
  Input,
  Modal
} from "rbc-wm-framework-vuejs/dist/wm/components";
import { mapActions, mapState } from "vuex";
import sideNav from "../../sidenav.JSON";
export default {
  name: "Account",
  components: {
    layout: Layout,
    card: Card,
    "custom-button": Button,
    "custom-input": Input,
    modal: Modal
  },
  data() {
    return {
      sideNav: sideNav,
      error: "",
      modalIsOpen: false,
      currEmail: "",
      currPassword: "",
      newPassword: "",
      newEmail: ""
    };
  },
  computed: {
    ...mapState({
      userPassword: state => state.wheypal.userPassword,
      userEmail: state => state.wheypal.userEmail,
      userToken: state => state.wheypal.userToken,
      userID: state => state.wheypal.userId
    })
  },
  methods: {
    ...mapActions(["updateLogin"]),
    verifyCreds() {
      if (this.currEmail === "" || this.currPassword === "") {
        this.error = "Input credentials.";
        this.modalIsOpen = !this.modalIsOpen;
      } else if (
        this.currEmail !== this.userEmail ||
        this.currPassword !== this.userPassword
      ) {
        this.error = "Incorrect credentials.";
        this.modalIsOpen = !this.modalIsOpen;
      } else if (this.newPassword === "" || this.newEmail === "") {
        this.error = "Input new credentials.";
        this.modalIsOpen = !this.modalIsOpen;
      } else if (!this.validEmail(this.newEmail)) {
        this.error = "Valid new email required.";
        this.modalIsOpen = !this.modalIsOpen;
      } else {
        this.updateCreds();
      }
    },
    validEmail(email) {
      var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    },
    async updateCreds() {
      this.editMode = !this.editMode;
      this.error = "";
      const body = {
        userToken: this.userToken,
        userEmail: this.newEmail,
        userPassword: this.newPassword,
        userID: this.userID
      };
      try {
        await this.updateLogin(body);
        this.$router.push("/profile");
      } catch (e) {
        this.error = e;
        this.modalIsOpen = !this.modalIsOpen;
      }
    }
  }
};
</script>
<style>
h1 {
  font-size: 4rem;
}

.profile {
  padding-left: 5%;
  padding-top: 0%;
}
</style>
