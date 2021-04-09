import React, {Component, useEffect, useState} from "react";
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps'
import {StyleSheet, Dimensions, ScrollView, Image, View, Text, Animated, TouchableOpacity} from 'react-native'
import axios from "axios";

const {width, height} = Dimensions.get("window");
import {useTheme} from '@react-navigation/native';

const screen = Dimensions.get("screen");
const CARD_HEIGHT = 220;
const CARD_WIDTH = width * 0.8;
const SPACING_FOR_CARD_INSET = width * 0.1 - 10;


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollView: {
        position: "absolute",
        bottom: 7,
        left: 0,
        right: 0,
        paddingVertical: "10%",
    },
    endPadding: {
        paddingRight: width - CARD_WIDTH,
    },
    card: {
        // padding: 10,
        elevation: 10,
        backgroundColor: "#FFF",
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        marginHorizontal: 10,
        shadowColor: "#000",
        shadowRadius: 5,
        shadowOpacity: 0.3,
        shadowOffset: {x: 2, y: -2},
        height: CARD_HEIGHT,
        width: CARD_WIDTH,
        overflow: "hidden",
    },
    cardImage: {
        flex: 3,
        width: "100%",
        height: "100%",
        alignSelf: "center",
    },
    textContent: {
        flex: 2,
        padding: 10,
    },
    cardaddress: {
        fontSize: 12,
        fontWeight: "bold",
    },
    cardDescription: {
        fontSize: 12,
        color: "#444",
    },
    markerWrap: {
        alignItems: "center",
        justifyContent: "center",
        width: 50,
        height: 50,
    },
    marker: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: "rgba(104,17,150,0.9)",
    },
    ring: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: "rgba(138,5,150,0.45)",
        position: "absolute",
        borderWidth: 1,
        borderColor: "rgba(119,10,150,0.5)",
    },
    button: {
        alignItems: 'center',
        marginTop: 5
    },
    signIn: {
        width: '100%',
        padding: 5,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 3
    },
    textSign: {
        fontSize: 14,
        fontWeight: 'bold'
    },
});

const Map = ({navigation}) => {
    const [isLoading, setLoading] = useState(true);
    const [marker, setData] = useState([]);
    const theme = useTheme();
    let mapIndex = 0;
    let mapAnimation = new Animated.Value(0);


    useEffect(() => {
        axios
            .get("http://192.168.86.180:8080/showApartmentListing")
            .then(res => {
                setData(res.data);
            })
            .catch(error => console.error(error))
            .finally(() => setLoading(false));
    }, []);

    useEffect(() => {
        if (marker.length === 0)
            return;
        console.log("Use Effect called with setLoading = " + marker)
        mapAnimation.addListener(({value}) => {
            let index = Math.floor(value / CARD_WIDTH + 0.3);
            if (index >= marker.length) {
                index = marker.length - 1;
            }
            if (index <= 0) {
                index = 0;
            }
            clearTimeout(regionTimeout);

            const regionTimeout = setTimeout(() => {
                if (mapIndex !== index) {
                    mapIndex = index;
                    const currentMarker = marker[index];
                    let latitude = parseFloat(currentMarker.latitude);
                    let longitude = parseFloat(currentMarker.longitude);
                    _map.current.animateToRegion(
                        {
                            latitude: latitude,
                            longitude: longitude,
                            latitudeDelta: 0.5,
                            longitudeDelta: 0.5,
                        }, 350
                    );
                }
            }, 10);
        });
    }, [marker]);

    const interpolations = marker.map((marker, index) => {
        const inputRange = [
            (index - 1) * CARD_WIDTH,
            index * CARD_WIDTH,
            ((index + 1) * CARD_WIDTH),
        ];

        const scale = mapAnimation.interpolate({
            inputRange,
            outputRange: [1, 2, 1],
            extrapolate: "clamp"
        });
        const opacity = mapAnimation.interpolate({
            inputRange,
            outputRange: [0.35, 1, 0.35],
            extrapolate: "clamp",
        });

        return {scale, opacity};
    });

    const onMarkerPress = (mapEventData) => {
        const markerID = mapEventData._targetInst.return.key;

        let x = (markerID * CARD_WIDTH) + (markerID * 20);
        if (Platform.OS === 'ios') {
            x = x - SPACING_FOR_CARD_INSET;
        }

        _scrollView.current.scrollTo({x: x, y: 0, animated: true});
    }


    const _map = React.useRef(null);
    const _scrollView = React.useRef(null);

    return (
        <View>
            <MapView
                ref={_map}
                style={{height: Dimensions.get('window').height, width: Dimensions.get('window').width}}
                provider={PROVIDER_GOOGLE}
                loadingEnabled={true}
                initialRegion={{
                    latitude: 37.33539213195991,
                    longitude: -121.88246624866937,
                    latitudeDelta: 0.148,
                    longitudeDelta: 0.148
                }}>

                <MapView.Marker
                    coordinate={{
                        latitude: 37.33539213195991,
                        longitude: -121.88246624866937,

                    }}
                image = {require('../assets/sjsu_name.png')}
                    title='San Jose State University'
                    opacity={0.6}
                    

                />
                {marker.filter(e => {
                    return e.longitude !== '' && e.latitude !== ''
                })
                    .map((marker, index) => {
                        const scaleStyle = {
                            transform: [
                                {
                                    scale: interpolations[index].scale,
                                },
                            ],
                        };
                        const opacityStyle = {
                            opacity: interpolations[index].opacity,
                        };
                        return (
                            <MapView.Marker
                                key={index}
                                coordinate={{
                                    latitude: parseFloat(marker.latitude),
                                    longitude: parseFloat(marker.longitude),
                                }}
                                onPress={(e) => onMarkerPress(e)}>
                                <Animated.View style={[styles.markerWrap, opacityStyle]}>
                                    <Animated.View style={[styles.ring, scaleStyle]}/>
                                    <View style={[styles.marker]}/>
                                </Animated.View>
                            </MapView.Marker>
                        );
                    })}
            </MapView>
            <Animated.ScrollView
                ref={_scrollView}
                horizontal
                scrollEventThrottle={1}
                showsHorizontalScrollIndicator={false}
                snapToInterval={CARD_WIDTH + 20}
                snapToAlignment="center"
                style={styles.scrollView}
                contentInset={{
                    top: 0,
                    left: SPACING_FOR_CARD_INSET,
                    bottom: 0,
                    right: SPACING_FOR_CARD_INSET
                }}
                contentContainerStyle={{
                    paddingHorizontal: Platform.OS === 'android' ? SPACING_FOR_CARD_INSET : 0
                }}
                onScroll={Animated.event(
                    [
                        {
                            nativeEvent: {
                                contentOffset: {
                                    x: mapAnimation,
                                }
                            },
                        },
                    ],
                    {useNativeDriver: true}
                )}>
                {marker.filter(e => {
                    return e.longitude !== '' && e.latitude !== ''
                })
                    .map((responseData, index) => {
                        return (
                            <View style={styles.card} key={index}>
                                <Image
                                    source={{uri: responseData.imageURL1}}
                                    style={styles.cardImage}
                                />
                                <View style={styles.textContent}>
                                    <Text numberOfLines={1} style={styles.cardaddress}>{responseData.address}</Text>
                                    <Text numberOfLines={1}
                                          style={styles.cardDescription}>{responseData.description}</Text>
                                    <View style={styles.button}>
                                        <TouchableOpacity
                                            onPress={() => {
                                                console.log("RentalListingDetails onPress")
                                                navigation.navigate("RentalListingDetails", responseData);
                                            }}
                                            style={[styles.signIn, {
                                                borderColor: '#FF6347',
                                                borderWidth: 1
                                            }]}
                                        >
                                            <Text style={[styles.textSign, {
                                                color: '#FF6347'
                                            }]}>View Details</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        )
                    })}

            </Animated.ScrollView>
        </View>
    );
}

export default Map;
