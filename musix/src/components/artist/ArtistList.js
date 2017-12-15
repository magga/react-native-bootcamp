import React, { Component } from 'react';
import { View, ActivityIndicator, ScrollView } from 'react-native';
import { FormInput, Button } from 'react-native-elements';
import axios from 'axios';
import qs from 'qs';

import Card from './../common/Card';
import CardSection from './../common/CardSection';
import ArtistDetail from './ArtistDetail';

class ArtistList extends Component {
    static navigationOptions = {
        title: 'Purwadhika Music Database',
        headerTitleStyle: {
            alignSelf: 'center'
        }
    };

    state = {
        artists: [],
        isLoading: false,
        keyword: ''
    };

    async onButtonSearchPress() {
        if (this.state.keyword === '') {
            alert('Nama artist tidak boleh kosong!');
            return;
        }

        const url = this.buildURL(this.state.keyword);

        this.setState({ isLoading: true, artists: [] });

        const res = await axios.get(url);

        this.setState({ artists: res.data.results.artistmatches.artist, isLoading: false });
    }

    onChangeText(text) {
        this.setState({ keyword: text });
    }

    buildURL(keyword) {
        const BASE_URL = 'http://ws.audioscrobbler.com/2.0/?';
        const BASE_PARAMS = {
            method: 'artist.search',
            api_key: '61f0d9808436391c21bb1dc28893fbcd',
            format: 'json'
        };

        const FULL_PARAMS = qs.stringify({ 
            ...BASE_PARAMS, 
            artist: keyword
        });

        return BASE_URL + FULL_PARAMS;
    }

    onButtonAlbumPress(artist) {
        this.props.navigation.navigate('album', {
            artistName: artist.name,
            artistMbid: artist.mbid
        });
    }

    renderArtist() {
        return this.state.artists.map((artist) => {
            return (
                <ArtistDetail 
                    key={artist.mbid} 
                    artist={artist} 
                    onPress={this.onButtonAlbumPress.bind(this, artist)}
                />
            );
        });
    }

    renderButton() {
        if (this.state.isLoading) {
            return (
                <ActivityIndicator size='large' style={{ alignSelf: 'center' }} />
            );
        }

        return (
            <Button 
                title='Search'
                icon={{ name: 'search' }}
                onPress={this.onButtonSearchPress.bind(this)}
            />
        );
    }

    render() {
        return (
            <View>
                <ScrollView>
                <Card>
                    <CardSection>
                        <View style={{ flexDirection: 'column', flex: 1 }}>
                            <FormInput 
                                onChangeText={this.onChangeText.bind(this)}
                                placeholder='Insert Artist name here...'
                            />
                            
                            {this.renderButton()}
                        </View>
                    </CardSection>
                </Card>

                {this.renderArtist()}
                </ScrollView>
            </View>
        );
    }
}

export default ArtistList;
