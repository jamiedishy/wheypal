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
                <h3>User preferences</h3>
              </div>
              <template v-if="editMode">
                <ul class="list-highlight">
                  <li class="my-2">
                    <custom-input
                      label="Name"
                      placeholder="Update name"
                      v-model="updateName"
                    ></custom-input>
                  </li>
                  <li class="my-2">
                    <custom-input
                      label="Email"
                      placeholder="Update email"
                      v-model="updateEmail"
                    ></custom-input>
                  </li>
                </ul>
                <div slot="footer">
                  <custom-button @click="updateCreds()" color="primary">
                    Update
                  </custom-button>
                </div>
              </template>
              <template v-else>
                <ul class="list-highlight">
                  <li class="my-2">
                    Name: {{ userName ? userName : "Undefined" }}
                  </li>
                  <li class="my-2">
                    Email: {{ userEmail ? userEmail : "Undefined" }}
                  </li>
                  <li class="my-2">Id: {{ userID ? userID : "Undefined" }}</li>
                  <li class="my-2">
                    Password: {{ userPassword ? userPassword : "Undefined" }}
                  </li>
                </ul>
                <div slot="footer">
                  <custom-button @click="editMode = !editMode" color="primary">
                    Edit
                  </custom-button>
                </div>
              </template>
            </card>
            <custom-button @click="signOut()" class="mt-2" color="primary">
              Sign out
            </custom-button>
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
  name: "Profile",
  components: {
    layout: Layout,
    card: Card,
    "custom-button": Button,
    "custom-input": Input,
    modal: Modal
  },
  data() {
    return {
      editMode: false,
      sideNav: sideNav,
      error: "",
      modalIsOpen: false,
      updateName: "",
      updateEmail: ""
    };
  },
  computed: {
    ...mapState({
      userName: state => state.wheypal.userName,
      userID: state => state.wheypal.userId,
      userPassword: state => state.wheypal.userPassword,
      userEmail: state => state.wheypal.userEmail,
      userToken: state => state.wheypal.userToken
    })
  },
  methods: {
    ...mapActions(["logOffUser", "updateUser"]),
    async signOut() {
      this.error = "";
      try {
        await this.logOffUser();
        this.$router.push("/");
      } catch (e) {
        this.error = e;
        this.modalIsOpen = !this.modalIsOpen;
      }
    },
    async updateCreds() {
      this.editMode = !this.editMode;
      this.error = "";
      const body = {
        userName: this.updateName,
        userToken: this.userToken,
        userEmail: this.updateEmail,
        userID: this.userID
      };
      try {
        await this.updateUser(body);
      } catch (e) {
        this.error = e;
        this.modalIsOpen = !this.modalIsOpen;
      } finally {
        this.updateName = "";
        this.updateEmail = "";
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
