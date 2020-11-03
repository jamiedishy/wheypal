<template>
  <div id="app">
    <!-- <rbc-layout
      top-nav
      logo="https://i.ibb.co/5GFxj30/handcuffs-2.png"
      :router="true"
      :side-nav="sideNav"
      toggle="full"
      class="my-4"
    > -->
    <rbc-layout
      top-nav
      logo="https://i.ibb.co/5GFxj30/handcuffs-2.png"
      class="my-4"
    >
      <div class="container" slot="content">
        <div class="row">
          <div class="col-md-12">
            <transition name="fade" mode="out-in">
              <router-view />
            </transition>
          </div>
        </div>
      </div>
    </rbc-layout>
  </div>
</template>

<script>
import "rbc-wm-framework-vuejs/dist/wm/vendors/";
import "rbc-wm-framework-vuejs/dist/wm/";
import "rbc-wm-framework-vuejs/dist/wm/style-fa.css";
import "rbc-wm-framework-vuejs/dist/wm/components/style-fa.css";
import "rbc-wm-framework-vuejs/dist/wm/components/Core/style-fa.css";
import { Layout } from "rbc-wm-framework-vuejs/dist/wm/components";
export default {
  name: "App",
  components: {
    "rbc-layout": Layout
  },
  data() {
    return {
      sideNav: [
        {
          name: "Home",
          // icon: "arrow-alt-right",
          displayName: "Home",
          showInMenu: true,
          meta: {
            order: 0
          }
        },
        {
          name: "Twinkle",
          // icon: "arrow-alt-right",
          displayName: "Twinkle",
          showInMenu: true,
          meta: {
            order: 1
          }
        },
        {
          name: "Sus7",
          // icon: "arrow-alt-right",
          displayName: "Sus7",
          showInMenu: true,
          meta: {
            order: 2
          }
        }
        // {
        //   children: [
        //     {
        //       component: SiteReading,
        //       displayName: "Twinkle",
        //       name: "Twinkle",
        //       path: `/sitereading/:Twinkle`,
        //       showInMenu: true
        //     }
        //   ]
        // }
      ]
    };
  }
};
</script>
<style>
@import url("https://fonts.googleapis.com/css?family=Fira+Sans:300,400,400i,500,700|Roboto:300,400,400i,500,700");
@import url("https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap-grid.min.css");
@import "./style.css";

.fade-enter {
  opacity: 0;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease-out;
}
.fade-leave-to {
  opacity: 0;
}
.header-rule {
  width: 3.4375rem;
  border: 0;
  border-top: 4px solid #fedf01;
  margin: 2rem 0;
}
h1 {
  font-size: 3.074rem;
}
</style>
