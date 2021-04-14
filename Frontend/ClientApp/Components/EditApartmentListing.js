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
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";

class EditApartmentListing extends Component {
  constructor(props) {
    super(props);
    let routeData = this.props.route.params;
    this.state = {
      address: routeData.address,
      rent: routeData.rent + "",
      description: routeData.description,
      isParkingAvailable: routeData.parkingAvailable,
      bedrooms: routeData.bedrooms + "",
      bathrooms: routeData.bathrooms + "",
      date: moment(this.props.route.params.availableDate),
      filename1: null,
      localUri1: null,
      filename2: null,
      localUri2: null,
      filename3: null,
      localUri3: null,
      inProgress: false,
      error: null,
      latitude: routeData.latitude,
      longitude: routeData.longitude,
    };
    this.handleAddressChange = this.handleAddressChange.bind(this);
    this.handleRentChange = this.handleRentChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleEndEditing = this.handleEndEditing.bind(this);
  }

  componentDidMount() {
    // Permissions.askAsync(Permissions.LOCATION);
    // console.log("checking params did mount");
    // console.log(this.props.route.params);
  }

  handleAddressChange(address) {
    this.setState({ address });
  }

  handleEndEditing = async () => {
    //console.log("end editing:"+ this.state.address);
    let locationAccess = await Permissions.askAsync(Permissions.LOCATION);
    if (locationAccess.granted == false) {
      alert(
        "Permission to access location is required to show your post in the map view. Change the settings before adding your post."
      );
      return;
    }
    this.attemptGeocodeAsync();
  };

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
    // if (this.state.date === null) {
    //   alert("Please select date");
    //   return;
    // }

    let formData = new FormData();
    formData.append("apartmentId", this.props.route.params.id);
    formData.append("description", this.state.description);
    formData.append("address", this.state.address);
    formData.append("rent", this.state.rent);
    formData.append("bedrooms", this.state.bedrooms);
    formData.append("bathrooms", this.state.bathrooms);
    if (this.state.date != null) {
      formData.append("availableDate", this.state.date.format("MM/DD/YYYY"));
    } else {

      formData.append("availableDate", moment(this.props.route.params.availableDate).format("MM/DD/YYYY"));
    }
    let parking = 0;
    if (this.state.isParkingAvailable === true) {
      parking = 1;
    }
    formData.append("isParkingAvailable", parking);
    formData.append("latitude", this.state.latitude);
    formData.append("longitude", this.state.longitude);
    formData.append("email", email);

    const config = {
      headers: {
        // "content-type": "multipart/form-data",
        Accept: "application/json",
      },
    };
    axios
      .put(
        "http://192.168.0.9:8080" + "/editApartmentListing/",
        formData,
        config
      )
      .then(function (response) {
        return response;
      })
      .then((data) => {
        alert("Apartment listing updated successfully");
        this.props.navigation.push("MyList");
      })
      .catch(function (error) {
       // console.log("Error " + JSON.stringify(error));
      });
  };

  attemptGeocodeAsync = async () => {
    this.setState({ inProgress: true, error: null });
    try {
      let result = await Location.geocodeAsync(this.state.address);
      this.setState({ latitude: result[0].latitude });
      this.setState({ longitude: result[0].longitude });
    } catch (e) {
      this.setState({ error: e.message });
    } finally {
      this.setState({ inProgress: false });
    }
  };

  render() {
    const isDateBlocked = (date) => date.isBefore(moment(), "day");
    const onDateChange = ({ date }) => {
      this.setState({ ...this.state, date });
    };
    let openImagePickerAsync = async (value) => {
      let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();
      if (permissionResult.granted === false) {
        alert("Permission to access camera roll is required!");
        return;
      }
      let pickerResult = await ImagePicker.launchImageLibraryAsync({
        aspect: [4, 3],
      });
      if (pickerResult.cancelled) {
        if (value == "1") {
          this.setState({ localUri1: null });
          this.setState({ filename1: null });
        } else if (value == "2") {
          this.setState({ localUri2: null });
          this.setState({ filename2: null });
        } else if (value == "3") {
          this.setState({ localUri3: null });
          this.setState({ filename3: null });
        }
        return;
      }
      let localUri = pickerResult.uri;
      let filename = localUri.split("/").pop();
      if (value == "1") {
        this.setState({ localUri1: localUri });
        this.setState({ filename1: filename });
      } else if (value == "2") {
        this.setState({ localUri2: localUri });
        this.setState({ filename2: filename });
      } else if (value == "3") {
        this.setState({ localUri3: localUri });
        this.setState({ filename3: filename });
      }
      //console.log(filename);
    };
    return (
      <View style={styles.container}>
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
              onEndEditing={this.handleEndEditing}
            />
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.textLabel}>Beds</Text>
              <Picker
                selectedValue={this.state.bedrooms}
                value={this.state.bedrooms}
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
            <Text style={styles.textLabel}>Upload Apartment Photos</Text>
            <View style={{ flexDirection: "row" }}>
              {this.state.localUri1 && (
                <Image
                  source={{ uri: this.state.localUri1 }}
                  style={{
                    width: "30%",
                    height: 100,
                    marginRight: "1%",
                    marginLeft: "3%",
                  }}
                />
              )}
              {this.state.localUri2 && (
                <Image
                  source={{ uri: this.state.localUri2 }}
                  style={{ width: "30%", height: 100, marginRight: "1%" }}
                />
              )}
              {this.state.localUri3 && (
                <Image
                  source={{ uri: this.state.localUri3 }}
                  style={{ width: "30%", height: 100 }}
                />
              )}
            </View>
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity
                onPress={() => openImagePickerAsync("1")}
                style={styles.button}
              >
                <Text style={styles.buttonText}>Upload image1</Text>
              </TouchableOpacity>
              {this.state.filename1 && (
                <Text numberOfLines={1} style={styles.fileNameStyle}>
                  {this.state.filename1}
                </Text>
              )}
            </View>
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity
                onPress={() => openImagePickerAsync("2")}
                style={styles.button}
              >
                <Text style={styles.buttonText}>Upload image2</Text>
              </TouchableOpacity>
              {this.state.filename2 && (
                <Text numberOfLines={1} style={styles.fileNameStyle}>
                  {this.state.filename2}
                </Text>
              )}
            </View>
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity
                onPress={() => openImagePickerAsync("3")}
                style={styles.button}
              >
                <Text style={styles.buttonText}>Upload image3</Text>
              </TouchableOpacity>
              {this.state.filename3 && (
                <Text numberOfLines={1} style={styles.fileNameStyle}>
                  {this.state.filename3}
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
  buttonText: {
    fontSize: 12,
    color: "#000",
  },
});

export default EditApartmentListing;
