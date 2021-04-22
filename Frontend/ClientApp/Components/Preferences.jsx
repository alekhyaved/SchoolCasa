import * as React from "react";
import { View, StyleSheet, Image,Text } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Button} from "react-native-paper";
import axios from "axios";
import config from "../config.json"
import LoginComponent from "./LoginComponent";
import Home from "./Home";

export class Preferences extends React.Component {

  constructor() {
    super();
    this.state = {
        foodPref: "Non-Vegetarian",
        studyTime: "Early morning",
        isSmoking: "No",
        isPetFriendly: "Yes",
        email: global.email,
        isPreferencesSaved: false
    };

    this.handleFoodPrefChange = this.handleFoodPrefChange.bind(this);
    this.handleStudyTimeChange = this.handleStudyTimeChange.bind(this);
    this.handleIsSmokingChange = this.handleIsSmokingChange.bind(this);
    this.handleIsPetFriendlyChange = this.handleIsPetFriendlyChange.bind(this);
}

    handleFoodPrefChange = event => {
      this.setState({
      foodPref: event
      });
    };

    handleStudyTimeChange = event => {
      this.setState({
        studyTime: event
      });
    };

    handleIsSmokingChange = event => {
      this.setState({
        isSmoking: event
      });
    };

    handleIsPetFriendlyChange = event => {
      this.setState({
        isPetFriendly: event
      });
    };


    submitPreferences = event => {
      console.log("inside submit preferences");
      let prefObj = {
        foodPref: this.state.foodPref,
        studyTime: this.state.studyTime,
        isSmoking: this.state.isSmoking,
        isPetFriendly: this.state.isPetFriendly,
        email: email
      }

      // var newPreference = new FormData();
      // newPreference.append("foodPref", this.state.foodPref);
      // newPreference.append("studyTime", this.state.studyTime);
      // newPreference.append("isSmoking", this.state.isSmoking);
      // newPreference.append("isPetFriendly", this.state.isPetFriendly);
      // newPreference.append("email",email);
      console.log(prefObj);
      const configure = {
          headers: {
              "content-type": "application/json",
              Accept: "application/json",
          }
      };
      axios
          //  .post("http://192.168.0.2:8080/addPreference", prefObj)
           .post(config.BackendUrl + "/addPreference", prefObj)
          .then(response => {
              console.log("preference : " + JSON.stringify(response));
              alert("Preferences Added Successfully");
              this.setState({
                isPreferencesSaved: true
              })
              // this.props.navigation.navigate('RentalListings')
              // this.props.history.push("/admin/vehicleList");
          })
          .catch(error => {
              console.log("error is ",error);
              alert("Server Error");
          });


      event.preventDefault();
  };

  render() {
    if(!this.state.isPreferencesSaved) {
    return (
        <View  style={styles.container}>
          <View style={styles.inputcontainer}>
          <Text style= {styles.textHeading}>School Casa</Text>
            <Text style= {{    fontSize: 18,fontWeight:"bold",paddingBottom: 10,
            paddingLeft: 10,paddingTop: 10,marginTop:20,
            justifyContent: "center", textAlign:"left"}}
            >Manage your Preferences</Text>
            <Text></Text>
            <View style={{ flexDirection: "row" }}>
            <Text style={styles.textLabel}>Food Preference</Text>
            <Picker
                    selectedValue={this.state.foodPref}
                    style={{height: 50, width: 200, marginLeft: 30}}
                    onValueChange={(itemValue, itemIndex) => this.setState({ foodPref: itemValue })}
                >
                    <Picker.Item label="Non - Vegetarian" value="NonVeg"/>
                    <Picker.Item label="Vegetarian" value="Veg"/>
                </Picker>
                </View>

            <View style={{ flexDirection: "row" }}>
            <Text style={styles.textLabel}>Study Timings</Text>
            <Picker
                    // selectedValue={this.state.studyTime}
                    style={{height: 50, width: 200, marginLeft: 45}}
                    onValueChange={(itemValue, itemIndex) => this.setState({ studyTime: itemValue })}
                >
                    <Picker.Item label="Early morning" value="early"/>
                    <Picker.Item label="Late night" value="late"/>
                </Picker>
                </View>

            <View style={{ flexDirection: "row" }}>
            <Text style={styles.textLabel}>Smoking</Text>
            <Picker
                    selectedValue={this.state.isSmoking}
                    style={{height: 50, width: 200, marginLeft: 89}}
                    onValueChange={(itemValue, itemIndex) => this.setState({ isSmoking: itemValue })}
                >
                    <Picker.Item label="No" value="SmokeNo"/>
                    <Picker.Item label="Yes" value="SmokeYes"/>
                </Picker>
                </View>
                
            
            <View style={{ flexDirection: "row" }}>
            <Text style={styles.textLabel}>Pet friendly</Text>
            <Picker
                    selectedValue={this.state.isPetFriendly}
                    style={{height: 50, width: 200, marginLeft: 66}}
                    onValueChange={(itemValue, itemIndex) => this.setState({ isPetFriendly: itemValue })}
                >
                    <Picker.Item label="Yes" value="petYes"/>
                    <Picker.Item label="No" value="petNo"/>
                </Picker>
                </View>

                <View style={{height: 50, width: "40%", marginLeft: 120, marginTop: 40, borderRadius: 60,justifyContent:"center", }}>
                    <Button mode="contained" color = '#ffdb58'
                        onPress={this.submitPreferences} >Submit</Button>
                </View>
      
          </View>

        </View>
    );
    } else {
      return (<Home navigation={this.props.navigation} />);
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 5,
    backgroundColor: "#F5FCFF",
  },
  center: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center"
  },
  inputContainer: {
    paddingTop: 15,
  },
  textInput: {
    borderColor: "#CCCCCC",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    fontSize: 20,
    paddingLeft: 10,
    paddingRight: 10,
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 5,
  },
  textLabel: {
    fontSize: 18,
    paddingBottom: 10,
    paddingLeft: 10,
    paddingTop: 10,
  },
  textHeading: {
    fontSize: 20,
    fontWeight:"bold",
    paddingBottom: 10,
    paddingLeft: 10,
    paddingTop: 10,
    marginTop:30,
    backgroundColor: "#ffdb58",
    justifyContent: "center",
    width:420,
    height: 50
    // textAlign:"center"

  },
  behind: {
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    left: 100,
    top: 0,
    width: "100%",
    height: "100%"
  }
});
