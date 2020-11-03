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
              <h1>Messages</h1>
              <hr class="mb-2 header-rule" />
            </header>
            <table
              class="my-3 table table-striped table-compact table-hover table-primary"
            >
              <thead>
                <tr>
                  <th>Level</th>
                  <th>Sus7</th>
                  <th>Key</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <rbc-button size="small" outline>
                      xx
                    </rbc-button>
                  </td>
                  <td>xx</td>
                  <td>xx</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </rbc-layout>
  </div>
</template>

<script>
import { Layout } from "rbc-wm-framework-vuejs/dist/wm/components";
export default {
  name: "Messages",
  components: {
    "rbc-layout": Layout
  },
  data() {
    return {
      dynamicComponent: "Discover",
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
  },
  methods: {
    hi() {
      return console.log("hi");
    }
  }
};
</script>
<style></style>
