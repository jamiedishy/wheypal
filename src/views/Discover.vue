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
              title="Error"
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
                      Name:
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
                      @click="dislike(recommendation.userID, 1)"
                      outline
                    >
                    </custom-button>
                    <custom-button
                      class="mr-2"
                      icon="thumbs-down"
                      @click="dislike(recommendation.userID, 2)"
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
      recommendations: '',
      message: 'clicked button!',
      connection: null
      // socket: new WebSocket("ws://localhost:8081/recommend")
    };
  },
  computed: {
    ...mapState({
      userRecommendations: state => state.wheypal.userRecommendations,
      userToken: state => state.wheypal.userToken,
      userID: state => state.wheypal.userId
      
    })
  },
  methods: {
    ...mapActions(["getRecommendations", "removeRecommendation"]),
    async dislike(userid2, responseint) {
      const body = {
        UserID1: this.userId,
        UserID2: userid2,
        RecomendationResponse: responseint
      }
      // await this.$socket.emit('removeDislikedRecommendation', body) // server performs logic update
      await this.$socket.send(body)
    },

  },
  // socket:{
  //   onopen () {
  //     console.log('Connected to server')
  //   },
  //   updateRecommendation (data) { // server passes updated recommendations 
  //     this.removeRecommendation(data); // update store with new recommendations
  //   }
  // },
  mounted(){
    this.connection = new WebSocket("ws://localhost:8081/recommend")
    this.connection.onopen = function () {
      this.send(this.$store.userToken);
      console.log("connected with token ", $store.state.userToken)
    }
    this.connection.onmessage = function (e) {
      console.log("on message", e.data)
    };

    // const body = {
    //   userID: this.userID,
    //   userToken: this.userToken
    // };
    // try {
    //   // await this.getRecommendations(body);
    //   // this.$socket.onopen() {
    //   //   console.log("connected")
    //   // }
    //   console.log(body)
    // } catch (e) {
    //   this.error = e;
    //   this.modalIsOpen = !this.modalIsOpen;
    // }
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
