import React, { Component } from 'react';
import { AppRegistry, FlatList, StyleSheet, Text, View, Image } from 'react-native';
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
                        height: 200
                    }}>

                        <Text style={styles.flatListItem}>{this.props.item.productName}</Text>
                        <Text style={styles.flatListItem}>{this.props.item.address}</Text>
                        <Text style={styles.flatListItem}>{this.props.item.price}</Text>
                        <Text style={styles.flatListItem}>{this.props.item.description}</Text>
                        <Text style={styles.flatListItem}>{this.props.item.warranty}</Text>
                        <Text style={styles.flatListItem}>{this.props.item.category}</Text>
                        <Text style={styles.flatListItem}>{this.props.item.age}</Text>
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

    componentDidMount() {
        axios.get("http://10.0.2.2:8080/itemListing").then(response => {
            console.log(response.data)
            this.setState({ items: response.data });

        });

    }
    render() {
        return (
            <View style={{flex: 1, marginTop: 22}}>
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
