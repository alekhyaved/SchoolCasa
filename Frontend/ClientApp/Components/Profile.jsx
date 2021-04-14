import * as React from "react";
import { View, StyleSheet, Image,Text } from "react-native";
// import { Button, Menu, Divider, Provider } from "react-native-paper";
// import {
//   DrawerContentScrollView,
//   DrawerItemList,
//   DrawerItem,
// } from '@react-navigation/drawer';

export class Profile extends React.Component {
  render() {
    return (
        <View>
            <Text>Profile</Text>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    height: "100%",
    justifyContent: "center"
  },
  center: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center"
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
