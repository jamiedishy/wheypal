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
                    <template v-if="!userSwipedList.includes(recommendation.userID)">
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
                    </template>
                    <template v-else>
                      <custom-button
                        class="mr-2"
                        icon="thumbs-up"
                        outline
                        :disabled="true"
                      >
                      </custom-button>
                      <custom-button
                        class="mr-2"
                        icon="thumbs-down"
                        outline
                        :disabled="true"
                      >
                      </custom-button>
                    </template>
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
    ...mapActions(["setRecommendations", "updateRecommendationCount"]),
    async swipe(userid2, responseint) {
      // if (!this.userSwipedList.includes(userid2)) {
        const body = {
          UserID1: this.userID,
          UserID2: userid2,
          RecommendationResponse: responseint
        }
          await this.connection.send(JSON.stringify(body));
          this.userSwipedList.push(userid2);
          this.updateRecommendationCount();
      // } else {
      //     this.error = "Already swiped on this user. Cannot re-swipe.";
      //     this.modalIsOpen = !this.modalIsOpen;
      // }
    }
  },
  mounted() {
        var domain;
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
        this.setRecommendations(data)
        console.log('Grabbing new data from the backend either on initial load or when getting more swipe candidates if the original amount were all swiped on. The count is ',this.userRecommendationsCount)
        if (this.userRecommendationsCount === "No swipe candidates") {
          console.log("Backend did not send any more swipe candidates so the new list or recommendations is null and the count is undefined.")
          this.error = "No more possible swipes";
          this.modalIsOpen = !this.modalIsOpen;
        }
      } 
      else {
        console.log("Not grabbing new data from the backend. The backend is just returning a 1 or 2. If 1, modal success popup")
        console.log("The count of possible remaining swipes are ", this.userRecommendationsCount)
        if (data === 1) {
          this.error = "Congratulation! You've just matched with a new workout buddy!";
          this.modalIsOpen = !this.modalIsOpen;
        } else { console.log("Data is 2. No match.")}
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
