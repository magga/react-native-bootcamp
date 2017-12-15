import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import { Button } from 'react-native-elements';

import Card from './../common/Card';
import CardSection from './../common/CardSection';

class TrackDetail extends Component {
    render() {
        const {
            name,
            duration
        } = this.props.track;

        return (
            <Card>
                <CardSection>
                    <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center' }}>
                        <Text style={{ fontSize: 20, textAlign: 'center' }}>{name}</Text>
                        <Text style={{ fontSize: 15 }}>{duration} seconds</Text>
                    </View>
                </CardSection>

                <CardSection>
                    <View style={{ flex: 1, alignItems: 'center' }}>
                        <Button 
                            title='Play Song'
                            onPress={this.props.onPress}
                            icon={{ name: 'play-circle-outline' }}
                        />
                    </View>
                </CardSection>
            </Card>
        );
    }
}

export default TrackDetail;
