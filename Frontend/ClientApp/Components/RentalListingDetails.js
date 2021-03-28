import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, Linking } from "react-native";
import { Button, Image } from "react-native-elements";
import Swiper from "react-native-swiper";

export function RentalListingDetails({ navigation, route }) {
  return (
    <View style={{ flex: 1, padding: 2 }}>
      <ScrollView>
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
                uri: route.params.imageURL1
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
              source={{ uri: route.params.imageURL2 }}
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
                uri: route.params.imageURL3
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
            Availability : {route.params.availableDate.substring(0, 10)}
          </Text>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}></Text>
          <View style={{ flex: 3, padding: 5 }}>
            <Button
              title="Contact"
              buttonStyle={{
                backgroundColor: "#ffdb58"
              }}
              titleStyle={{
                color: "black"
              }}
            />
            <Text />
            <Button
              onPress={() => {
                Linking.openURL(
                  "https://www.google.com/maps/dir/?api=1&destination=" +
                    route.params.longitude +
                    "," +
                    route.params.latitude
                );
              }}
              title="Get Directions"
              titleStyle={{
                color: "black"
              }}
              buttonStyle={{
                backgroundColor: "#ffdb58"
              }}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
