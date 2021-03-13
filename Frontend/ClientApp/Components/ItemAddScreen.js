import { StatusBar } from 'expo-status-bar';
import React, {Component} from 'react';
import { StyleSheet, Text, View,Picker,Button, Keyboard } from 'react-native';
import { TextInput } from 'react-native';
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
          imageurl: "https://schoolcasabkt.s3-us-west-2.amazonaws.com/laptop_old.jpeg"
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
              newItem.append("imageurl", this.state.imageurl);

              console.log(newItem.data);
              const configure = {
                  headers: {
                      "content-type": "multipart/form-data"
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
