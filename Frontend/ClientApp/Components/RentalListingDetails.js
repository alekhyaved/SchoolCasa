import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  Linking,
  StyleSheet,
  Keyboard,
  TextInput
} from "react-native";
import Modal from "react-native-modal";
import { Button, Image } from "react-native-elements";
import Swiper from "react-native-swiper";
import { FontAwesome5 } from "@expo/vector-icons";
import { Zocial, AntDesign } from "@expo/vector-icons";
import axios from "axios";

export default function RentalListingDetails({ navigation, route }) {
  const [modalId, setModalId] = useState(null);
  const [subject, setSubject] = useState(
    "Reg: #AptId-" + route.params.id + " #Address-" + route.params.address
  );
  const [Message, setMessage] = useState("");

  const sendMessage = () => {
    let formData = new FormData();
    formData.append("sender", email);
    formData.append("reciever", route.params.email);
    formData.append("subject", subject);
    formData.append("message", Message);
    formData.append("aptId", route.params.id);
    const config = {
      headers: {
        Accept: "application/json"
      }
    };
    axios
      .post("http://192.168.1.9:8080" + "/postMessage", formData, config)
      .then(function(response) {
        return response;
      })
      .then(data => {
        setModalId(null);
        alert("Message Sent Success");
      })
      .catch(function(error) {
        alert("Message Sent Failed");
      });
  };

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
            <Text style={{ fontSize: 40, fontWeight: "bold" }}>
              {"          "}
            </Text>
            <Zocial
              name="email"
              size={50}
              color="black"
              // onPress={() => Linking.openURL("sms:" + phone_number)}
              onPress={() => setModalId(route.params.id)}
            />
            {
              <Modal
                animationType="slide"
                visible={modalId === route.params.id}
              >
                <View
                  style={{
                    backgroundColor: "#ffffff",
                    flex: 1,
                    padding: 20
                  }}
                >
                  <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                    Subject:
                  </Text>
                  <Text></Text>
                  <TextInput
                    onBlur={Keyboard.dismiss}
                    multiline={true}
                    numberOfLines={4}
                    style={{
                      borderStyle: "solid",
                      borderColor: "black",
                      borderWidth: 1,
                      textAlignVertical: "top",
                      padding: 10,
                      fontSize: 15
                    }}
                    value={subject}
                    onChangeText={value => {
                      setSubject(value);
                    }}
                  />
                  <Text></Text>
                  <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                    Message:
                  </Text>
                  <Text></Text>
                  <TextInput
                    onBlur={Keyboard.dismiss}
                    multiline={true}
                    numberOfLines={16}
                    style={{
                      borderStyle: "solid",
                      borderRadius: 10,
                      borderColor: "black",
                      borderWidth: 1,
                      textAlignVertical: "top",
                      padding: 10,
                      fontSize: 15
                    }}
                    value={Message}
                    onChangeText={value => {
                      setMessage(value);
                    }}
                  />
                  <Text></Text>
                  <Button
                    title="Send"
                    buttonStyle={{
                      backgroundColor: "#ffdb58",
                      height: 40,
                      width: "70%",
                      marginLeft: 10
                    }}
                    titleStyle={{
                      color: "black",
                      fontSize: 15
                    }}
                    onPress={() => sendMessage()}
                  />
                  <AntDesign
                    onPress={() => {
                      setModalId(null);
                      setMessage("");
                    }}
                    name="close"
                    size={30}
                    color="black"
                    style={{ position: "absolute" }}
                  />
                </View>
              </Modal>
            }
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>
              {"                  "}
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
