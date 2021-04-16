import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import { View, Text, ScrollView, FlatList } from "react-native";
import {
  Card,
  ListItem,
  Button,
  Avatar,
  Image,
  Header
} from "react-native-elements";
import { Foundation } from "@expo/vector-icons";
import axios from "axios";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { MyList } from "./MyList";
export default function RentalListings({ navigation, route }) {
  // {navigation}
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  //exp://192.168.86.180:19000

  useEffect(() => {
    const config = {
      headers: {
        "content-type": "application/json",
        Accept: "application/json"
      }
    };

    axios
      .get("http://192.168.86.180:8080/showApartmentListing")
      //.get("http://192.168.0.31:8080/showApartmentListing")
      .then(function(response) {
        let data = response.data;

        if (route.params && route.params.address) {
          if (route.params.address.length > 0) {
            data = data.filter(responseData => {
              return (
                responseData.address
                  .toLowerCase()
                  .indexOf(route.params.address.toLowerCase()) != -1
              );
            });
          }
        }

        if (route.params && route.params.bathrooms) {
          //alert(JSON.stringify(route.params.bathrooms));
          if (route.params.bathrooms > 0) {
            data = data.filter(apartment => {
              return apartment.bathrooms == route.params.bathrooms;
            });
          }
        }

        if (route.params && route.params.bedrooms) {
          if (route.params.bedrooms > 0) {
            data = data.filter(apartment => {
              return apartment.bedrooms == route.params.bedrooms;
            });
          }
        }

        if (route.params && route.params.fromPrice && route.params.toPrice) {
          if (
            !isNaN(route.params.fromPrice) &&
            !isNaN(route.params.toPrice) &&
            route.params.toPrice > 0
          ) {
            data = data.filter(apartment => {
              return apartment.rent >= route.params.fromPrice;
            });
            data = data.filter(apartment => {
              return apartment.rent <= route.params.toPrice;
            });
          }
        }

        setData(data);
        // return response;
      })
      .catch(function(error) {})
      .finally(() => setLoading(false));
  }, [data]);
  return (
    <View style={{ flex: 1, padding: 0 }}>
      {isLoading ? (
        <Text></Text>
      ) : (
        <View>
          <ScrollView>
            <Text></Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                flex: 1
              }}
            >
              <AntDesign
                name="plus"
                size={40}
                color="black"
                style={{
                  // borderRadius: 60,
                  // flex: 1,
                  height: 40,
                  width: "25%",
                  marginLeft: 15
                }}
                onPress={() => {
                  navigation.navigate("AddApartmentListing");
                }}
              />
              <Text>{"            "}</Text>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  right: "5%"
                }}
              >
                <AntDesign
                  name="search1"
                  size={35}
                  color="black"
                  onPress={() => {
                    delete route.params;
                    navigation.navigate("SearchAndFilter");
                  }}
                />
                <Button
                  onPress={() => {
                    navigation.navigate("MyList");
                  }}
                  title="Clear filters"
                  buttonStyle={{
                    backgroundColor: "#ffdb58",
                    height: 40,
                    width: "70%",
                    marginLeft: 10
                  }}
                  titleStyle={{
                    color: "black",
                    fontSize: 15
                  }}
                  onPress={() => {
                    delete route.params;
                  }}
                />
                <View style={{marginRight: 20}}>
                  <Foundation
                      onPress={() => {
                        navigation.navigate("Map", data);
                      }}
                      name="map"
                      size={38}
                      color="black"
                  />
                </View>
              </View>
            </View>
            <Text></Text>
            {data.map(responseData => (
              <View key={responseData.id} style={styles.item}>
                <Image
                  source={{ uri: responseData.imageURL1 }}
                  style={{
                    width: 170,
                    height: 150,
                    borderColor: "grey",
                    borderWidth: 2
                  }}
                />
                <View style={{ flex: 1, padding: 10 }}>
                  <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                    ${responseData.rent}
                  </Text>
                  <Text style={{ fontSize: 15, fontWeight: "bold" }}>
                    {responseData.address}
                  </Text>
                  <Text style={{ fontSize: 15, fontWeight: "bold" }}>
                    {responseData.description}
                  </Text>
                  {/* <AntDesign
                    name="infocirlce"
                    size={24}
                    color="black"
                    onPress={() => {
                      navigation.navigate("RentalListingDetails", responseData);
                    }}
                  /> */}
                  {/* <Button
                    title="ViewDetials"
                    onPress={() => {
                      navigation.navigate("RentalListingDetails", responseData);
                    }}
                  ></Button> */}
                </View>
                <View
                  style={{ flexDirection: "column", justifyContent: "center" }}
                >
                  <AntDesign
                    name="rightcircle"
                    size={36}
                    color="black"
                    justifyContent="flex-end"
                    onPress={() => {
                      navigation.navigate("RentalListingDetails", responseData);
                    }}
                  />
                </View>
              </View>
            ))}
          </ScrollView>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    // alignItems: "center",
    padding: 10,
    margin: 2,
    borderColor: "#CCCCCC",
    borderWidth: 2
    // backgroundColor: "#d2f7f1"
  }
});
