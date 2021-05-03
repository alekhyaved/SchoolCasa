import React, {useEffect, useState} from "react";
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps'
import {StyleSheet, Dimensions, ScrollView, Image, View, Text, Animated, TouchableOpacity} from 'react-native'

const {width, height} = Dimensions.get("window");
import {useTheme} from '@react-navigation/native';
import config from '../config';


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
    sjsutextContent: {
        flex: 2,
        // padding: 10,
        // backgroundColor: "rgba(11,81,150,0.45)",
        fontSize: 20,
        fontWeight: 'bold',
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
        backgroundColor: "rgba(44,1,66,0.9)",
    },
    ring: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: "rgba(65,3,71,0.45)",
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
        fontWeight: 'bold',
    },
    plainView: {
        flex: 2,
        position: 'relative',

    },
    mybutton: {
        width: 80,
        paddingHorizontal: 12,
        alignItems: 'center',
        marginHorizontal: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        marginVertical: 20,
        backgroundColor: 'transparent',
    },
});

const Map = ({navigation, route}) => {
    const [marker, setData] = useState([]);
    const theme = useTheme();
    let mapIndex = 0;
    let mapAnimation = new Animated.Value(0);

    useEffect(() => {
        setData(route.params);
        if (marker.length === 0)
            return;
        if (markerRef && markerRef.current && markerRef.current.showCallout) {
            markerRef.current.showCallout();
        }

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
                            latitudeDelta: 0.2,
                            longitudeDelta: 0.2,
                        }, 350
                    );
                }
            }, 10);
        });
    });

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
            outputRange: [0.80, 2, 0.80],
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

    const markerRef = React.useRef(null);
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
                    latitude: config.initialRegion.latitude,
                    longitude: config.initialRegion.longitude,
                    latitudeDelta: config.initialRegion.latitudeDelta,
                    longitudeDelta: config.initialRegion.longitudeDelta
                }}>
                <MapView.Marker
                    ref={markerRef}
                    coordinate={{
                        latitude: config.initialRegion.latitude,
                        longitude: config.initialRegion.longitude,
                    }}
                    calloutOffset={{ x: -8, y: 28 }}
                    calloutAnchor={{ x: 0.5, y: 0.4 }}
                >
                    <MapView.Callout style={styles.plainView} tooltip={false}>
                        <View >
                            <Text style={styles.sjsutextContent} >{config.initialRegion.markerName}</Text>
                        </View>
                    </MapView.Callout>
                </MapView.Marker>

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
                        // const opacityStyle = {
                        //     opacity: interpolations[index].opacity,
                        // };
                        return (
                            <MapView.Marker
                                key={index}
                                coordinate={{
                                    latitude: parseFloat(marker.latitude),
                                    longitude: parseFloat(marker.longitude),
                                }}
                                onPress={(e) => onMarkerPress(e)}>
                                {/*<Animated.View style={[styles.markerWrap, opacityStyle]}>*/}
                                <Animated.View style={[styles.markerWrap]}>
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
                    .map((data, index) => {
                        return (
                            <View style={styles.card} key={index}>
                                <Image
                                    source={{uri: data.imageURL1}}
                                    style={styles.cardImage}
                                />
                                <View style={styles.textContent}>
                                    <Text numberOfLines={1} style={styles.cardaddress}>{data.address}</Text>
                                    <Text numberOfLines={1}
                                          style={styles.cardDescription}>{data.description}</Text>
                                    <View style={styles.button}>
                                        <TouchableOpacity
                                            onPress={() => {
                                                console.log("RentalListingDetails onPress")
                                                navigation.navigate("RentalListingDetails", data);
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
