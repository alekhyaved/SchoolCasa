import React, { Component } from "react";
import {
  AppRegistry,
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Modal,
  Alert,
} from "react-native";
import { Button, Header } from "react-native-elements";
import axios from "axios";
import { SearchBar } from "react-native-elements";
import { AntDesign, EvilIcons } from "@expo/vector-icons";

export default class MyItemList extends Component {
  state = {
    items: [],
    editRequest: false,
    search: "",
    modalId: null,
  };

  updateSearch = (event) => {
    this.setState({ search: event.substring(0, 20) });
  };

  componentDidMount() {
    axios
      .get("http://192.168.0.9:8080/getMyItemListings/" + email)
      .then((response) => {
        this.setState({ items: response.data });
      });
  }

  render() {
    let data = this.state.items;
    return (
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <ScrollView>
          <View style={{ flexDirection: "row" }}>
            <Text></Text>
          </View>
          {data.map((responseData) => (
            <View key={responseData.id} style={styles.item}>
              <Image
                source={{ uri: responseData.imageURL }}
                style={{
                  width: 170,
                  height: 150,
                  borderColor: "grey",
                  borderWidth: 2,
                }}
              />
              <View style={{ flex: 1, padding: 7 }}>
                <Text style={{ fontSize: 22, fontWeight: "bold" }}>
                  {responseData.productName}
                </Text>
                <Text style={{ fontSize: 15, fontWeight: "bold" }}>
                  {responseData.address}
                </Text>
                <Text></Text>
                <Text
                  style={{ fontSize: 18, fontWeight: "bold", color: "green" }}
                >
                  ${responseData.price}
                </Text>
              </View>
              <View
                style={{ flexDirection: "column", justifyContent: "center" }}
              >
                <AntDesign
                  name="edit"
                  size={30}
                  color="black"
                  justifyContent="flex-end"
                  onPress={() => {
                    // navigation.navigate("EditApartmentListing", responseData);
                  }}
                />
                <Text></Text>
                <Text></Text>
                <AntDesign
                  name="delete"
                  size={30}
                  color="red"
                  justifyContent="flex-end"
                  onPress={() => {
                    Alert.alert(
                      "Confirmation",
                      "Do you want to delete apartment listing?",
                      [
                        {
                          text: "Cancel",
                          onPress: () => console.log("Cancel Pressed"),
                          style: "cancel",
                        },
                        {
                          text: "OK",
                          onPress: () => console.log("OK"),
                        },
                      ]
                    );
                  }}
                />
              </View>
            </View>
          ))}
        </ScrollView>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  nextButton: {
    position: "absolute",
    bottom: "40%",
    right: 0,
    top: "40%",
    alignItems: "center",
  },
  closeButton: {
    position: "absolute",
    right: 0,
    top: 0,
  },

  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    margin: 2,
    borderColor: "#CCCCCC",
    borderWidth: 2,
  },
});
