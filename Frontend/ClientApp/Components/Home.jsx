import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import {
  Header
} from "react-native-elements";

class Home extends React.Component {
  render() {
    return (
      <View>
        <Header style ={styles.headerStyle}
          // height = "20"
          backgroundColor = "#ffdb58"
          placement="left"
          centerComponent={{
              text: "Item Listings",
              color: "#000000",
              onPress: () => {
                  this.props.navigation.navigate("Item listings");
              }
          }}
          // centerComponent={{ text: "MY TITLE", style: { color: "#fff" } }}
          leftComponent={{
            text: "Rental Listings",
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

        <View>
        {/* <Text style={styles.textLabel}>SchoolCasa</Text> */}
          {/* <Image
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
          /> */}
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  headerStyle: {
    backgroundColor: "#ffffff",
  },
  textLabel: {
    fontSize: 20,
    marginTop: "25%",
    // paddingBottom: 10,
    paddingLeft: 10,
    // paddingTop: 10,
  }
});

export default Home;
