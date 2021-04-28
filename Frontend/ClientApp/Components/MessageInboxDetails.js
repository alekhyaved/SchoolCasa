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
import { Zocial, AntDesign } from "@expo/vector-icons";
import axios from "axios";

export default function MessageInboxDetails({ navigation, route }) {
  const [modalId, setModalId] = useState(null);
  const [subject, setSubject] = useState(route.params.subject);
  const [Message, setMessage] = useState("");

  const sendMessage = () => {
    let formData = new FormData();
    if (route.params.email != undefined) {
      formData.append("sender", email);
      formData.append("reciever", route.params.email);
      formData.append("subject", subject);
      formData.append("message", Message);
      formData.append("aptId", route.params.id);
    } else {
      formData.append("sender", route.params.reciever);
      formData.append("reciever", route.params.sender);
      formData.append("subject", subject);
      formData.append("message", Message);
      formData.append("aptId", route.params.apartmentId);
    }
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
      });
    //   .catch(function(error) {
    //     alert(error + "Message Sent Failed");
    //   });
  };

  return (
    <View style={{ flex: 1, padding: 4 }}>
      <ScrollView>
        <View style={{ flex: 1, padding: 2 }}>
          <Text style={{ fontSize: 30, fontWeight: "bold" }} />
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>
            User-{route.params.userId}
          </Text>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}></Text>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>Subject:</Text>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>
            ---------------------------------------------------
          </Text>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>
            {route.params.subject}
          </Text>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}></Text>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>Message:</Text>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>
            ---------------------------------------------------
          </Text>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>
            {route.params.message}
          </Text>
          <Text style={{ fontSize: 8, fontWeight: "bold" }}></Text>
          <Button
            title="Reply"
            titleStyle={{
              color: "black",
              fontSize: 20
            }}
            buttonStyle={{
              backgroundColor: "#ffdb58"
            }}
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
        </View>
      </ScrollView>
    </View>
  );
}
