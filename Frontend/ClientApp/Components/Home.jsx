import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import {
  Card,
  ListItem,
  Icon,
  Avatar,
  Image,
  Header
} from "react-native-elements";

class Home extends React.Component {
  render() {
    return (
      <View>
        <Header
          placement="left"
          centerComponent={{
              text: "Item Listing",
              color: "#fff",
              onPress: () => {
                  this.props.navigation.navigate("Item listings");
              }
          }}
          // centerComponent={{ text: "MY TITLE", style: { color: "#fff" } }}
          leftComponent={{
            text: "Rental Listing",
            color: "#fff",
            onPress: () => {
              this.props.navigation.navigate("Rental listings");
            }
          }}
          rightComponent={{
            icon: "menu",
            color: "#fff",
            onPress: () => {
              this.props.navigation.navigate("Menu");
            }
          }}
        />
        <Text>SchoolCasa</Text>
        <View>
          <Image
            source={{
              uri:
                "https://mssecarrental.s3.amazonaws.com/Screen+Shot+2020-12-18+at+3.55.42+PM.png"
            }}
            style={{
              width: 150,
              height: 150,
              borderColor: "grey",
              borderWidth: 2
            }}
          />
        </View>
      </View>
    );
  }
}

export default Home;
