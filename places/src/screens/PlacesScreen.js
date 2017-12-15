import React, { Component } from 'react';
import { View, Text, ScrollView, Image } from 'react-native';
import { connect } from 'react-redux';
import { Card, Button } from 'react-native-elements';
import Expo from 'expo';

import * as actions from './../actions';

class PlacesScreen extends Component {
    onButtonPress(place) {
        this.props.likePlace(place);
    }

    renderPhoto(photos) {
        let uri = '';
        
        if (photos === undefined) {
            uri = Expo.Asset.fromModule(require('./../../assets/no-image.jpeg')).uri;
        } else {
            const PHOTO_URI = 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=500&key=AIzaSyA8Mr9byZ3ITgJldj7Y_oFQm4Ma1T3WrmQ&photoreference=';
            uri = `${PHOTO_URI}${photos[0].photo_reference}`;
        }

        return (
            <View style={{ flex: 1 }}>
                <Image
                    source={{ uri }}
                    style={{ flex: 1, height: 250 }}
                />
            </View>
        );
    }

    renderPlaces() {
        return this.props.places.map((place) => {
            const {
                name, opening_hours, rating, photos, vicinity, types, id
            } = place;

            return (
                <Card key={id} title={name}>
                    <View style={styles.detailContainerStyle}>
                        <Text style={styles.textStyle}>{opening_hours ? 'OPEN' : 'CLOSED'}</Text>
                        <Text style={styles.textStyle}>{rating}</Text>
                    </View>

                    {this.renderPhoto(photos)}

                    <Text style={{ ...styles.textStyle, marginTop: 15 }}>{vicinity}</Text>

                    <Text style={{ ...styles.textStyle, marginTop: 15 }}>Type :</Text>

                    {types.map((type, i) => {
                        return (
                            <Text style={styles.textStyle} key={i}>{type}</Text>
                        );
                    })}

                    <Button
                        buttonStyle={styles.buttonStyle}
                        title='Like This Place'
                        backgroundColor='#03A9F4'
                        onPress={this.onButtonPress.bind(this, place)}
                    />
                </Card> 
            );
        });
    }

    render() {
        return (
            <ScrollView>
                {this.renderPlaces()}
            </ScrollView>
        );
    }
}

const styles = {
    detailContainerStyle: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 10,
        marginTop: 10
    },
    textStyle: {
        fontStyle: 'italic'
    },
    buttonStyle: {
        marginTop: 10
    }
};

const mapStateToProps = (state) => {
    return {
        places: state.places.results
    };
};

export default connect(mapStateToProps, actions)(PlacesScreen);
