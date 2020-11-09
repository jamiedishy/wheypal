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
  userLocation: null
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
  async getRecommendations({ commit }, body) {
    console.log("Getting recommendations");
    const url = domain + "/user";
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${body.userToken}`
      }
    });
    const payload = response.data.filter(el => el.userID !== body.userID);
    // console.table(payload)
    // console.log("%c%s", "background: dodgerblue; padding: 5px; border-radius: 5x", "stylized log lol")
    commit("GET_RECOMMENDATIONS", payload);
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
  GET_RECOMMENDATIONS: (state, payload) => {
    state.userRecommendations = payload;
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
      state[el] = null;
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
