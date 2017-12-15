import React, { Component } from 'react';
import { View, Text, ScrollView, Image } from 'react-native';
import { Button, Card } from 'react-native-elements';
import { connect } from 'react-redux';
import Expo from 'expo';

class SavedScreen extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Saved Places',
            headerTitleStyle: {
                alignSelf: 'center'
            },
            headerRight: (
                <Button 
                    title='Setting'
                    backgroundColor='rgba(0,0,0,0)'
                    color='rgba(0, 122, 255, 1)'
                    onPress={() => navigation.navigate('setting')}
                />
            )
        };
    }

    onButtonPress(place) {
        this.props.navigation.navigate('detail', { place });
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
        return this.props.likedPlaces.map((place) => {
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
                        title='View On Map'
                        backgroundColor='#f44e03'
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
        likedPlaces: state.likedPlaces
    };
};

export default connect(mapStateToProps)(SavedScreen);
