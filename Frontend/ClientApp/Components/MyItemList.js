import React, { useState, useEffect } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Alert,
} from "react-native";
import axios from "axios";

import { AntDesign } from "@expo/vector-icons";


export function MyItemList({ navigation }) {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("http://192.168.0.9:8080/getMyItemListings/" + email)
      .then((res) => {
        setData(res.data);
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, [data]);


  const onPressDelete = (id) => {
    const url = "http://192.168.0.9:8080/deleteItemListing/" + id;
    const config = {
      headers: {
        "content-type": "text/html",
      },
    };
    axios
      .delete(url, config)
      .then((res) => {
        alert("Selected Listing is deleted");
        // console.log(res);
      })
      .catch((err) => {
        //console.log("error");
      });
  };

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      keyboardShouldPersistTaps="handled"
    >
      {isLoading ? (
        <Text></Text>
      ) : (
        <ScrollView>
          <View style={{ flexDirection: "row" }}>
            <Text></Text>
          </View>
          {data.map((responseData) => (
            <View key={responseData.id} style={styles.item}>
              <Image
                source={{ uri: responseData.imageURL }}
                style={{
                  width: 170,
                  height: 150,
                  borderColor: "grey",
                  borderWidth: 2,
                }}
              />
              <View style={{ flex: 1, padding: 7 }}>
                <Text style={{ fontSize: 22, fontWeight: "bold" }}>
                  {responseData.productName}
                </Text>
                <Text style={{ fontSize: 15, fontWeight: "bold" }}>
                  {responseData.address}
                </Text>
                <Text></Text>
                <Text
                  style={{ fontSize: 18, fontWeight: "bold", color: "green" }}
                >
                  ${responseData.price}
                </Text>
              </View>
              <View
                style={{ flexDirection: "column", justifyContent: "center" }}
              >
                <AntDesign
                  name="edit"
                  size={30}
                  color="black"
                  justifyContent="flex-end"
                  onPress={() => {
                    // navigation.navigate("EditApartmentListing", responseData);
                  }}
                />
                <Text></Text>
                <Text></Text>
                <AntDesign
                  name="delete"
                  size={30}
                  color="red"
                  justifyContent="flex-end"
                  onPress={() => {
                    Alert.alert(
                      "Confirmation",
                      "Do you want to delete item listing?",
                      [
                        {
                          text: "Cancel",
                          // onPress: () => console.log("Cancel Pressed"),
                          style: "cancel",
                        },
                        {
                          text: "OK",
                          onPress: () => onPressDelete(responseData.id),
                        },
                      ]
                    );
                  }}
                />
              </View>
            </View>
          ))}
        </ScrollView>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  nextButton: {
    position: "absolute",
    bottom: "40%",
    right: 0,
    top: "40%",
    alignItems: "center",
  },
  closeButton: {
    position: "absolute",
    right: 0,
    top: 0,
  },

  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    margin: 2,
    borderColor: "#CCCCCC",
    borderWidth: 2,
  },
});
