import React, { Component } from 'react';
import {AppRegistry, FlatList, StyleSheet, Text, View, Image, ScrollView} from 'react-native';
import {Button} from "react-native-elements";
import axios from "axios";

class FlatListItem extends Component {
    render() {
        return (
            <View style={{
                flex: 1,
                flexDirection:'column',
            }}>
                <View style={{
                    flex: 1,
                    flexDirection:'row',
                    backgroundColor: 'white'
                }}>
                    <Image
                        source={{uri: this.props.item.imageURL}}
                        style={{width: 200, height: 200, margin: 5}}
                    >

                    </Image>
                    <View style={{
                        flex: 1,
                        flexDirection:'column',
                        height: 200,
                        padding:10

                    }}>

                        <Text>{this.props.item.productName}</Text>
                        <Text >{this.props.item.address}</Text>
                        <Text>{this.props.item.price}</Text>
                        <Text >{this.props.item.description}</Text>
                        <Text >{this.props.item.warranty}</Text>
                        <Text >{this.props.item.category}</Text>
                        <Text >{this.props.item.age}</Text>
                    </View>
                </View>
                <View style={{
                    height: 1,
                    backgroundColor:'black'
                }}>

                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    flatListItem: {
        color: 'black',
        padding: 10,
        fontSize: 16,
    }
});

export default class ItemList extends Component {

    state = {
        items : [],
        editRequest: false
    };
    //192.168.86.180

    componentDidMount() {
        axios.get("http://192.168.86.180:8080/itemListing").then(response => {
            console.log(response.data)
            this.setState({ items: response.data });

        });

    }
    render() {
        return (

            <View style={{flex: 1, marginTop: 22, padding: 10}}>
                {/*<Button*/}
                {/*    onPress={() => {*/}
                {/*        this.props.navigation.navigate("ItemAddScreen");*/}
                {/*    }}*/}
                {/*    title="Add Item Listing"*/}
                {/*    color="blue"*/}

                {/*/>*/}
                <Button
                    onPress={() => {
                        this.props.navigation.navigate("Home");
                    }}
                    title="Home"
                    // // color="#ffbf58"
                    // backgroundColor="#ffbf58"

                    buttonStyle={{
                        backgroundColor: "#ffdb58",
                        // borderRadius: 60,
                        // flex: 1,
                        height: 30,
                        width: "20%",
                    }}
                    titleStyle={{
                        color: "black",
                        fontSize: 15,
                        fontWeight:"Bold"
                    }}
                />
                <Text> </Text>
                <Button
                    onPress={() => {
                        this.props.navigation.navigate("ItemAddScreen");
                    }}
                    title="+"
                    // // color="#ffbf58"
                    // backgroundColor="#ffbf58"

                    buttonStyle={{
                        backgroundColor: "#ffdb58",
                        // borderRadius: 60,
                        // flex: 1,
                        height: 30,
                        width: "20%",
                    }}
                    titleStyle={{
                        color: "black",
                        fontSize: 30,
                        fontWeight:"Bold"
                    }}
                />
                <Text></Text>

                <FlatList
                    data={this.state.items}
                    renderItem={({item, index})=>{
                        //console.log(`Item = ${JSON.stringify(item)}, index = ${index}`);
                        return (
                            <FlatListItem item={item} index={index}>

                            </FlatListItem>);
                    }}
                    keyExtractor={(item) => item.toString()}
                >
                </FlatList>

            </View>
        );
    }
}
