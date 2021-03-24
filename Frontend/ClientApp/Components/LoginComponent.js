import React from "react";
import { withAuthenticator } from "aws-amplify-react-native";
import { Auth } from "aws-amplify";
import Home from "./Home";
import axios from "axios";

class LoginComponent extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  saveUser() {
    global.email = Auth.user.signInUserSession.idToken.payload.email;
    let formData = new FormData();
    formData.append("email", Auth.user.signInUserSession.idToken.payload.email);
    formData.append(
      "phoneNum",
      Auth.user.signInUserSession.idToken.payload.phone_number
    );
    axios
      .post("http://192.168.1.9:8080" + "/postUser/", formData)
      .then(function(response) {
        return response;
      })
      .catch(function(error) {});
  }
  componentDidMount() {
    this.saveUser();
  }

  render() {
    return <Home navigation={this.props.navigation} />;
  }
}
// const MyTheme = {
//   signInButton: {
// color: "red",
// backgroundColor: "green"
//   }
// };

export default withAuthenticator(LoginComponent, {
  usernameAttributes: "email"
});
