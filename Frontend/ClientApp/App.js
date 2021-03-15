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
import ItemAddScreen from "./Components/ItemAddScreen";
import { RentalListingDetails } from "./Components/RentalListingDetails";
import { SearchAndFilter } from "./Components/SearchAndFilter";

const Stack = createStackNavigator();
class App extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="ItemAddScreen"
            component={ItemAddScreen}
            options={{
              title: "Add Item Listing",
              headerStyle: {
                backgroundColor: "#ffdb58"
              },
              headerTintColor: "#000000",
              headerTitleStyle: {
                fontWeight: "bold"
              }
            }}
          />
          <Stack.Screen
            name="Home"
            component={Home}
            options={{
              title: "School Casa",
              headerStyle: {
                backgroundColor: "#ffdb58"
              },
              headerTintColor: "#000000",
              headerTitleStyle: {
                fontWeight: "bold"
              }
            }}
          />
          <Stack.Screen
            name="Rental listings"
            component={RentalListings}
            options={{
              headerStyle: {
                backgroundColor: "#ffdb58"
              },
              headerTintColor: "#000000",
              headerTitleStyle: {
                fontWeight: "bold"
              }
            }}
          />
          <Stack.Screen
            name="Item listings"
            component={ItemList}
            options={{
              headerStyle: {
                backgroundColor: "#ffdb58"
              },
              headerTintColor: "#000000",
              headerTitleStyle: {
                fontWeight: "bold"
              }
            }}
          />
          <Stack.Screen
            name="Menu"
            component={CustomMenu}
            options={{
              title: "Menu",
              headerStyle: {
                backgroundColor: "#ffdb58"
              },
              headerTintColor: "#000000",
              headerTitleStyle: {
                fontWeight: "bold"
              }
            }}
          />
          <Stack.Screen
            name="AddApartmentListing"
            component={AddApartmentListing}
            options={{
              title: "Add Apartment Listing",
              headerStyle: {
                backgroundColor: "#ffdb58"
              },
              headerTintColor: "#000000",
              headerTitleStyle: {
                fontWeight: "bold"
              }
            }}
          />
          <Stack.Screen
            name="RentalListingDetails"
            component={RentalListingDetails}
            options={{
              title: "Rental Details",
              headerStyle: {
                backgroundColor: "#ffdb58"
              },
              headerTintColor: "#000000",
              headerTitleStyle: {
                fontWeight: "bold"
              }
            }}
          />

          <Stack.Screen
            name="SearchAndFilter"
            component={SearchAndFilter}
            options={{
              title: "Search-Filter",
              headerStyle: {
                backgroundColor: "#ffdb58"
              },
              headerTintColor: "#000000",
              headerTitleStyle: {
                fontWeight: "bold"
              }
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
export default App;
