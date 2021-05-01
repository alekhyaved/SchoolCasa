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
import { FontAwesome5 } from "@expo/vector-icons";
import { Zocial, AntDesign } from "@expo/vector-icons";
import axios from "axios";

export default function ItemDetails({ navigation, route }) {
  const [modalId, setModalId] = useState(null);
  const [subject, setSubject] = useState(
    "Reg: #ItemId-" + route.params.id + " #Address-" + route.params.address
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
      <Image
        source={{ uri: route.params.imageURL }}
        style={{
          width: 400,
          height: 300,
          borderColor: "grey",
          borderWidth: 2
        }}
      />
      {/* <View style={{ flex: 1 }}> */}
      <Text style={{ fontSize: 10, fontWeight: "bold" }} />
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
                route.params.address
            );
          }}
          name="directions"
          size={50}
          color="black"
        />
      </View>
      <View
        style={{
          flexDirection: "column",
          flex: 2
        }}
      >
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>
          Price : ${route.params.price}
        </Text>
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>
          Description : {route.params.description}
        </Text>
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>
          Warranty : {route.params.warranty.substring(8)}
        </Text>
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>
          Category : {route.params.category}
        </Text>
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>
          Age : {route.params.age.substring(3) + " years"}
        </Text>
        <Text></Text>
      </View>
      <Text style={{ fontSize: 20, fontWeight: "bold", textAlign: "center" }}>
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
        <Text style={{ fontSize: 40, fontWeight: "bold" }}>{"          "}</Text>
        <Zocial
          name="email"
          size={50}
          color="black"
          // onPress={() => Linking.openURL("sms:" + phone_number)}
          onPress={() => setModalId(route.params.id)}
        />
        {
          <Modal animationType="slide" visible={modalId === route.params.id}>
            <View
              style={{
                backgroundColor: "#ffffff",
                flex: 1,
                padding: 20
              }}
            >
              <Text style={{ fontSize: 20, fontWeight: "bold" }}>Subject:</Text>
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
              <Text style={{ fontSize: 20, fontWeight: "bold" }}>Message:</Text>
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
        {/* </View> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  nextButton: {
    position: "absolute",
    bottom: "40%",
    right: 0,
    top: "40%",
    alignItems: "center"
    // justifyContent: 'center',
  },
  closeButton: {
    position: "absolute",
    right: 0,
    top: 0
  },

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
