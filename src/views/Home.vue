<template>
  <div class="container">
    <div class="row">
      <div class="col-md-12">
        <div class="col-md-8">
          <header class="mb-3">
            <h1>WheyPal</h1>
          </header>
        </div>
        <div class="col-md-8">
          <rbc-card>
            <div slot="header">
              <h3 class="custom-size">Sign up</h3>
            </div>

            <ul class="list-highlight">
              <li class="my-2">
                <rbc-input
                  label="Email"
                  placeholder="placeholder@gmail.com"
                ></rbc-input>
              </li>
              <li class="my-2">
                <rbc-input label="Username" placeholder="username"></rbc-input>
              </li>
              <li class="my-2">
                <rbc-input label="Password" placeholder="password"></rbc-input>
              </li>
            </ul>
            <div slot="footer">
              <div class="row ml-1">
                <div class="col-md-4">
                  <rbc-button class="mb-1" color="primary">
                    Sign up
                  </rbc-button>
                  <br />
                  Already a member?
                  <router-link to="/signIn">
                    <rbc-button class="mt-1" color="primary" outline>
                      Sign in
                    </rbc-button>
                  </router-link>
                </div>
              </div>
            </div>
          </rbc-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { Card, Input, Button } from "rbc-wm-framework-vuejs/dist/wm/components";
export default {
  name: "Home",
  components: {
    "rbc-card": Card,
    "rbc-input": Input,
    "rbc-button": Button
  }
};
</script>

<style scoped>
h1 {
  font-size: 3.074rem;
}
h3 {
  font-size: 2.074rem;
}
</style>
