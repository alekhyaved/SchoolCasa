import React, { Component } from 'react';
import {AppRegistry, FlatList, StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, Dimensions,Modal} from 'react-native';
import {Button, Header} from "react-native-elements";
import axios from "axios";
import { SearchBar } from 'react-native-elements';
import { AntDesign, EvilIcons } from '@expo/vector-icons';


export default class ItemList extends Component {

    state = {
        items : [],
        editRequest: false,
        search: '',
        show: false,

    };
    //192.168.86.180

    updateSearch = (event) => {
        console.log("updatesearch");
        this.setState({search: event.substring(0,20) });
    };

    componentDidMount() {
        axios.get("http://192.168.86.180:8080/itemListing").then(response => {
            console.log(response.data)
            this.setState({ items: response.data });
        });
    }

    render() {
        const { search } = this.state;
        let data= this.state.items.filter(
                (product) => {
                    return product.productName.toLowerCase().indexOf(this.state.search.toLowerCase())!= -1;
                }
            )

        return (
            <ScrollView contentContainerStyle={{flexGrow: 1}}
                        keyboardShouldPersistTaps='handled'>

                <View style={{ flexDirection: "row" }}>

                    <Button
                        onPress={() => {
                            navigation.navigate("Home");
                        }}
                        title="Home"
                        // // color="#ffbf58"
                        // backgroundColor="#ffbf58"

                        buttonStyle={{
                            backgroundColor: "#ffdb58",
                            // borderRadius: 60,
                            // flex: 1,
                            left:0,
                            height: 40,
                            width: "60%"
                        }}
                        titleStyle={{
                            color: "black",
                            fontSize: 15,
                            fontWeight: "Bold"
                        }}
                    />

                    <Button
                        // onPress={() => {
                        //     navigation.navigate("ItemAddScreen");
                        // }}
                        title="My Listings"
                        // // color="#ffbf58"
                        // backgroundColor="#ffbf58"

                        buttonStyle={{
                            backgroundColor: "#ffdb58",
                            // borderRadius: 60,
                            // flex: 1,
                            height: 40,
                            width: "60%"
                        }}
                        titleStyle={{
                            color: "black",
                            fontSize: 15,
                            fontWeight: "Bold"
                        }}
                    />

                    <Button
                        onPress={() => {
                            navigation.navigate("ItemAddScreen");
                        }}
                        title="+"
                        // // color="#ffbf58"
                        // backgroundColor="#ffbf58"

                        buttonStyle={{
                            backgroundColor: "#ffdb58",
                            // borderRadius: 60,
                            // flex: 1,
                            right:0,
                            height: 40,
                            width: "70%"
                        }}
                        titleStyle={{
                            color: "black",
                            fontSize: 30,
                            fontWeight: "Bold"
                        }}
                    />
                  {/*<SearchBar*/}
                    {/*    inputStyle={{backgroundColor: 'white'}}*/}
                    {/*    placeholder="Search Item..."*/}
                    {/*    onChangeText={this.updateSearch}*/}
                    {/*    containerStyle={{backgroundColor: 'white'}}*/}
                    {/*    value={search}*/}


                    {/*/>*/}
                </View>

                {/*<Header style ={styles.headerStyle}*/}
                {/*        backgroundColor = "#ffdb58"*/}
                {/*        placement="left"*/}
                {/*        centerComponent={{*/}
                {/*            text: "+",*/}
                {/*            textColor : "fff",*/}
                {/*            color: "#fff",*/}
                {/*            size:"70",*/}
                {/*            onPress: () => {*/}
                {/*                this.props.navigation.navigate("ItemAddScreen");*/}
                {/*            }*/}
                {/*        }}*/}

                {/*        leftComponent={{*/}
                {/*            icon: "home",*/}
                {/*            color: "#111111",*/}
                {/*            onPress: () => {*/}
                {/*                this.props.navigation.navigate("Home");*/}
                {/*            }*/}
                {/*        }}*/}

                {/*        rightComponent={{*/}
                {/*            icon: "settings",*/}
                {/*            color: "#fff",*/}
                {/*            // onPress: () => {*/}
                {/*            //     this.props.navigation.navigate("Menu");*/}
                {/*            // }*/}
                {/*        }} />*/}
                {/*, borderWidth: 1, borderRadius: 5*/}





                <SearchBar
                    inputStyle={{backgroundColor: 'white'}}
                    placeholder="Search Item..."
                    onChangeText={this.updateSearch}
                    containerStyle={{backgroundColor: 'white'}}
                    value={search}


                />

            <ScrollView>
            {/*    data={this.state.items.filter(*/}
            {/*    (product) => {*/}
            {/*        return product.productName.indexOf(this.state.search)!= -1;*/}
            {/*    }*/}
            {/*)}*/}

            {data.map(responseData => (
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
                            <Text style={{ fontSize: 18, fontWeight: "bold", color: "green" }}>
                                ${responseData.price}
                            </Text>
                            {/*<AntDesign*/}
                            {/*    onPress={() => this.props.navigation.navigate("Item Details", {*/}
                            {/*        itemDescription : responseData.description,*/}
                            {/*        itemWarranty    : responseData.warranty,*/}
                            {/*        itemCategory    : responseData.category,*/}
                            {/*        itemAge         : responseData.age,*/}
                            {/*        itemOwner       : '9999999999',*/}

                            {/*    })}*/}
                            {/*    name="rightcircle" size={30} color="black" style = {styles.nextButton} />*/}
                            <AntDesign onPress={()=> {this.setState(({show:true}))}} name="rightcircle" size={30} color="black" style = {styles.nextButton}/>
                            {/*<Button title = "show" onPress={()=> {this.setState(({show:true}))}}/>*/}
                            <Modal transparent={true} visible={this.state.show} >
                                <View style={{backgroundColor:"#000000aa", flex:1}}>
                                    <View style={{backgroundColor:"#ffffff",margin:50,padding:40,borderRadius:10,flex:1}}>
                                        <Image
                                            source={{ uri: responseData.imageURL }}
                                            style={{
                                                width: "100%",
                                                height: "50%",
                                                borderColor: "black",
                                                borderWidth: 0


                                            }}
                                        />
                                        <Text></Text>
                                        <Text style={{ fontSize: 18, fontWeight: "bold"}}>
                                            Price : ${responseData.price}
                                        </Text>

                                       <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                                        Address : {responseData.address}
                                       </Text>
                                        <Text style={{ fontSize: 18, fontWeight: "bold" }}>Description : {responseData.description}</Text>
                                        <Text style={{ fontSize: 18, fontWeight: "bold" }}>Warranty : {responseData.warranty.substring(8)}</Text>
                                        <Text style={{ fontSize: 18, fontWeight: "bold" }}>Category : {responseData.category}</Text>
                                        <Text style={{ fontSize: 18, fontWeight: "bold" }}>Age : {responseData.age.substring(3) + " years"}</Text>
                                        <AntDesign onPress={()=> {this.setState(({show:false}))}} name="close" size={30} color="black" style = {styles.closeButton}/>

                                    </View>
                                </View>

                            </Modal>

                        </View>


                    </View>
                ))}
    </ScrollView>

            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({

    nextButton: {
        position: 'absolute',
        bottom:"40%",
        right:0,
        top:"40%",
        alignItems: "center",
        // justifyContent: 'center',

    },
    closeButton: {
        position: 'absolute',
        right:0,
        top:0,
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
