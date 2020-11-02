<template>
  <div class="container">
    <div class="row">
      <div class="col-md-12">
           <div class="col-md-8">
          <header class="mb-3">
            <h1>Sign in</h1>
          </header>
           </div>
          <div class="col-md-8">
          <rbc-card>
            <ul class="list-highlight">
              <li class="my-2">
                <rbc-input 
                	label="Username" 
                	placeholder="username"
                    v-model="username"
                ></rbc-input>
              </li>
              <li class="my-2">
                <rbc-input 
                	label="Password" 
                	placeholder="password"
                ></rbc-input>
              </li>
            </ul>
            <div slot="footer">
                <router-link :to="{ name: 'Dashboard', params: { username: username } }">
                    <rbc-button 
                        color="primary"
                        class="mr-1"
                    >
                    	Sign in
                    </rbc-button>
                </router-link>
              Forgot your password? 
              <rbc-button 
                color="primary"
                outline
                class="ml-1"
                >
              Sucks
              </rbc-button>
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
  name: "SignIn",
  components: {
    "rbc-card": Card,
    "rbc-input": Input,
    "rbc-button": Button
  },
  data() {
      return {
          username: ''
      }
  }
};
</script>

<style scoped>
h1{
  font-size: 3.074rem;
}
h3 {
  font-size: 2.074rem;
}
</style>