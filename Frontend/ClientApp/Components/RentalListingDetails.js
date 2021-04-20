import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, Linking } from "react-native";
import { Button, Image } from "react-native-elements";
import Swiper from "react-native-swiper";
import { FontAwesome5 } from "@expo/vector-icons";
import { Zocial, AntDesign } from "@expo/vector-icons";

export default function RentalListingDetails({ navigation, route }) {
  return (
    <View style={{ flex: 1, padding: 4 }}>
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
            {/* {route.params.imageURL1 &&  */}
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
          <Text style={{ fontSize: 30, fontWeight: "bold" }} />
          <View
            style={{
              flexDirection: "row",
              flex: 1
            }}
          >
            <Text style={{ flex: 1, fontSize: 25, fontWeight: "bold" }}>
              {route.params.address}
            </Text>
            <FontAwesome5
              // style={{ flex: 1 }}
              onPress={() => {
                Linking.openURL(
                  "https://www.google.com/maps/dir/?api=1&destination=" +
                    route.params.latitude +
                    "," +
                    route.params.longitude
                );
              }}
              name="directions"
              size={50}
              color="black"
            />
          </View>
          <Text style={{ fontSize: 10, fontWeight: "bold" }} />
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>
            Price : ${route.params.rent}
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
          <Text style={{ fontSize: 12, fontWeight: "bold" }}></Text>
          <Text
            style={{ fontSize: 25, fontWeight: "bold", textAlign: "center" }}
          >
            Contact
          </Text>
          <Text style={{ fontSize: 8, fontWeight: "bold" }}></Text>
          <View
            style={{
              backgroundColor: "#D3D3D3",
              flexDirection: "row",
              justifyContent: "center"
            }}
          >
            <AntDesign name="message1" size={40} color="black" />
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>
              {"                  "}
            </Text>
            <Zocial name="email" size={40} color="black" />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
