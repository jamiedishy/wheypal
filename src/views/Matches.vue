<template>
  <div>
    <layout
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
            <div class="row mb-4">
            <header class="col-md-4 ml-2 mb-3">
              <h1 style="font-size: 4rem;" class="mt-5">Matches</h1>
            </header>
            <img class="col-md-6" src="../assets/matches.png">
            </div>

             <div class="row">
               <template v-if="userMatches !== null">
              <div
                class="col-md-6"
                v-for="(match, index) in userMatches"
                :key="index"
              >
                <card class="mb-3">
                  <div slot="header">
                    <h3>
                      {{
                        match.name ? match.name : "Undefined"
                      }}
                    </h3>
                  </div>
                  <ul class="list-highlight">
                    <li class="my-2">
                      Interest:
                      {{
                        match.interest
                          ? match.interest
                          : "Undefined"
                      }}
                    </li>
                    <li class="my-2">
                      Location:
                      {{
                        match.location
                          ? match.location
                          : "Undefined"
                      }}
                    </li>
                  </ul>
                  <div slot="footer">
                  </div>
                </card>
              </div>
               </template>
               <template v-else>
                 No matches
               </template>
             </div>
          </div>
        </div>
      </div>
    </layout>
  </div>
</template>

<script>
import { Layout, Card } from "rbc-wm-framework-vuejs/dist/wm/components";
import sideNav from "../../sidenav.JSON";
import { mapState, mapActions } from "vuex";
export default {
  name: "Matches",
  components: {
    "layout": Layout,
    "card": Card
  },
  data() {
    return {
      dynamicComponent: "Discover",
      sideNav: sideNav
    };
  },
  computed: {
    ...mapState({
      userMatches: state => state.wheypal.userMatches,
      userToken: state => state.wheypal.userToken
    })
  },
  methods: {
     ...mapActions(["getMatches"]),
  },
  mounted() { 
    this.getMatches(this.userToken);
  }
};
</script>
<style>
.matches {
  padding-left: 5%;
  padding-top: 0%;
}
</style>
