import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import { View, Text, ScrollView } from "react-native";
import { Button, Image } from "react-native-elements";
import { Foundation } from "@expo/vector-icons";
import axios from "axios";
import { AntDesign } from "@expo/vector-icons";
import config from "../config.json";
import { Auth } from "aws-amplify";

export default function RecommendationsPage({ navigation }) {
  // {navigation}
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  //exp://192.168.86.180:19000
  // useEffect(() => {
  //   checkUser();
  // }, [])


  useEffect(() => {
    const config = {
      headers: {
        "content-type": "application/json",
        Accept: "application/json"
      }
    };

    axios
      //.get("http://192.168.0.9:8080/showApartmentListing")
      .get(config.BackendUrl +"/getRecommendations/" + email)
      .then(function(response) {
        let data = response.data;
        setData(data);
        // return response;
      })
      .catch(function(error) {})
      .finally(() => setLoading(false));
  }, [data]);

  const populateInteraction = apartmentId => {
    let formData = new FormData();
    formData.append("userEmail", email);
    formData.append("apartmentId", apartmentId);
    const config = {
      headers: {
        Accept: "application/json"
      }
    };
    axios
      .post("http://192.168.0.9:8080" + "/postInteraction", formData, config)
      .then(function(response) {
        return response;
      })
      .then(data => {
        // console.log("success");
      })
      .catch(function(error) {
        //console.log("Error " + JSON.stringify(error));
      });
  };
  return (
    <View style={{ flex: 1, padding: 0 }}>
      {isLoading ? (
        <Text></Text>
      ) : (
        <View>
          <ScrollView>
            <Text></Text>
            <Text style={{ fontSize: 25, fontWeight: "bold" }}>
              {"  "}Recommendations
            </Text>
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
                      populateInteraction(responseData.id);
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
