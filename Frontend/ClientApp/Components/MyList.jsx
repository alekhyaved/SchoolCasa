import React, { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import { View, Text, ScrollView, FlatList } from "react-native";
import { Button, Image } from "react-native-elements";
import axios from "axios";
import { AntDesign } from "@expo/vector-icons";
export function MyList({ navigation }) {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("http://192.168.0.9:8080/getMyApartmentListings/" + email)
      .then((res) => {
        setData(res.data);
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, [data]);

  return (
    <View style={{ flex: 1, padding: 0 }}>
      {isLoading ? (
        <Text></Text>
      ) : (
        <View>
          <ScrollView>
            <View style={{ flexDirection: "row" }}>
              <Text></Text>
            </View>
            <Text></Text>
            {data.map((responseData) => (
              <View key={responseData.id} style={styles.item}>
                <Image
                  source={{ uri: responseData.imageURL1 }}
                  style={{
                    width: 170,
                    height: 150,
                    borderColor: "grey",
                    borderWidth: 2,
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
                    name="edit"
                    size={30}
                    color="black"
                    justifyContent="flex-end"
                    onPress={() => {
                      navigation.navigate("EditApartmentListing", responseData);
                    }}
                  />
                  <Text></Text>
                  <Text></Text>
                  <AntDesign
                    name="delete"
                    size={30}
                    color="red"
                    justifyContent="flex-end"
                    onPress={() => {
                      // navigation.navigate("EditApartmentListing", responseData);
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
    padding: 10,
    margin: 2,
    borderColor: "#CCCCCC",
    borderWidth: 2,
  },
});
