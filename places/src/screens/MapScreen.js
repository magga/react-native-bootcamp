import React, { Component } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { MapView, Permissions, Location } from 'expo';
import { Button, FormInput } from 'react-native-elements';
import { connect } from 'react-redux';

import * as actions from './../actions';

class MapScreen extends Component {
    state = {
        region: {
            longitude: 106.8249641,
            latitude: -6.1753871,
            longitudeDelta: 0.009,
            latitudeDelta: 0.009
        },
        keyword: '',
        locationGranted: false
    }

    componentDidMount() {
        this.requestPermission();    
    }

    onRegionChangeComplete(region) {
        this.setState({ region });
    }

    onButtonSearchPress() {
        this.props.fetchPlaces(this.state.region, this.state.keyword, () => {
            
        });
    }

    onButtonListPress() {
        this.props.fetchPlaces(this.state.region, this.state.keyword, () => {
            this.props.navigation.navigate('places');
        });
    }

    onChangeText(text) {
        this.setState({ keyword: text });
    }

    async requestPermission() {
        const result = await Permissions.askAsync(Permissions.LOCATION);
        
        if (result.status === 'granted') {
            Location.getCurrentPositionAsync({ enableHighAccuracy: true })
                .then((loc) => {
                    const newLoc = {
                        latitude: loc.coords.latitude,
                        longitude: loc.coords.longitude,
                        latitudeDelta: this.state.region.latitudeDelta,
                        longitudeDelta: this.state.region.longitudeDelta
                    };
                    this.setState({ locationGranted: true, region: newLoc });
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }

    renderMarkers() {
        return this.props.places.map((place) => {
            const {
                id, geometry, name, vicinity
            } = place;

            const coordinate = {
                latitude: geometry.location.lat,
                longitude: geometry.location.lng,
                latitudeDelta: this.state.region.latitudeDelta,
                longitudeDelta: this.state.region.longitudeDelta
            };

            return (
                <MapView.Marker
                    key={id}
                    coordinate={coordinate}
                    title={name}
                    description={vicinity}
                    pinColor='green'
                />
            );
        });
    }

    render() {
        if (!this.state.locationGranted) {
            return (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ textAlign: 'center', marginBottom: 10 }}>Harap izinkan aplikasi mengakses Lokasi</Text>
                    <Button
                        title='Request Permission'
                        icon={{ name: 'location-on' }}
                        onPress={this.requestPermission.bind(this)}
                    />
                </View>
            );
        }

        return (
            <View style={{ flex: 1 }}>
                <MapView 
                    style={{ flex: 1 }}
                    region={this.state.region}
                    onRegionChangeComplete={this.onRegionChangeComplete.bind(this)}
                >
                    <MapView.Marker
                        coordinate={this.state.region}
                        title='Your position'
                        description='Your current position'
                    />

                    {this.renderMarkers()}
                </MapView>

                <View style={styles.formInputContainer}>
                    <FormInput
                        onChangeText={this.onChangeText.bind(this)}
                    />
                </View>

                <View style={styles.buttonContainer}>
                    <Button 
                        title='Search Places'
                        backgroundColor='#009688'
                        icon={{ name: 'search' }}
                        onPress={this.onButtonSearchPress.bind(this)}
                    />

                    <Button 
                        title='View as List'
                        backgroundColor='#ff5252'
                        icon={{ name: 'list' }}
                        onPress={this.onButtonListPress.bind(this)}
                    />
                </View>
            </View>
        );
    }
}

const styles = {
    buttonContainer: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20,
        flexDirection: 'row'
    },
    formInputContainer: {
        position: 'absolute',
        top: 20,
        left: 40,
        right: 40,
        backgroundColor: 'rgba(255,255,255,0.8)'
    }
};

const mapStateToProps = (state) => {
    return {
        places: state.places.results
    };
};

export default connect(mapStateToProps, actions)(MapScreen);
