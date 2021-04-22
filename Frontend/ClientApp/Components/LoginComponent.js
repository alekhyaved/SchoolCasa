import React, { Component } from "react";
import { withAuthenticator } from "aws-amplify-react-native";
import { Auth } from "aws-amplify";
import Home from "./Home";
import axios from "axios";
import config from "../config.json";
// import Preferences from "./Preferences";
import { View, Text } from "react-native";
import { Preferences } from "./Preferences";

class LoginComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false
    };
    this.checkUser = this.checkUser.bind(this);
  }


  checkUser = event => {
    axios
      .get(config.BackendUrl+ "/getUser?email=" + email)
      .then(function(response) {
        console.log("response", response.data);
        if (response.data == false) {
          console.log("response inside false if", response.data);
          event.isLoading = true;

        } else {
          console.log("response inside true if", response.data);
          event.isLoading = false;
          // this.handleIsLoading();
          // this.setState.isLoadingtrue;
          // this.setState({ isLoading:1 });
          console.log("Already registered user");
          // navigation.navigate('Preferences')
        }
      })
      .catch(error => {
        alert(error);
        console.log("error observed !" + error);
      });
  };

  saveUser = () => {
    let formData = new FormData();
    formData.append("email", Auth.user.signInUserSession.idToken.payload.email);
    formData.append(
      "phoneNum",
      Auth.user.signInUserSession.idToken.payload.phone_number
    );
    axios
      .post(config.BackendUrl + "/postUser/", formData)
      .then(function(response) {
        return response;
      })
      .catch(function(error) {});
  };

  componentDidMount = () => {
    global.email = Auth.user.signInUserSession.idToken.payload.email;
    global.phone_number =
      Auth.user.signInUserSession.idToken.payload.phone_number;
    this.checkUser(this.state);
    this.saveUser();
  };

  render() {
    if (this.state.isLoading) {
      return (
        <Preferences navigation={this.props.navigation}/>
      );
    } else {
      return <Home navigation={this.props.navigation} />;
    }
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
