import React,{Component} from "react";
import { withAuthenticator } from "aws-amplify-react-native";
import { Auth } from "aws-amplify";
import Home from "./Home";
import axios from "axios";
import config from "../config.json"
import { View, Text } from "react-native";
import { Preferences } from "./Preferences";

class LoginComponent extends Component {
  constructor(props, context) {
    super(props);
    this.state ={
      isLoading : false,
    }
  }
   // this.checkUser=this.checkUser.bind(this)

checkUser = () => {
  // this.setState({ isLoading: true });   
  axios
    .get(config.BackendUrl + "/getUser?email=" + email)
    .then(function (response){
      console.log("response",response.data)
      if(response.data==false){
        console.log("new user")
        this.setState({ isLoading: true });   
      }
      else{
        // this.setState({ isLoading: false });  
        console.log("Already registered user")
        // navigation.navigate('Preferences')
      }
    })
    .catch(error => {
      alert(error);
      console.log("error observed !" + error);
    });
}


  saveUser() {
    global.email = Auth.user.signInUserSession.idToken.payload.email;
    global.phone_number =
      Auth.user.signInUserSession.idToken.payload.phone_number;
    let formData = new FormData();
    formData.append("email", Auth.user.signInUserSession.idToken.payload.email);
    formData.append(
      "phoneNum",
      Auth.user.signInUserSession.idToken.payload.phone_number
    );
    axios
      .post("http://192.168.0.9:8080" + "/postUser/", formData)
      .then(function(response) {
        return response;
      })
      .catch(function(error) {});
  }
  componentDidMount() {
    global.email = Auth.user.signInUserSession.idToken.payload.email;
    global.phone_number =
      Auth.user.signInUserSession.idToken.payload.phone_number;
    this.checkUser();
    this.saveUser();
  }

  render() {
    if(this.state.isLoading){
      return ( <View><Text>If loading is true Set preferences screen here</Text></View>);
    }
    // return (<View><Text>Hello Home page</Text></View>);
    else{
      return (<Home navigation={this.props.navigation} />);
    };
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


