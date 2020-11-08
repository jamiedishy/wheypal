<template>
  <div class="container">
    <div class="row">
      <div class="col-md-12 centre">
        <header>
          <img class="mb-1" src="../assets/logo.png" />
          <h1>WheyPal</h1>
        </header>
        <!-- <img class="col-md-7" src="../assets/cyclists.png" /> -->

        <div class="my-5">
          <h2>
            WheyPal is a community-based platform that drives motivation through
            companionship by connecting users based on similar exercise
            routines, fitness goals, locations and user preferences.
          </h2>
        </div>
        <div>
          <router-link to="/signup">
            <custom-button class="mr-1" color="primary" outline>
              Sign up
            </custom-button>
          </router-link>
          <router-link to="/signin">
            <custom-button color="primary" outline>
              Sign in
            </custom-button>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { Button } from "rbc-wm-framework-vuejs/dist/wm/components";
import { mapActions } from "vuex";
export default {
  name: "Dashboard",
  components: {
    "custom-button": Button
  },
  data() {
    return {};
  },
  methods: {
    ...mapActions(["logoffUser"]),
    mounted() {
      this.logoffUser(); // clear all states
    }
  }
};
</script>

<style scoped>
h1 {
  font-size: 4rem;
}
.centre {
  text-align: center;
}
</style>
