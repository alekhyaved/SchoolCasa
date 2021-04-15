import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Button, TouchableOpacity } from "react-native";
import { Auth } from "aws-amplify";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { MaterialIcons } from "@expo/vector-icons";
import RentalListings from "./RentalListings";
import RentalListingDetails from "./RentalListingDetails";
import ItemList from "./ItemList";
import AddApartmentListing from "./AddApartmentListing";
import ItemAddScreen from "./ItemAddScreen";
import Map from "./Map";
import { SearchAndFilter } from "./SearchAndFilter";
import { CustomMenu } from "./CustomMenu";
import { Profile } from "./Profile";
import { MyList } from "./MyList";
import EditApartmentListing from "./EditApartmentListing";
import MyItemList from "./MyItemList";


const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const NavigationDrawerStructure = (props) => {
  //Structure for the navigation Drawer
  const toggleDrawer = () => {
    //Props to open/close the drawer
    props.navigationProps.toggleDrawer();
  };

  return (
    <View style={{ flexDirection: "row" }}>
      <TouchableOpacity onPress={() => toggleDrawer()}>
        {/*Donute Button Image */}
        <MaterialIcons
          name="menu"
          size={28}
          onPress={() => toggleDrawer()}
          style={styles.icon}
        />
      </TouchableOpacity>
    </View>
  );
};

function rentalListingsStack({ navigation }) {
  return (
    <Stack.Navigator initialRouteName="RentalListings">
      <Stack.Screen
        name="RentalListings"
        component={RentalListings}
        options={{
          title: "School Casa", //Set Header Title
          headerLeft: () => (
            <NavigationDrawerStructure navigationProps={navigation} />
          ),
          headerStyle: {
            backgroundColor: "#ffdb58", //Set Header color
          },
          headerTintColor: "#000000", //Set Header text color
          headerTitleStyle: {
            fontWeight: "bold", //Set Header text style
          },
        }}
      />
      <Stack.Screen
        name="RentalListingDetails"
        component={RentalListingDetails}
        options={{
          title: "Rental Listing Details",
          headerStyle: {
            backgroundColor: "#ffdb58",
          },
          headerTintColor: "#000000",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />
      <Stack.Screen
        name="AddApartmentListing"
        component={AddApartmentListing}
        options={{
          title: "Add Apartment Listing",
          headerStyle: {
            backgroundColor: "#ffdb58",
          },
          headerTintColor: "#000000",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />
      <Stack.Screen
        name="Map"
        component={Map}
        options={{
          title: "Map",
          headerStyle: {
            backgroundColor: "#ffdb58",
          },
          headerTintColor: "#000000",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />
      <Stack.Screen
            name="MyList"
            component={MyList}
            options={{
              title: "My Listings",
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
  );
}

function profileStack({ navigation }) {
  return (
      <Stack.Navigator initialRouteName="Profile">
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{
            title: 'School Casa', //Set Header Title
            headerLeft: ()=>
              <NavigationDrawerStructure
                navigationProps={navigation}
              />,
            headerStyle: {
              backgroundColor: '#ffdb58', //Set Header color
            },
            headerTintColor: '#000000', //Set Header text color
            headerTitleStyle: {
              fontWeight: 'bold', //Set Header text style
            },
          }}
        />
      </Stack.Navigator>
  );
}

function myRentalListingsStack({ navigation }) {
  return (
    <Stack.Navigator initialRouteName="MyList">
      <Stack.Screen
        name="MyList"
        component={MyList}
        options={{
          title: "My Rental Listings", //Set Header Title
          headerLeft: () => (
            <NavigationDrawerStructure navigationProps={navigation} />
          ),
          headerStyle: {
            backgroundColor: "#ffdb58", //Set Header color
          },
          headerTintColor: "#000000", //Set Header text color
          headerTitleStyle: {
            fontWeight: "bold", //Set Header text style
          },
        }}
      />
      <Stack.Screen
        name="EditApartmentListing"
        component={EditApartmentListing}
        options={{
          title: "Edit Apartment Listing",
          headerStyle: {
            backgroundColor: "#ffdb58",
          },
          headerTintColor: "#000000",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />
    </Stack.Navigator>
  );
}

function itemListingsStack({ navigation }) {
  return (
    <Stack.Navigator initialRouteName="ItemListings">
      <Stack.Screen
        name="ItemListings"
        component={ItemList}
        options={{
          title: "School Casa", //Set Header Title
          headerLeft: () => (
            <NavigationDrawerStructure navigationProps={navigation} />
          ),
          headerStyle: {
            backgroundColor: "#ffdb58", //Set Header color
          },
          headerTintColor: "#000000", //Set Header text color
          headerTitleStyle: {
            fontWeight: "bold", //Set Header text style
          },
        }}
      />
      <Stack.Screen
        name="ItemAddScreen"
        component={ItemAddScreen}
        options={{
          title: "Add Item Listing",
          headerStyle: {
            backgroundColor: "#ffdb58",
          },
          headerTintColor: "#000000",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />

      <Stack.Screen
        name="ItemList"
        component={ItemList}
        options={{
          title: "Item List Details",
          headerStyle: {
            backgroundColor: "#ffdb58",
          },
          headerTintColor: "#000000",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />
    </Stack.Navigator>
  );
}

function myItemListingsStack({ navigation }) {
  return (
    <Stack.Navigator initialRouteName="MyItemList">
      <Stack.Screen
        name="MyItemList"
        component={MyItemList}
        options={{
          title: "My Item Listings", 
          headerLeft: () => (
            <NavigationDrawerStructure navigationProps={navigation} />
          ),
          headerStyle: {
            backgroundColor: "#ffdb58", 
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold", 
          },
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

  return <View></View>;
}
class Home extends React.Component {
  render() {
    return (
      <NavigationContainer>
      <Drawer.Navigator
        drawerContentOptions={{
          activeTintColor: '#000000',
          activeBackgroundColor:"#ffdb58",
          // '#e91e63',
          itemStyle: { marginVertical: 5 },
        }}
        drawerContent = {(props) => <CustomMenu {...props} />}
        >
        <Drawer.Screen
          name="Rental Listings"
          options={{ drawerLabel: 'Rental Listings' }}
          component={rentalListingsStack} />
        <Drawer.Screen
          name="My rental list"
          options={{ drawerLabel: 'My Rental Listings' }}
          component={myRentalListingsStack} />
        <Drawer.Screen
          name="Item Listings"
          options={{ drawerLabel: 'Item Listings' }}
          component={itemListingsStack} />
        <Drawer.Screen
            name="My Item Listings"
            options={{ drawerLabel: "My Item Listings" }}
            component={myItemListingsStack} />
        <Drawer.Screen
          name="Profile"
          options={{ drawerLabel: 'Profile' }}
          component={profileStack} />
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
    backgroundColor: "#ffffff",
  },
  textLabel: {
    fontSize: 20,
    marginTop: "25%",
    // paddingBottom: 10,
    paddingLeft: 10,
    // paddingTop: 10,
  },
});

export default Home;
