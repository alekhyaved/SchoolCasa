import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import { View, Text, ScrollView, FlatList,Button } from "react-native";
import {
  Card,
  ListItem,

  Icon,
  Avatar,
  Image,
  Header
} from "react-native-elements";
import axios from "axios";

export function RentalListings({ navigation }) {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  //exp://192.168.86.180:19000

  useEffect(() => {
    axios
      .get("http://192.168.86.180:8080/showApartmentListing")
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
          <View style={{ padding: 10 }}>
            <Text></Text>
            <Button
                onPress={() => {
                  navigation.navigate("Menu");
                }}
                title="Add Apartment"
                color="blue"

            />
            <Text></Text>
          </View>
          <ScrollView>
            {data.map(responseData => (
              <View key={responseData.id} style={styles.item}>
                <Image
                  source={{ uri: responseData.imageURL }}
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
