import { RestBaseModel } from "rest-in-model";

class Auth extends RestBaseModel {
  getConfig() {
    return {
      // you can add additional headers
      headers: {
        Authorization: localStorage.getItem("token")
          ? "Token " + localStorage.getItem("token")
          : null
      },
      fields: {
        username: {},
        password: {},
        key: {}
      },

      // Normally you don't need to do this. But sometimes back-end doesn't/can't give what you want...
      // You can get any child from response as result list to convert if you need.
      resultListField: response => response.result,

      paths: {
        default: "rest-auth/login/ ",
        authUser: "rest-auth/user/",
        logout: "rest-auth/logout/ "
      }
      //endpointName: '',
      //apiPathName: '',
    };
  }
}

export default Auth;
