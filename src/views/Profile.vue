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
              <ul class="list-highlight">
                <li class="my-2">
                  Name: {{ userName ? userName : "Undefined" }}
                </li>
                <!-- <li class="my-2">
                  Email: {{ userEmail ? userEmail : "Undefined" }}
                </li> -->
                <li class="my-2">Id: {{ userID ? userID : "Undefined" }}</li>
                <!-- <li class="my-2">
                  Password: {{ userPassword ? userPassword : "Undefined" }}
                </li> -->
                <li class="my-2">
                  Birthday: {{ userBirthday ? userBirthday : "Undefined" }}
                </li>
                <li class="my-2">
                  Interest:
                  {{ userInterest ? userInterest : "Undefined" }}
                </li>
                <li class="my-2">
                  Location: {{ userLocation ? userLocation : "Undefined" }}
                </li>
              </ul>
              <div slot="footer">
                <router-link to="/account">
                  <custom-button color="primary">
                    Update login credentials
                  </custom-button>
                </router-link>
              </div>
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
    modal: Modal
  },
  data() {
    return {
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
      userToken: state => state.wheypal.userToken,
      userBirthday: state => state.wheypal.userBirthday,
      userLocation: state => state.wheypal.userLocation,
      userInterest: state => state.wheypal.userInterest
    })
  },
  methods: {
    ...mapActions(["logOffUser"]),
    async signOut() {
      this.error = "";
      try {
        await this.logOffUser();
        this.$router.push("/");
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
