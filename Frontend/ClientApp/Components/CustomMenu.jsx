import * as React from "react";
import { View } from "react-native";
import { Button, Menu, Divider, Provider } from "react-native-paper";
import { StyleSheet } from "react-native";

export class CustomMenu extends React.Component {
  render() {
    return (
      <View>
        <Menu.Item
          onPress={() => {
            this.props.navigation.navigate("Rental listings");
          }}
          title="Rental Listings"
        />
        <Menu.Item icon="undo" onPress={() => {}} title="Undo" />
        <Menu.Item icon="content-cut" onPress={() => {}} title="Cut" disabled />
        <Menu.Item
          icon="content-copy"
          onPress={() => {}}
          title="Copy"
          disabled
        />
        <Menu.Item icon="content-paste" onPress={() => {}} title="Paste" />
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
