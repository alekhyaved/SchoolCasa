import { StatusBar } from "expo-status-bar";
import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Picker,
  Keyboard,
  Image,
  ScrollView,
  LogBox,
} from "react-native";
import { Button } from "react-native-paper";
import { TextInput } from "react-native";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import config from "../config";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

class EditItemListing extends Component {
  constructor(props) {
    super(props);
    let routeData = this.props.route.params;
    
    this.state = {
      productName: routeData.productName,
      price: routeData.price + "",
      address: routeData.address + "",
      description: routeData.description,
      age: routeData.age,
      warranty: routeData.warranty,
      category: routeData.category,
      file: "",
      filename: null,
      localUri: null,
    };

    this.handleProductNameChange = this.handleProductNameChange.bind(this);
    this.handlePriceChange = this.handlePriceChange.bind(this);
    this.handleAddressChange = this.handleAddressChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleAgeChange = this.handleAgeChange.bind(this);
    this.handleWarrantyChange = this.handleWarrantyChange.bind(this);
    this.handleCategoryChange = this.handleCategoryChange.bind(this);
    this.submitItemDetails = this.submitItemDetails.bind(this);
  }

  componentDidMount() {
    // Permissions.askAsync(Permissions.LOCATION);
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
  }

  handleProductNameChange = (event) => {
    this.setState({
      productName: event,
    });
  };

  handlePriceChange = (event) => {
    this.setState({
      price: event,
    });
  };

  handleAddressChange = (event) => {
    this.setState({
      address: event,
    });
  };

  handleDescriptionChange = (event) => {
    this.setState({
      description: event,
    });
  };

  handleAgeChange = (event) => {
    this.setState({
      age: event,
    });
  };

  handleWarrantyChange = (event) => {
    this.setState({
      warranty: event,
    });
  };

  handleCategoryChange = (event) => {
    this.setState({
      category: event,
    });
  };

  pickImage = async () => {
    let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }
    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      aspect: [4, 3],
    });
    
    if (pickerResult.cancelled) {
      return;
    }
    let localUri = pickerResult.uri;
    this.state.localUri = localUri;
    let filename = localUri.split("/").pop();

    this.setState({ ...this.state.filename, filename });
  };

  submitItemDetails = (event) => {
    var newItem = new FormData();
    newItem.append("id",this.props.route.params.id);
    newItem.append("productName", this.state.productName);
    newItem.append("price", this.state.price);
    newItem.append("address", this.state.address);
    newItem.append("description", this.state.description);
    newItem.append("age", this.state.age);
    newItem.append("category", this.state.category);
    newItem.append("warranty", this.state.warranty);
    newItem.append("email", email);
    // if (this.state.filename != null) {
    //   let match = /\.(\w+)$/.exec(this.state.filename);
    //   let type = match ? `image/${match[1]}` : `image`;
    //   newItem.append("file", {
    //     uri: this.state.localUri,
    //     name: this.state.filename,
    //     type,
    //   });
    //   console.log(newItem);
    // } else {
    //   newItem.append("file", null);
    // }
    
    const configure = {
      headers: {
        // "content-type": "multipart/form-data",
        Accept: "application/json",
      },
    };
    axios
      .put("http://192.168.0.9:8080/editItemListing", newItem, configure)
      .then((response) => {
        alert("Item listing updated successfully");
        this.props.navigation.push("MyItemList");
      })
      .catch((error) => {
        //console.log("error");
      });
  };

  render() {
    const place = { description: this.state.address };
    return (
      <View style={styles.container}>
        <ScrollView keyboardShouldPersistTaps="handled">
          <Text></Text>
          <TextInput
            style={{
              height: 40,
              borderColor: "gray",
              borderWidth: 1,
              width: 300,
              marginTop: 20,
              marginLeft: 30,
              paddingLeft: 10,
            }}
            placeholder="Product Name"
            maxLength={60}
            onBlur={Keyboard.dismiss}
            onChangeText={this.handleProductNameChange}
            value={this.state.productName}
          />

          <TextInput
            style={{
              height: 40,
              borderColor: "gray",
              borderWidth: 1,
              width: 300,
              marginTop: 20,
              marginLeft: 30,
              paddingLeft: 10,
            }}
            placeholder="Price"
            maxLength={10}
            onBlur={Keyboard.dismiss}
            onChangeText={this.handlePriceChange}
            value={this.state.price}
          />

          <GooglePlacesAutocomplete
            placeholder={this.state.address}
            onPress={(data, details = null) => {
              this.handleAddressChange(data.description);
            }}
            query={{
              key: config.google.API_KEY,
              language: "en",
            }}
            predefinedPlaces={[place]}
            predefinedPlacesAlwaysVisible={true}
            styles={{
              textInputContainer: {
                backgroundColor: "grey",
                height: 40,
                borderColor: "gray",
                borderWidth: 1,
                width: 300,
                marginTop: 20,
                marginLeft: 30,
                flexDirection: "row",
              },
              textInput: {
                height: 38,
                color: "#5d5d5d",
                fontSize: 16,
                paddingLeft: 10,
              },
            }}
          />

          <TextInput
            multiline
            numberOfLines={3}
            style={{
              height: 40,
              borderColor: "gray",
              borderWidth: 1,
              width: 300,
              marginTop: 20,
              marginLeft: 30,
              paddingLeft: 10,
            }}
            placeholder="Product Description"
            maxLength={100}
            onBlur={Keyboard.dismiss}
            onChangeText={this.handleDescriptionChange}
            value={this.state.description}
          />

          <Picker
            selectedValue={this.state.category}
            style={{ height: 50, width: 150, marginTop: 10, marginLeft: 30 }}
            onValueChange={(itemValue, itemIndex) =>
              this.setState({ category: itemValue })
            }
          >
            <Picker.Item label="Category" value="category" />
            <Picker.Item label="Furniture" value="furniture" />
            <Picker.Item label="Electronics" value="electronics" />
            <Picker.Item label="Scooters" value="scooters" />
            <Picker.Item label="Miscellaneous" value="Miscellaneous" />
          </Picker>

          <Picker
            selectedValue={this.state.warranty}
            style={{ height: 50, width: 150, marginTop: 10, marginLeft: 30 }}
            onValueChange={(itemValue, itemIndex) =>
              this.setState({ warranty: itemValue })
            }
          >
            <Picker.Item label="Warranty" value="warranty" />
            <Picker.Item label="Yes" value="WarrantyY" />
            <Picker.Item label="No" value="WarrantyN" />
          </Picker>

          <Picker
            selectedValue={this.state.age}
            style={{ height: 50, width: 200, marginTop: 10, marginLeft: 30 }}
            onValueChange={(itemValue, itemIndex) =>
              this.setState({ age: itemValue })
            }
          >
            <Picker.Item label="Age of product" value="productAge" />
            <Picker.Item label="1 year" value="age1" />
            <Picker.Item label="2 years" value="age2" />
            <Picker.Item label="3 years" value="age3" />
            <Picker.Item label="4 years" value="age4" />
            <Picker.Item label="5 years" value="age5" />
          </Picker>

          {/* <Button
            icon="camera"
            mode="contained"
            color="#c9c7c7"
            onPress={this.pickImage}
            style={{ height: 40, width: 170, marginTop: 20, marginLeft: 30 }}
          >
            Upload image
          </Button> */}

          <View
            style={{
              height: 50,
              width: "60%",
              marginLeft: 80,
              marginTop: 20,
              borderRadius: 60,
            }}
          >
            <Button
              mode="contained"
              color="#ffdb58"
              onPress={this.submitItemDetails}
            >
              Submit
            </Button>
          </View>
          <StatusBar style="auto" />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});

export default EditItemListing;
