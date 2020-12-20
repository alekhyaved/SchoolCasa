import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { RentalListings } from "./Components/RentalListings";
import Home from "./Components/Home";
import { CustomMenu } from "./Components/CustomMenu";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import ItemList from "./Components/ItemList";
import AddApartmentListing from "./Components/AddApartmentListing";

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
          <Stack.Screen name="Rental listings" component={RentalListings} />
          <Stack.Screen name="Item listings" component={ItemList} />
          <Stack.Screen name="Menu" component={CustomMenu} />
          <Stack.Screen
            name="AddApartmentListing"
            component={AddApartmentListing}
            options={{
              title: "Add Apartment Listing",
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
export default App;
