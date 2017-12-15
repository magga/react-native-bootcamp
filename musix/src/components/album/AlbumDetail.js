import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import { Button } from 'react-native-elements';

import Card from './../common/Card';
import CardSection from './../common/CardSection';

class AlbumDetail extends Component {
    render() {
        const {
            name,
            image,
            playcount
        } = this.props.album;

        return (
            <Card>
                <CardSection>
                    <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center' }}>
                        <Text style={{ fontSize: 20, textAlign: 'center' }}>{name}</Text>
                        <Text style={{ fontSize: 15 }}>{playcount}x played</Text>
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
                            title='View Track List'
                            onPress={this.props.onPress}
                            icon={{ name: 'playlist-play' }}
                        />
                    </View>
                </CardSection>
            </Card>
        );
    }
}

export default AlbumDetail;
