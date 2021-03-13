import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import { View, Text, ScrollView, FlatList } from "react-native";
import {
  Card,
  ListItem,
  Button,
  Icon,
  Avatar,
  Image,
  Header,
  SearchBar,
  ButtonGroup,
  Input
} from "react-native-elements";

export function SearchAndFilter() {
  const buttons = ["Any", "one", "two", "three"];
  return (
    <View style={{ flex: 3, padding: 5 }}>
      <SearchBar placeholder="Type Here..." />
      <Text></Text>
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>Bedrooms</Text>
      <Text></Text>
      <ButtonGroup buttons={buttons} containerStyle={{ height: 60 }} />
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>Bathrooms</Text>
      <Text></Text>
      <ButtonGroup buttons={buttons} containerStyle={{ height: 60 }} />
      <Text></Text>
      <Text style={{ fontSize: 20, fontWeight: "bold" }}> Price Range</Text>
      <Input placeholder="$0" />
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>To</Text>
      <Input placeholder="$0" />
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
      />
    </View>
  );
}
