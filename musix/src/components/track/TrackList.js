import React, { Component } from 'react';
import { View, ActivityIndicator, ScrollView, Linking, Text } from 'react-native';
import axios from 'axios';
import qs from 'qs';

import Card from './../common/Card';
import CardSection from './../common/CardSection';
import TrackDetail from './TrackDetail';

class TrackList extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.state.params.albumName,
            headerTitleStyle: {
                alignSelf: 'center'
            }
        };
    }

    state = {
        tracks: [],
        isLoading: true,
        error: ''
    };

    async componentDidMount() {
        const url = this.buildURL(this.props.navigation.state.params.albumMbid);

        try {
            const res = await axios.get(url);
            
            this.setState({ tracks: res.data.album.tracks.track, isLoading: false, error: '' });    
        } catch (error) {
            this.setState({ error: 'Track tidak ditemukan', isLoading: false });
        }
        
    }

    onButtonPlayPress(track) {
        Linking.openURL(track.url);
    }

    buildURL(mbid) {
        const BASE_URL = 'http://ws.audioscrobbler.com/2.0/?';
        const BASE_PARAMS = {
            method: 'album.getinfo',
            api_key: '61f0d9808436391c21bb1dc28893fbcd',
            format: 'json',
            mbid
        };

        const FULL_PARAMS = qs.stringify({ 
            ...BASE_PARAMS
        });

        return BASE_URL + FULL_PARAMS;
    }

    renderTrack() {
        return this.state.tracks.map((track) => {
            return (
                <TrackDetail 
                    key={track.name} 
                    track={track} 
                    onPress={this.onButtonPlayPress.bind(this, track)}
                />
            );
        });
    }

    render() {
        if (this.state.isLoading) {
            return (
                <ActivityIndicator size='large' style={{ alignSelf: 'center', flex: 1 }} />
            );
        }

        if (this.state.error !== '') {
            return (
                <Card>
                    <CardSection>
                        <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center' }}>
                            <Text style={{ fontSize: 20, textAlign: 'center', color: 'red' }}>{this.state.error}</Text>
                        </View>
                    </CardSection>
                </Card>
            );
        }

        return (
            <View>
                <ScrollView>
                    {this.renderTrack()}
                </ScrollView>
            </View>
        );
    }
}

export default TrackList;
