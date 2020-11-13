<template>
  <div>
    <layout
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
            <modal
              id="basicModal"
              :active="modalIsOpen"
              :show-button="false"
              @toggle="modalIsOpen = false"
            >
              <p>{{ this.error }}</p>
            </modal>

            <div class="row mb-4">
              <header class="col-md-4 mb-3 ml-1">
                <h1 style="font-size: 4rem;" class="mt-5">Discover</h1>
              </header>
              <img class="col-md-6" src="../assets/discover.png" />
            </div>

            <div class="row">
              <div
                class="col-md-6"
                v-for="(recommendation, index) in userRecommendations"
                :key="index"
              >
                <card class="mb-3">
                  <div slot="header">
                    <h3>
                      {{
                        recommendation.name ? recommendation.name : "Undefined"
                      }}
                    </h3>
                  </div>
                  <ul class="list-highlight">
                    <li class="my-2">
                      Interest:
                      {{
                        recommendation.interest
                          ? recommendation.interest
                          : "Undefined"
                      }}
                    </li>
                    <li class="my-2">
                      Location:
                      {{
                        recommendation.location
                          ? recommendation.location
                          : "Undefined"
                      }}
                    </li>
                  </ul>
                  <div slot="footer">
                    <custom-button
                      class="mr-2"
                      icon="thumbs-up"
                      @click="swipe(recommendation.userID, 1)"
                      outline
                    >
                    </custom-button>
                    <custom-button
                      class="mr-2"
                      icon="thumbs-down"
                      @click="swipe(recommendation.userID, 2)"
                      outline
                    >
                    </custom-button>
                  </div>
                </card>
              </div>
            </div>
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
import { mapState, mapActions } from "vuex";
import sideNav from "../../sidenav.JSON";
export default {
  name: "Discover",
  components: {
    layout: Layout,
    card: Card,
    "custom-button": Button,
    modal: Modal
  },
  data() {
    return {
      sideNav: sideNav,
      dynamicComponent: "Discover",
      error: "",
      modalIsOpen: false,
      message: 'clicked button!',
      connection: null
    };
  },
  computed: {
    ...mapState({
      userRecommendations: state => state.wheypal.userRecommendations,
      userToken: state => state.wheypal.userToken,
      userID: state => state.wheypal.userId,
      userRecommendationsCount: state => state.wheypal.userRecommendationsCount,
      userSwipedList: state => state.wheypal.userSwipedList
    })
  },
  methods: {
    ...mapActions(["setRecommendations", "removeRecommendation"]),
    async swipe(userid2, responseint) {
        const body = {
          UserID1: this.userID,
          UserID2: userid2,
          RecommendationResponse: responseint
        }
          await this.connection.send(JSON.stringify(body));
          this.removeRecommendation(userid2); // removes rec from store and updates count
    },
    invokeModal(message) {
      this.error = message;
      this.modalIsOpen = !this.modalIsOpen;
    }
  },
  mounted() {
    let domain;
    if (process.env.NODE_ENV === 'development') {
      domain = 'localhost:8081';
    } else {
      domain = 'api.wheypal.com';
    }

    this.connection = new WebSocket("ws://"+domain+"/recommend")
    // this.connection = this.$socket;
    const token = this.userToken;
    this.connection.onopen = function () {
      console.log('Connecting')
      this.send(token);
    }
    this.connection.onmessage = function (e) {
      updateState(e.data);
    };
    const updateState = (data) => {
      if (this.userRecommendationsCount < 1 || this.userRecommendationsCount === null) {
        this.setRecommendations(data);
        if (this.userRecommendationsCount === 0) {
          this.invokeModal("No more swipes :(");
        }
      } 
      else {
        console.log("data is ", data)
        if (data === "1") {
          this.invokeModal("Congratulation! You've just matched with a new workout buddy!");
        } else if (data == "2") { 
          this.invokeModal("Swiped. No match :(");
        }
      }
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
