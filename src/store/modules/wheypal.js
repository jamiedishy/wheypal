import axios from "axios";

const state = {
  userRecommendations: null,
  userPreferences: null, // expect an object with various preferences (ie location, activity, etc.) to be displayed on profile page
  userProfileImage: null,
  userName: null,
  userEmail: null,
  userPassword: null,
  userId: null,
  userToken: null,
  userExpiry: null,
  userBirthday: null,
  userInterest: null,
  userLocation: null,
  userRecommendationsCount: 0,
  userSwipedList: []
};

const getters = {};

var domain;

if (process.env.NODE_ENV === 'development') {
  domain = 'http://localhost:8081';
} else {
  domain = 'http://api.wheypal.com';
}

const actions = {
  async createUser({ commit }, body) {
    console.log("Creating user");
    const url = domain + "/user";
    const response = await axios.post(url, body);
    const payload = response.data;
    payload["body"] = body;
    commit("CREATE_USER", payload);
  },
  async setRecommendations({ commit }, payload) {
    commit("SET_RECOMMENDATIONS", payload);
  },
  // updateRecommendationCount({ commit }) {
  //   commit("UPDATE_RECOMMENDATION_COUNT");
  // },
  removeRecommendation({ commit }, payload) { // new recs without the disliked profile
    commit("REMOVE_RECOMMENDATION", payload)
  },
  async loginUser({ commit }, body) {
    console.log("Login user");
    const url = domain + "/login";
    const response = await axios.post(url, body);
    const payload = response.data;
    payload["body"] = body;
    commit("LOGIN_USER", payload);
  },
  async logOffUser({ commit }) {
    console.log("Sign out user");
    commit("LOGOFF_USER");
  },
  async updateLogin({ commit }, body) {
    const data = { "password": `${body.userPassword}`, "userID": body.userID, "email": `${body.userEmail}` };
    const url = domain + "/login";
    const config = {
      method: 'put',
      headers: { 
        'Authorization': `Bearer ${body.userToken}`
      },
      data : data
    };
    await axios(url, config); // boolean
    // const response = await axios(url, config); // boolean
    // const payload = response.data;
    // payload["body"] = body;
    commit("UPDATE_LOGIN", body);
  },
};

const mutations = {
  CREATE_USER: (state, payload) => {
    state.userId = payload.id;
    state.userEmail = payload.email;
    state.userToken = payload.token;
    state.userExpiry = payload.expiry;
    state.userName = payload.body.name;
    state.userEmail = payload.body.email;
    state.userPassword = payload.body.password;
    state.userInterest = payload.body.interest;
    state.userLocation = payload.body.location;
    state.userBirthday = payload.body.birthday;
  },
  SET_RECOMMENDATIONS: (state, payload) => {
    state.userRecommendations = JSON.parse(payload);
    state.userRecommendationsCount = state.userRecommendations.length;
    if (state.userRecommendationsCount === undefined) {
      state.userRecommendations = [];
      state.userRecommendationsCount = 0;
    }
  },
  // UPDATE_RECOMMENDATION_COUNT: (state) => {
  //   state.userRecommendationsCount = state.userRecommendationsCount - 1;
  // },
  REMOVE_RECOMMENDATION: (state, payload) => { // payload is the index
    state.userRecommendations = state.userRecommendations.filter(el => el.userID !== payload);
    state.userRecommendationsCount = state.userRecommendationsCount - 1;
  },
  LOGIN_USER: (state, payload) => {
    state.userToken = payload.token;
    state.userExpiry = payload.expiry;
    state.userId = payload.id;
    state.userEmail = payload.body.email;
    state.userPassword = payload.body.password;
    state.userLocation = payload.location;
    state.userBirthday = payload.birthday;
    state.userInterest = payload.interest;
    state.userName = payload.name;
  },
  LOGOFF_USER: state => {
    Object.keys(state).forEach(el => {
      if (el === "userSwipedList") {
        state[el] = []
      } else {
        state[el] = null;
      }
    })
  },
  UPDATE_LOGIN: (state, payload) => {
    state.userPassword = payload.password;
    state.userEmail = payload.email
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
