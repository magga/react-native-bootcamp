import React, { Component } from 'react';
import { View } from 'react-native';
import { MapView } from 'expo';

class MapScreen extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.state.params.place.name,
            headerTitleStyle: {
                alignSelf: 'center'
            }
        };
    }

    render() {
        const {
            geometry, name, vicinity
        } = this.props.navigation.state.params.place;

        const region = {
            latitude: geometry.location.lat,
            longitude: geometry.location.lng,
            latitudeDelta: 0.006,
            longitudeDelta: 0.006
        };

        return (
            <View style={{ flex: 1 }}>
                <MapView 
                    style={{ flex: 1 }}
                    region={region}
                >
                    <MapView.Marker
                        coordinate={region}
                        title={name}
                        description={vicinity}
                        pinColor='green'
                    />
                </MapView>
            </View>
        );
    }
}

export default MapScreen;
