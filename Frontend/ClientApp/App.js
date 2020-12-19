import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { RentalListings } from "./Components/RentalListings";
import Home from "./Components/Home";
import { CustomMenu } from "./Components/CustomMenu";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
const Stack = createStackNavigator();
class App extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Home"
            component={Home}
            options={{
              title: "SchoolCasa",
              headerStyle: {
                backgroundColor: "#0000FF"
              },
              headerTintColor: "#fff",
              headerTitleStyle: {
                fontWeight: "bold"
              }
            }}
          />
          <Stack.Screen name="Rental listisngs" component={RentalListings} />
          <Stack.Screen name="Menu" component={CustomMenu} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
export default App;
