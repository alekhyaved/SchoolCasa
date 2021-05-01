import React, { useState, useEffect } from "react";
import {
  AppRegistry,
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Modal,
  Linking
} from "react-native";
import { Button, Header } from "react-native-elements";
import axios from "axios";
import config from "../config.json";
import { SearchBar } from "react-native-elements";
import { AntDesign, EvilIcons } from "@expo/vector-icons";

export default function ItemList({ navigation, route }) {
  const [items, setData] = useState([]);
  const [newItems, setItem] = useState([]);
  const [search, setSearch] = useState("");
  const [modalId, setModalId] = useState(null);

  useEffect(() => {
    if (search === "") {
      axios
        .get("http://192.168.1.9:8080" + "/itemListing")
        // .get("http://192.168.86.180:8080/itemListing")
        .then(res => {
          setData(res.data);
          setItem(items);
        })
        .catch(error => console.error(error));
    }
  }, [items]);

  const updateSearch = event => {
    setSearch(event.substring(0, 20));

    let data = items.filter(product => {
      return (
        product.productName.toLowerCase().indexOf(search.toLowerCase()) != -1
      );
    });
    setData(data);
  };

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      keyboardShouldPersistTaps="handled"
    >
      <View style={{ flexDirection: "row" }}>
        {/* <Button
                    title="My Listings"
                    buttonStyle={{
                        backgroundColor: "#ffdb58",
                        height: 40,
                        width: "60%"
                    }}
                    titleStyle={{
                        color: "black",
                        fontSize: 15,
                        fontWeight: "bold"
                    }}
                /> */}
        <AntDesign
          name="plussquare"
          size={40}
          color="black"
          style={{
            height: 50,
            width: "10%",
            marginLeft: 15,
            marginTop: 10
          }}
          onPress={() => {
            navigation.push("ItemAddScreen");
          }}
        />
        <SearchBar
          inputStyle={{ backgroundColor: "white", width: "80%" }}
          placeholder="Search Item..."
          onChangeText={updateSearch}
          // onClear={useEffect}
          containerStyle={{
            backgroundColor: "white",
            width: "85%",
            marginLeft: 10
          }}
          value={search}
        />
      </View>

      <ScrollView>
        {items.map(responseData => (
          <View key={responseData.id} style={styles.item}>
            <Image
              source={{ uri: responseData.imageURL }}
              style={{
                width: 170,
                height: 150,
                borderColor: "grey",
                borderWidth: 2
              }}
            />
            <View style={{ flex: 1, padding: 10 }}>
              <Text style={{ fontSize: 22, fontWeight: "bold" }}>
                {responseData.productName}
              </Text>
              <Text style={{ fontSize: 15, fontWeight: "bold" }}>
                {responseData.address}
              </Text>
              <Text></Text>
              <Text></Text>
              <Text
                style={{ fontSize: 18, fontWeight: "bold", color: "green" }}
              >
                ${responseData.price}
              </Text>
              <AntDesign
                onPress={() => {
                  navigation.navigate("ItemDetails", responseData);
                }}
                name="rightcircle"
                size={30}
                color="black"
                style={styles.nextButton}
              />
            </View>
          </View>
        ))}
      </ScrollView>
    </ScrollView>
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
