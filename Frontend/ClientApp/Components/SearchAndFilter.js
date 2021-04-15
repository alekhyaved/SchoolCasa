import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, LogBox } from "react-native";
import { Button, ButtonGroup, Input } from "react-native-elements";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import config from "../config";

export function SearchAndFilter({ navigation }) {
  useEffect(() => {
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
  });

  const buttons = ["Any", "One", "Two", "Three"];
  const [index1, setIndex1] = useState(0);
  const [index2, setIndex2] = useState(0);
  const [address, setAddress] = useState("");
  const [fromPrice, setFromPrice] = useState(0);
  const [toPrice, setToPrice] = useState(0);
  return (
    <ScrollView keyboardShouldPersistTaps="handled">
      <View style={{ flex: 3, padding: 5 }}>
        <View>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              textAlign: "center"
            }}
          >
            Search
          </Text>
          <Text></Text>
          <GooglePlacesAutocomplete
            placeholder="Search with address"
            onPress={(data, details = null) => {
              navigation.navigate("RentalListings", {
                address: data.description,
                bathrooms: 0,
                bedrooms: 0,
                fromPrice: 0,
                toPrice: 0
              });
            }}
            query={{
              key: config.google.API_KEY,
              language: "en"
            }}
          />
        </View>
        <Text></Text>
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            textAlign: "center"
          }}
        >
          Filter
        </Text>
        <Text></Text>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>Bedrooms</Text>
        <ButtonGroup
          onPress={selectedIndex => {
            setIndex2(selectedIndex);
          }}
          selectedButtonStyle={{ backgroundColor: "grey" }}
          selectedIndex={index2}
          buttons={buttons}
          containerStyle={{ height: 60 }}
        />
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>Bathrooms</Text>
        <Text></Text>
        <ButtonGroup
          onPress={selectedIndex => {
            setIndex1(selectedIndex);
          }}
          buttons={buttons}
          containerStyle={{ height: 60 }}
          selectedIndex={index1}
          selectedButtonStyle={{ backgroundColor: "grey" }}
        />
        <Text></Text>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}> Price Range</Text>
        <Input placeholder="$0" onChangeText={value => setFromPrice(value)} />
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>To</Text>
        <Input placeholder="$0" onChangeText={value => setToPrice(value)} />
        <Text></Text>
        <Button
          title="Filter"
          // // color="#ffbf58"
          // backgroundColor="#ffbf58"

          buttonStyle={{
            backgroundColor: "#ffdb58",
            // borderRadius: 60,
            // flex: 1,
            height: 40,
            width: "30%"
          }}
          titleStyle={{
            color: "black",
            fontSize: 20
          }}
          onPress={() => {
            if (isNaN(fromPrice) || isNaN(toPrice)) {
              alert("fromPrice, toPrice should be numbers");
            } else {
              navigation.navigate("RentalListings", {
                address: "",
                bathrooms: index1,
                bedrooms: index2,
                fromPrice: fromPrice,
                toPrice: toPrice
              });
            }
          }}
        />
      </View>
    </ScrollView>
  );
}
