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
import axios from "axios";
import { AntDesign } from "@expo/vector-icons";
export function RentalListings({ navigation }) {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  //exp://192.168.86.180:19000

  useEffect(() => {
    axios
      .get("http://192.168.1.9:8080/showApartmentListing")
      .then(res => {
        setData(res.data);
      })
      .catch(error => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <View style={{ flex: 1, padding: 0 }}>
      {isLoading ? (
        <Text></Text>
      ) : (
        <View>
          <ScrollView>
            <Text></Text>
            <View style={{ flexDirection: "row" }}>
              <Text></Text>
              <Button
                onPress={() => {
                  navigation.navigate("Home");
                }}
                title="Home"
                // // color="#ffbf58"
                // backgroundColor="#ffbf58"

                buttonStyle={{
                  backgroundColor: "#ffdb58",
                  // borderRadius: 60,
                  // flex: 1,
                  height: 40,
                  width: "60%"
                }}
                titleStyle={{
                  color: "black",
                  fontSize: 15,
                  fontWeight: "Bold"
                }}
              />
              <Text></Text>
              <Button
                onPress={() => {
                  navigation.navigate("AddApartmentListing");
                }}
                title="+"
                // // color="#ffbf58"
                // backgroundColor="#ffbf58"

                buttonStyle={{
                  backgroundColor: "#ffdb58",
                  // borderRadius: 60,
                  // flex: 1,
                  height: 40,
                  width: "60%"
                }}
                titleStyle={{
                  color: "black",
                  fontSize: 30,
                  fontWeight: "Bold"
                }}
              />
              <AntDesign
                name="search1"
                size={40}
                color="black"
                onPress={() => {
                  navigation.navigate("SearchAndFilter");
                }}
              />
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
