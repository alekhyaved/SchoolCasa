import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableHighlight,
  Keyboard,
  Switch,
  CheckBox,
  Button,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import axios from "axios";

class AddApartmentListing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address: "",
      rent: "",
      description: "",
      isParkingAvailable: false,
      isEnabled: false,
      bedrooms: "1",
      date: new Date(),
      bathrooms: "1",
    };
    this.handleAddressChange = this.handleAddressChange.bind(this);
    this.handleRentChange = this.handleRentChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
  }

  handleAddressChange(address) {
    this.setState({ address });
  }

  handleRentChange(text) {
    this.setState({ rent: text });
  }

  handleDescriptionChange(text) {
    this.setState({ description: text });
  }

  onPress = async (event) => {
    //event.preventDefault();
    if (this.state.address.trim() === "") {
      alert("Please enter address");
      return;
    }
    if (this.state.rent.trim() === "") {
      alert("Please enter rent");
      return;
    }
    if (this.state.description.trim() === "") {
      alert("Please enter description");
      return;
    }
    
    let formData = new FormData();
    formData.append("description", this.state.description);
    formData.append("address", this.state.address);
    formData.append("rent", this.state.rent);
    formData.append("bedrooms", this.state.bedrooms);
    formData.append("bathrooms", this.state.bathrooms);
    let parking = 0;
    if (this.state.isParkingAvailable === true) {
      parking = 1;
    }
    formData.append("isParkingAvailable", parking);
    axios
      .post("http://192.168.0.7:8080" + "/postAptLisiting/", formData)
      .then(function (response) {
        return response;
      })
      .then((data) => {
        // alert(data);
        this.props.navigation.push('Rental listings')
      })
      .catch(function (error) {
        // console.log("Error " + JSON.stringify(error));
      });
  };

  toggleSwitch = () => {
    this.state.isEnabled = !this.state.isEnabled;
    alert(this.state.isEnabled);
  };

  showDatePicker = () => {
    // console.log("inside showDatePicker mtd");
    // return (
    //   <DateTimePicker
    //     value={this.state.date}
    //     mode="default"
    //     display="default"
    //     onChange={(date) => this.setState({ date })}
    //   />
    // );
  };

  render() {
    const { date } = this.state;
    return (
      <View style={styles.container}>
        {/* <View>
          <Text style={styles.header}>Add Apartment Listing</Text>
        </View> */}
        <ScrollView>
          <View style={styles.inputContainer}>
            <Text style={styles.textLabel}>Address</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Enter address"
              onBlur={Keyboard.dismiss}
              multiline={true}
              numberOfLines={3}
              value={this.state.address}
              onChangeText={this.handleAddressChange}
            />
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.textLabel}>Beds</Text>
              <Picker
                selectedValue={this.state.bedrooms}
                style={{ height: 50, width: 90, fontSize: 100, marginLeft: 40 }}
                onValueChange={(itemValue, itemIndex) =>
                  this.setState({ bedrooms: itemValue })
                }
              >
                <Picker.Item label="1" value="1" fontSize="100" />
                <Picker.Item label="2" value="2" />
                <Picker.Item label="3" value="3" />
                <Picker.Item label="4" value="4" />
              </Picker>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.textLabel}>Baths</Text>
              <Picker
                selectedValue={this.state.bathrooms}
                style={{ height: 50, width: 90, fontSize: 100, marginLeft: 35 }}
                onValueChange={(itemValue, itemIndex) =>
                  this.setState({ bathrooms: itemValue })
                }
              >
                <Picker.Item label="1" value="1" />
                <Picker.Item label="1.5" value="1.5" />
                <Picker.Item label="2" value="2" />
                <Picker.Item label="2.5" value="2.5" />
                <Picker.Item label="3" value="3" />
                <Picker.Item label="3.5" value="3.5" />
                <Picker.Item label="4" value="4" />
                <Picker.Item label="4.5" value="4.5" />
              </Picker>
            </View>
            <View style={{ flexDirection: "row" }}>
              <CheckBox
                style={{ marginLeft: 5, marginTop: 10 }}
                value={this.state.isParkingAvailable}
                onValueChange={() =>
                  this.setState({
                    isParkingAvailable: !this.state.isParkingAvailable,
                  })
                }
              />
              <Text style={styles.textLabel}>Parking Available</Text>
            </View>
            <Text style={styles.textLabel}>Rent Price</Text>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.textLabel}>$</Text>
              <TextInput
                style={styles.textBoxInput}
                placeholder="Enter rent"
                maxLength={10}
                onBlur={Keyboard.dismiss}
                value={this.state.rent}
                onChangeText={this.handleRentChange}
              />
              <Text style={styles.textLabel}>/month</Text>
            </View>
            <Text style={styles.textLabel}>Description</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Enter description"
              onBlur={Keyboard.dismiss}
              multiline={true}
              numberOfLines={3}
              value={this.state.description}
              onChangeText={this.handleDescriptionChange}
            />
          </View>
          {/* <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={this.state.isEnabled ? "#f5dd4b" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={this.toggleSwitch}
            value={this.state.isEnabled}
          /> */}
          {/* <DateTimePicker
            value={date}
            mode="default"
            display="default"
            onChange={(date) => this.setState({ date })}
          /> */}
          
          {/* <View>
            <Button
              onPress={() => alert("button onPress")}
              title="Show date picker!"
            />
          </View> */}
          <View style={styles.buttonStyle}>
            <Button style={{backgroundColor :"#FFFFFF" }}
              onPress={this.onPress}
              title="Submit"
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 5,
    backgroundColor: "#F5FCFF",
  },
  header: {
    fontSize: 25,
    textAlign: "center",
    margin: 10,
    fontWeight: "bold",
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
  textBoxInput: {
    borderColor: "#CCCCCC",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    height: 50,
    fontSize: 20,
    paddingLeft: 10,
    paddingRight: 10,
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 5,
  },
  textLabel: {
    fontSize: 20,
    paddingBottom: 10,
    paddingLeft: 10,
    paddingTop: 10,
  },
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10,
    width: "70%",
    marginLeft: "15%",
    marginTop: 10,
  },
  buttonStyle : {
    width: "60%",
    marginLeft: "20%",
    marginTop: 10,
    // height : 50,
    // borderColor: "#f4511e",
    // backgroundColor:"#FFFFFF",
    // borderWidth:2,

  },
});

export default AddApartmentListing;
