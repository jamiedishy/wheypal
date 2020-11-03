<template>
  <div>
    <rbc-layout
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
            <header class="mb-3">
              <h1>Profile</h1>
              <hr class="mb-2 header-rule" />
            </header>
            <rbc-card>
              <div slot="header">
                <h3>User preferences</h3>
              </div>
              <template v-if="editMode">
                <ul class="list-highlight">
                  <li class="my-2">
                    <rbc-input
                      label="Username"
                      placeholder="username"
                      v-model="username"
                    ></rbc-input>
                  </li>
                  <li class="my-2">
                    <rbc-input
                      label="Password"
                      placeholder="password"
                    ></rbc-input>
                  </li>
                </ul>
                <div slot="footer">
                  <rbc-button @click="editMode = !editMode" color="primary">
                    Update
                  </rbc-button>
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
                  <li class="my-2">Id: {{ userId ? userId : "Undefined" }}</li>
                  <li class="my-2">
                    Password: {{ userPassword ? userPassword : "Undefined" }}
                  </li>
                </ul>
                <div slot="footer">
                  <rbc-button @click="editMode = !editMode" color="primary">
                    Edit
                  </rbc-button>
                </div>
              </template>
            </rbc-card>
            <rbc-button @click="signOut()" class="mt-2" color="primary">
              Sign out
            </rbc-button>
          </div>
        </div>
      </div>
    </rbc-layout>
  </div>
</template>

<script>
import {
  Layout,
  Card,
  Button,
  Input
} from "rbc-wm-framework-vuejs/dist/wm/components";
import { mapActions, mapState } from "vuex";
export default {
  name: "Profile",
  components: {
    "rbc-layout": Layout,
    "rbc-card": Card,
    "rbc-button": Button,
    "rbc-input": Input
  },
  data() {
    return {
      editMode: false,
      sideNav: [
        {
          name: "Discover",
          icon: "user-friends",
          displayName: "Discover",
          showInMenu: true,
          meta: {
            order: 0
          }
        },
        {
          name: "Matches",
          icon: "star",
          displayName: "Matches",
          showInMenu: true,
          meta: {
            order: 1
          }
        },
        {
          name: "Messages",
          icon: "envelope-open-text",
          displayName: "Messages",
          showInMenu: true,
          meta: {
            order: 2
          }
        },
        {
          name: "Profile",
          icon: "user",
          displayName: "Profile",
          showInMenu: true,
          meta: {
            order: 3
          }
        }
      ]
    };
  },
  computed: {
    ...mapState({
      userName: state => state.wheypal.userName,
      userId: state => state.wheypal.userId,
      userPassword: state => state.wheypal.userPassword,
      userEmail: state => state.wheypal.userEmail
    })
  },
  methods: {
    ...mapActions(["logOffUser"]),
    async signOut() {
      try {
        await this.logOffUser();
      } catch (e) {
        console.log(e);
      } finally {
        this.$router.push("/");
      }
    }
  }
};
</script>
<style>
.profile {
  padding-left: 5%;
  padding-top: 0%;
}
</style>
