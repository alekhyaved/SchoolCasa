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

export default function MessageInbox({ navigation, route }) {
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
      .get("http://192.168.1.9:8080/getInboxMessages/" + email)
      //.get("http://192.168.0.31:8080/showApartmentListing")
      .then(function(response) {
        let data = response.data;
        //alert(JSON.stringify(data));
        setData(data);
        // return response;
      })
      .catch(function(error) {
        alert(error);
      })
      .finally(() => setLoading(false));
  }, [data]);

  return (
    <View style={{ flex: 1, padding: 0 }}>
      {isLoading ? (
        <Text></Text>
      ) : (
        <View style={{ padding: 10 }}>
          <ScrollView>
            <Text style={{ fontSize: 20, fontWeight: "bold" }} />
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>
              All Messages
            </Text>
            <Text style={{ fontSize: 20, fontWeight: "bold" }} />
            {data.map(responseData => (
              <View key={responseData.id} style={styles.item}>
                <View style={{ flex: 1, padding: 10 }}>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: "row",
                      justifyContent: "space-between"
                    }}
                  >
                    <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                      From: User-{responseData.userId}
                    </Text>
                    <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                      {responseData.timestamp.substring(0, 10)}
                    </Text>
                  </View>
                  <Text
                    numberOfLines={1}
                    style={{ fontSize: 15, fontWeight: "bold" }}
                  >
                    {responseData.message}
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
                      navigation.navigate("MessageInboxDetails", responseData);
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
