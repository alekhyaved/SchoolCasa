import { StatusBar } from 'expo-status-bar';
import React, {Component} from 'react';
import { StyleSheet, Text, View,Picker,Button, Keyboard, Image } from 'react-native';
import { TextInput } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from "axios";

class ItemAddScreen extends Component {

    constructor() {
        super();
        this.state = {
            productName: "",
            price: "",
            address: "",
            description: "",
            age: "",
            warranty: "",
            category:"",
            file: "",
            filename: null,
            localUri: null
        };

        this.handleProductNameChange = this.handleProductNameChange.bind(this);
        this.handlePriceChange = this.handlePriceChange.bind(this);
        this.handleAddressChange = this.handleAddressChange.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.handleAgeChange = this.handleAgeChange.bind(this);
        this.handleWarrantyChange = this.handleWarrantyChange.bind(this);
        this.handleCategoryChange = this.handleCategoryChange.bind(this);
        this.submitItemDetails = this.submitItemDetails.bind(this);
    }

    handleProductNameChange = event => {
        this.setState({
            productName: event
        });
    };

    handlePriceChange = event => {
        this.setState({
            price: event
        });
    };

    handleAddressChange = event => {
        this.setState({
            address: event
        });
    };

    handleDescriptionChange = event => {
        this.setState({
            description: event
        });
    };

    handleAgeChange = event => {
        this.setState({
            age: event
        });
    };

    handleWarrantyChange = event => {
        this.setState({
            warranty: event
        });
    };

    handleCategoryChange = event => {
        this.setState({
            category: event
        });
    };

    pickImage = async () => {
        let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();
        if (permissionResult.granted === false) {
            alert("Permission to access camera roll is required!");
            return;
        }
        let pickerResult = await ImagePicker.launchImageLibraryAsync({
            aspect: [4, 3],
        });
        console.log(pickerResult);

        if (pickerResult.cancelled) {
            console.log("user cancelled")
            return;
        }
        let localUri = pickerResult.uri;
        console.log("localUri = " + localUri);
        this.state.localUri = localUri;
        let filename = localUri.split("/").pop();

        this.setState({ ...this.state.filename, filename });
        console.log(filename);
    };


    submitItemDetails = event => {
        console.log("inside submit item top");


        var newItem = new FormData();
        newItem.append("productName", this.state.productName);
        newItem.append("price", this.state.price);
        newItem.append("address", this.state.address);
        newItem.append("description", this.state.description);
        newItem.append("age", this.state.age);
        newItem.append("category", this.state.category);
        newItem.append("warranty", this.state.warranty);

        if (this.state.filename != null) {
            let match = /\.(\w+)$/.exec(this.state.filename);
            let type = match ? `image/${match[1]}` : `image`;
            newItem.append("file", {
                uri: this.state.localUri,
                name: this.state.filename,
                type,
            });
            console.log(newItem);

        } else {
            newItem.append("file", null);
        }


        console.log(newItem.data);
        const configure = {
            headers: {
                "content-type": "multipart/form-data",
                Accept: "application/json",
            }
        };
        //192.168.86.180
        axios
            .post("http://192.168.86.180:8080/postItem", newItem, configure)
            .then(response => {
                console.log("Item : " + JSON.stringify(response));
                // alert("Item Added Successfully");
                this.props.navigation.navigate('Item listings')
                // this.props.history.push("/admin/vehicleList");
            })
            .catch(error => {
                console.log(error);
                alert("Server Error");
            });


        event.preventDefault();
    };


    render()
    {
        return (
            <View style={styles.container}>

                <Text
                    style={{marginTop: 40, marginLeft: 120, fontFamily: "Roboto", fontSize: 20, fontWeight: "bold"}}>Add
                    an Item</Text>
                {/*  Item Add starts here */}
                <TextInput
                    style={{
                        height: 40,
                        borderColor: 'gray',
                        borderWidth: 1,
                        width: 300,
                        marginTop: 20,
                        marginLeft: 30
                    }}
                    placeholder="  Product Name"
                    maxLength={60}
                    onBlur={Keyboard.dismiss}
                    onChangeText={this.handleProductNameChange}
                    value={this.state.productName}
                />
                {/* <br /> */}
                <TextInput
                    style={{
                        height: 40,
                        borderColor: 'gray',
                        borderWidth: 1,
                        width: 300,
                        marginTop: 20,
                        marginLeft: 30
                    }}
                    placeholder="  Price"
                    maxLength={10}
                    onBlur={Keyboard.dismiss}
                    onChangeText={this.handlePriceChange}
                    value={this.state.price}
                />

                {/* <br /> */}
                <TextInput
                    multiline
                    numberOfLines={3}
                    style={{
                        height: 40,
                        borderColor: 'gray',
                        borderWidth: 1,
                        width: 300,
                        marginTop: 20,
                        marginLeft: 30
                    }}
                    placeholder="  Address"
                    maxLength={100}
                    onBlur={Keyboard.dismiss}
                    onChangeText={this.handleAddressChange}
                    value={this.state.address}
                />

                {/* <br /> */}
                <TextInput
                    multiline
                    numberOfLines={3}
                    style={{
                        height: 40,
                        borderColor: 'gray',
                        borderWidth: 1,
                        width: 300,
                        marginTop: 20,
                        marginLeft: 30
                    }}
                    placeholder="  Product Description"
                    maxLength={100}
                    onBlur={Keyboard.dismiss}
                    onChangeText={this.handleDescriptionChange}
                    value={this.state.description}
                />

                <Picker
                    selectedValue={this.state.category}
                    style={{height: 50, width: 150, marginTop: 20, marginLeft: 30}}
                    onValueChange={(itemValue, itemIndex) => this.setState({ category: itemValue })}
                >
                    <Picker.Item label="Category" value="category"/>
                    <Picker.Item label="Furniture" value="furniture"/>
                    <Picker.Item label="Electronics" value="electronics"/>
                    <Picker.Item label="Scooters" value="scooters"/>
                    <Picker.Item label="Miscellaneous" value="Miscellaneous"/>
                </Picker>

                <Picker
                    selectedValue={this.state.warranty}
                    style={{height: 50, width: 150, marginTop: 20, marginLeft: 30}}
                    onValueChange={(itemValue, itemIndex) => this.setState({ warranty: itemValue })}
                >
                    <Picker.Item label="Warranty" value="warranty"/>
                    <Picker.Item label="Yes" value="WarrantyY"/>
                    <Picker.Item label="No" value="WarrantyN"/>
                </Picker>


                <Picker
                    selectedValue={this.state.age}
                    style={{height: 50, width: 200, marginTop: 20, marginLeft: 30}}
                    onValueChange={(itemValue, itemIndex) => this.setState({ age: itemValue })}
                >
                    <Picker.Item label="Age of product" value="productAge"/>
                    <Picker.Item label="1-5years" value="age1"/>
                    <Picker.Item label="6-10years" value="age2"/>
                    <Picker.Item label="11-15years" value="age3"/>
                </Picker>

                <Button title="Pick an image from camera roll"
                        onPress={this.pickImage}
                />
                {/*{image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}*/}

                <View style={{height: 50, width: "60%", marginLeft: 80, marginTop: 20}}>
                    <Button
                        title="Submit"
                        onPress={this.submitItemDetails}
                    />
                </View>

                {/* Item add ends here */}
                <StatusBar style="auto"/>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
        // alignItems: 'center'
        // justifyContent: 'center'
    },
});

export default ItemAddScreen;
