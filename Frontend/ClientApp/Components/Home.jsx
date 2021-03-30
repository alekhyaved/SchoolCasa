import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Button, TouchableOpacity } from "react-native";
import {
  Card,
  ListItem,
  Icon,
  Avatar,
  Image,
  Header
} from "react-native-elements";
import { Auth } from "aws-amplify";

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { MaterialIcons} from '@expo/vector-icons';

import RentalListings from './RentalListings' ;
import ItemList from './ItemList';
import AddApartmentListing from "./AddApartmentListing";
import ItemAddScreen from "./ItemAddScreen";
import { SearchAndFilter } from "./SearchAndFilter";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const NavigationDrawerStructure = (props)=> {
  //Structure for the navigatin Drawer
  const toggleDrawer = () => {
    //Props to open/close the drawer
    props.navigationProps.toggleDrawer();
  };

  return (
    <View style={{ flexDirection: 'row' }}>
      <TouchableOpacity onPress={()=> toggleDrawer()}>
        {/*Donute Button Image */}
            <MaterialIcons name='menu' size ={28} onPress={()=> toggleDrawer()} style = {styles.icon}/>
      </TouchableOpacity>
    </View>
  );
}

function rentalListingsStack({ navigation }) {
  return (
      <Stack.Navigator initialRouteName="RentalListings">
        <Stack.Screen
          name="RentalListings"
          component={RentalListings}
          options={{
            title: 'School Casa', //Set Header Title
            headerLeft: ()=>
              <NavigationDrawerStructure
                navigationProps={navigation}
              />,
            headerStyle: {
              backgroundColor: '#f4511e', //Set Header color
            },
            headerTintColor: '#fff', //Set Header text color
            headerTitleStyle: {
              fontWeight: 'bold', //Set Header text style
            },
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
        {/* <Stack.Screen
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
        /> */}
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
  );
}

function itemListingsStack({ navigation }) {
  return (
    <Stack.Navigator
      initialRouteName="ItemListings"
    >
      <Stack.Screen
        name="ItemListings"
        component={ItemList}
        options={{
          title: 'School Casa', //Set Header Title
            headerLeft: ()=>
              <NavigationDrawerStructure
                navigationProps={navigation}
              />,
            headerStyle: {
              backgroundColor: '#f4511e', //Set Header color
            },
            headerTintColor: '#fff', //Set Header text color
            headerTitleStyle: {
              fontWeight: 'bold', //Set Header text style
            },
        }}/>
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

    </Stack.Navigator>
  );
}

function signOutStack({ navigation }) {
  return (
      <Stack.Navigator initialRouteName="SignOut">
        <Stack.Screen
          name="SignOut"
          component={signOut}
          // options={{
          //   title: 'School Casa', //Set Header Title
          // }}
        />
      </Stack.Navigator>
  );
}

function signOut(props) {
  useEffect(() => {
    Auth.signOut();
  }, []);

  return (<View></View>);
}
class Home extends React.Component {
  render() {
    return (
      <NavigationContainer>
      <Drawer.Navigator
        drawerContentOptions={{
          activeTintColor: '#e91e63',
          itemStyle: { marginVertical: 5 },
        }}>
        <Drawer.Screen
          name="Rental Listings"
          options={{ drawerLabel: 'Rental Listings' }}
          component={rentalListingsStack} />
        <Drawer.Screen
          name="Item Listings"
          options={{ drawerLabel: 'Item Listings' }}
          component={itemListingsStack} />
        <Drawer.Screen
          name="Sign Out"
          options={{ drawerLabel: 'Sign Out' }}
          component={signOutStack} />
      </Drawer.Navigator>
    </NavigationContainer>
    );
  }
}
const styles = StyleSheet.create({
  headerStyle: {
    backgroundColor: "#ffffff"
  },
  textLabel: {
    fontSize: 20,
    marginTop: "25%",
    // paddingBottom: 10,
    paddingLeft: 10
    // paddingTop: 10,
  }
});

export default Home;
