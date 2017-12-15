import React, { Component } from 'react';
import { View, ActivityIndicator, ScrollView, Text
 } from 'react-native';
import axios from 'axios';
import qs from 'qs';

import Card from './../common/Card';
import CardSection from './../common/CardSection';
import AlbumDetail from './AlbumDetail';

class AlbumList extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.state.params.artistName,
            headerTitleStyle: {
                alignSelf: 'center'
            }
        };
    }

    state = {
        albums: [],
        isLoading: true,
        error: ''
    };

    async componentDidMount() {
        const url = this.buildURL(this.props.navigation.state.params.artistMbid);

        try {
            const res = await axios.get(url);
            
            this.setState({ albums: res.data.topalbums.album, isLoading: false, error: '' });    
        } catch (error) {
            this.setState({ error: 'Album tidak ditemukan', isLoading: false });
        }
    }

    onButtonTrackPress(album) {
        console.log(album);
        this.props.navigation.navigate('track', {
            albumName: album.name,
            albumMbid: album.mbid
        });
    }

    buildURL(mbid) {
        const BASE_URL = 'http://ws.audioscrobbler.com/2.0/?';
        const BASE_PARAMS = {
            method: 'artist.gettopalbums',
            api_key: '61f0d9808436391c21bb1dc28893fbcd',
            format: 'json',
            mbid
        };

        const FULL_PARAMS = qs.stringify({ 
            ...BASE_PARAMS
        });

        return BASE_URL + FULL_PARAMS;
    }

    renderAlbum() {
        return this.state.albums.map((album) => {
            return (
                <AlbumDetail 
                    key={album.mbid} 
                    album={album} 
                    onPress={this.onButtonTrackPress.bind(this, album)}
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
                    {this.renderAlbum()}
                </ScrollView>
            </View>
        );
    }
}

export default AlbumList;
