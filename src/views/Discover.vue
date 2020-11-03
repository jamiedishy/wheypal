<template>
  <div>
    <rbc-layout
      top-nav
      logo="https://i.ibb.co/5GFxj30/handcuffs-2.png"
      :router="true"
      :side-nav="sideNav"
      toggle="full"
      class="discover"
    >
      <div class="container" slot="content">
        <div class="row">
          <div class="col-md-12">
            <rbc-modal
              id="basicModal"
              :active="modalIsOpen"
              title="Error"
              :show-button="false"
              @toggle="modalIsOpen = false"
            >
              <p>{{ this.error }}</p>
            </rbc-modal>
            <header class="mb-3">
              <h1>Discover</h1>
              <hr class="mb-2 header-rule" />
            </header>

            <div class="row">
              <div
                class="col-md-6"
                v-for="(recommendation, index) in userRecommendations"
                :key="index"
              >
                <rbc-card class="mb-3">
                  <div slot="header">
                    <h3>
                      Name:
                      {{
                        recommendation.name ? recommendation.name : "Undefined"
                      }}
                    </h3>
                  </div>
                  <ul class="list-highlight">
                    <li class="my-2">
                      Email:
                      {{
                        recommendation.email
                          ? recommendation.email
                          : "Undefined"
                      }}
                    </li>
                  </ul>
                  <div slot="footer">
                    <rbc-button
                      class="mr-2"
                      icon="thumbs-up"
                      @click="swipeRight()"
                      outline
                    >
                    </rbc-button>
                    <rbc-button
                      class="mr-2"
                      icon="thumbs-down"
                      @click="swipeLeft()"
                      outline
                    >
                    </rbc-button>
                  </div>
                </rbc-card>
              </div>
            </div>
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
  Modal
} from "rbc-wm-framework-vuejs/dist/wm/components";
import { mapActions, mapState } from "vuex";
import json from "../../sample.JSON";
export default {
  name: "Discover",
  components: {
    "rbc-layout": Layout,
    "rbc-card": Card,
    // "rbc-icon": Icon,
    "rbc-button": Button,
    "rbc-modal": Modal
  },
  data() {
    return {
      json: json,
      dynamicComponent: "Discover",
      error: "",
      modalIsOpen: false,
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
      userRecommendations: state => state.wheypal.userRecommendations
    })
  },
  methods: {
    ...mapActions(["getRecommendations"])
  },
  async mounted() {
    this.error = "";
    try {
      await this.getRecommendations();
    } catch (e) {
      this.error = e;
      this.modalIsOpen = !this.modalIsOpen;
    }
  }
};
</script>
<style>
h1 {
  font-size: 3.074rem;
}
.discover {
  padding-left: 5%;
  padding-top: 0%;
}
</style>
