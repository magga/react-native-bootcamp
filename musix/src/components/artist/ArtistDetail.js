import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import { Button } from 'react-native-elements';

import Card from './../common/Card';
import CardSection from './../common/CardSection';

class ArtistDetail extends Component {
    render() {
        const {
            name,
            image,
            listeners
        } = this.props.artist;

        return (
            <Card>
                <CardSection>
                    <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center' }}>
                        <Text style={{ fontSize: 20 }}>{name}</Text>
                        <Text style={{ fontSize: 15 }}>{listeners} Listeners</Text>
                    </View>
                </CardSection>

                <CardSection>
                    <Image 
                        style={{ height: 300, flex: 1 }}
                        source={{ uri: (image[3])['#text'] }}
                    />
                </CardSection>

                <CardSection>
                    <View style={{ flex: 1, alignItems: 'center' }}>
                        <Button 
                            title='View Albums'
                            onPress={this.props.onPress}
                            icon={{ name: 'music-video' }}
                        />
                    </View>
                </CardSection>
            </Card>
        );
    }
}

export default ArtistDetail;
