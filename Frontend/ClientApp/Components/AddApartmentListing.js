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
  Image,
  TouchableOpacity,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import axios from "axios";
import { Button } from "react-native-elements";
import Dates from "react-native-dates";
import moment from "moment";
import * as ImagePicker from "expo-image-picker";

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
      bathrooms: "1",
      date: null,
      filename: null,
      localUri: "",
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
    if (this.state.date === null) {
      alert("Please select date");
      return;
    }

    let formData = new FormData();
    formData.append("description", this.state.description);
    formData.append("address", this.state.address);
    formData.append("rent", this.state.rent);
    formData.append("bedrooms", this.state.bedrooms);
    formData.append("bathrooms", this.state.bathrooms);
    formData.append("availableDate", this.state.date.format("MM/DD/YYYY"));
    let parking = 0;
    if (this.state.isParkingAvailable === true) {
      parking = 1;
    }
    formData.append("isParkingAvailable", parking);
    if (this.state.filename != "") {
      let match = /\.(\w+)$/.exec(this.state.filename);
      let type = match ? `image/${match[1]}` : `image`;
      //console.log(type);
      formData.append("image", {
        uri: this.state.localUri,
        name: this.state.filename,
        type,
      });
    } else {
      formData.append("image", null);
    }
    const config = {
      headers: {
        "content-type": "multipart/form-data",
        Accept: "application/json",
      },
    };
    axios
      .post("http://192.168.0.7:8080" + "/postAptLisiting/", formData, config)
      .then(function (response) {
        return response;
      })
      .then((data) => {
        // alert(data);
        this.props.navigation.push("Rental listings");
      })
      .catch(function (error) {
        // console.log("Error " + JSON.stringify(error));
      });
  };

  toggleSwitch = () => {
    this.state.isEnabled = !this.state.isEnabled;
    alert(this.state.isEnabled);
  };

  render() {
    const isDateBlocked = (date) => date.isBefore(moment(), "day");
    const onDateChange = ({ date }) => this.setState({ ...this.state, date });
    let openImagePickerAsync = async () => {
      let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();
      if (permissionResult.granted === false) {
        alert("Permission to access camera roll is required!");
        return;
      }
      let pickerResult = await ImagePicker.launchImageLibraryAsync({
        aspect: [4, 3],
      });
      console.log(pickerResult);
      // let result = await ImagePicker.launchCameraAsync({
      //   allowsEditing: true,
      //   aspect: [4, 3],
      // });

      if (pickerResult.cancelled) {
        return;
      }
      let localUri = pickerResult.uri;
      //console.log(localUri);
      this.state.localUri = localUri;
      let filename = localUri.split("/").pop();
      this.setState({ ...this.state.filename, filename });
      //console.log(filename);
    };
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
          <View style={styles.containerNew}>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.textLabel}>Available From</Text>
              {this.state.date && (
                <Text style={styles.textLabel}>
                  {this.state.date && this.state.date.format("MM/DD/YYYY")}
                </Text>
              )}
            </View>
            <Dates
              date={this.state.date}
              onDatesChange={onDateChange}
              isDateBlocked={isDateBlocked}
            />
          </View>
          <View style={styles.container}>
            <Text style={styles.textLabel}>Upload Apartment Images</Text>
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity
                onPress={openImagePickerAsync}
                style={styles.button}
              >
                <Text style={styles.buttonText}>Upload photo</Text>
              </TouchableOpacity>
              {this.state.filename && (
                <Text numberOfLines={1} style={styles.fileNameStyle}>
                  {this.state.filename}
                </Text>
              )}
            </View>
          </View>
          <View>
            <Button
              color="#ffdb58"
              titleStyle={{
                color: "black",
                fontSize: 20,
              }}
              buttonStyle={{
                backgroundColor: "#ffdb58",
                borderRadius: 60,
                flex: 1,
                height: 50,
                width: "50%",
                marginLeft: "25%",
                marginTop: 20,
              }}
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
  fileNameStyle: {
    fontSize: 15,
    // paddingBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 10,
    marginRight: "5%",
    flex: 1,
  },
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 5,
    width: "25%",
    marginLeft: "5%",
    marginTop: 10,
  },
  buttonStyle: {
    width: "100%",
    marginLeft: "20%",
    marginTop: 10,
    color: "#ffdb58",
  },
  date: {
    marginTop: 50,
  },
  focused: {
    color: "blue",
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  instructions: {
    color: "#888",
    fontSize: 18,
    marginHorizontal: 15,
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 12,
    color: "#000",
  },
});

export default AddApartmentListing;
