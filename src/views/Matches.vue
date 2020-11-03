<template>
  <div>
    <rbc-layout
      top-nav
      logo="https://i.ibb.co/5GFxj30/handcuffs-2.png"
      :router="true"
      :side-nav="sideNav"
      toggle="full"
      class="matches"
    >
      <div class="container" slot="content">
        <div class="row">
          <div class="col-md-12">
            <header class="mb-3">
              <h1>Matches</h1>
              <hr class="mb-2 header-rule" />
            </header>
          </div>
        </div>
      </div>
    </rbc-layout>
  </div>
</template>

<script>
import { Layout } from "rbc-wm-framework-vuejs/dist/wm/components";
export default {
  name: "Matches",
  components: {
    "rbc-layout": Layout
  },
  data() {
    return {
      dynamicComponent: "Discover",
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
  methods: {
    hi() {
      return console.log("hi");
    }
  }
};
</script>
<style>
.matches {
  padding-left: 5%;
  padding-top: 0%;
}
</style>
