import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import RentalListings from "./Components/RentalListings";
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
import LoginComponent from "./Components/LoginComponent";
import amplify from "aws-amplify";
import config from "./config";

amplify.configure({
  Auth: {
    mandatorySignId: true,
    region: config.cognito.REGION,
    userPoolId: config.cognito.USER_POOL_ID,
    userPoolWebClientId: config.cognito.APP_CLIENT_ID
  },
  Analytics: {
    disabled: true
  }
});

const Stack = createStackNavigator();

class App extends React.Component {
  render() {
    return ( 
           <LoginComponent />
    );
  }
}
export default App;
