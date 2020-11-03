<template>
  <div>
    <rbc-layout
      top-nav
      logo="https://i.ibb.co/5GFxj30/handcuffs-2.png"
      :router="true"
      :side-nav="sideNav"
      toggle="full"
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
                    hi
                  </li>
                  <li class="my-2">
                    hi
                  </li>
                </ul>
                <div slot="footer">
                  <rbc-button @click="editMode = !editMode" color="primary">
                    Edit
                  </rbc-button>
                </div>
              </template>
            </rbc-card>
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
          // icon: "arrow-alt-right",
          displayName: "Discover",
          showInMenu: true,
          meta: {
            order: 0
          }
        },
        {
          name: "Matches",
          // icon: "arrow-alt-right",
          displayName: "Matches",
          showInMenu: true,
          meta: {
            order: 1
          }
        },
        {
          name: "Messages",
          // icon: "arrow-alt-right",
          displayName: "Messages",
          showInMenu: true,
          meta: {
            order: 2
          }
        },
        {
          name: "Profile",
          // icon: "arrow-alt-right",
          displayName: "Profile",
          showInMenu: true,
          meta: {
            order: 3
          }
        }
      ]
    };
  }
};
</script>
<style></style>
