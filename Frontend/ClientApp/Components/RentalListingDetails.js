import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import { View, Text, ScrollView, FlatList, Modal } from "react-native";
import {
  Card,
  ListItem,
  Button,
  Icon,
  Avatar,
  Image,
  Header
} from "react-native-elements";
import Swiper from "react-native-swiper";

export function RentalListingDetails({ navigation, route }) {
  return (
    <View style={{ flex: 1, padding: 2 }}>
      <Swiper
        height={260}
        activeDot={
          <View
            style={{
              backgroundColor: "#000",
              width: 8,
              height: 8,
              borderRadius: 6,
              marginLeft: 3,
              marginRight: 3,
              marginTop: 3,
              marginBottom: 3
            }}
          />
        }
        paginationStyle={{
          bottom: -25
        }}
        showsButtons
      >
        <View>
          <Image
            source={{
              uri:
                "https://mssecarrental.s3.amazonaws.com/Screen+Shot+2020-12-19+at+7.10.11+PM.png"
            }}
            style={{
              width: 400,
              height: 300,
              borderColor: "grey",
              borderWidth: 2
            }}
          />
        </View>
        <View>
          <Image
            source={{ uri: route.params.imageURL }}
            style={{
              width: 400,
              height: 300,
              borderColor: "grey",
              borderWidth: 2
            }}
          />
        </View>
        <View>
          <Image
            source={{
              uri:
                "https://mssecarrental.s3.amazonaws.com/Screen+Shot+2020-12-19+at+7.08.13+PM.png"
            }}
            style={{
              width: 400,
              height: 300,
              borderColor: "grey",
              borderWidth: 2
            }}
          />
        </View>
      </Swiper>
      <View style={{ flex: 1, padding: 2 }}>
        <Text style={{ fontSize: 20, fontWeight: "bold" }} />
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>
          Price : ${route.params.rent}
        </Text>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>
          Address : {route.params.address}
        </Text>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>
          Description : {route.params.description}
        </Text>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>
          Bed/Bath : {route.params.bedrooms}/{route.params.bathrooms}
        </Text>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>
          Availability : {route.params.date}
        </Text>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}></Text>
        <View style={{ flex: 3, padding: 5 }}>
          <Button
            title="Contact"
            buttonStyle={{
              backgroundColor: "#ffdb58",
              // borderRadius: 60,
              // flex: 1,
              height: 40,
              width: "30%"
            }}
            titleStyle={{
              color: "black",
              fontSize: 25,
              fontWeight: "bold"
            }}
          />
        </View>
      </View>
    </View>
  );
}
