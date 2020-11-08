import Vue from "vue";
import VueRouter from "vue-router";
import SignUp from "../views/SignUp.vue";
import Dashboard from "../views/Dashboard.vue"
import SignIn from "../views/SignIn.vue"
import Matches from "../views/Matches.vue"
import Profile from "../views/Profile.vue"
import Discover from "../views/Discover.vue"
import Messages from "../views/Messages.vue"
import Account from "../views/Account.vue"

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Dashboard",
    component: Dashboard
  },
  {
    path: "/signup",
    name: "SignUp",
    component: SignUp
  },
  {
    path: "/signin",
    name: "SignIn",
    component: SignIn
  },
  {
    path: "/dashboard/:username",
    name: "Dashboard",
    component: Dashboard,
    props: true
  },
  {
    path: "/matches",
    name: "Matches",
    component: Matches
  },
  {
    path: "/discover",
    name: "Discover",
    component: Discover
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile
  },
  {
    path: "/account",
    name: "Account",
    component: Account
  },
  {
    path: "/messages",
    name: "Messages",
    component: Messages
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
