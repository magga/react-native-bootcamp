import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import { View } from 'react-native';
import Expo from 'expo';

import ArtistList from './src/components/artist/ArtistList';
import AlbumList from './src/components/album/AlbumList';
import TrackList from './src/components/track/TrackList';

class App extends Component {
  render() {
    const MainNavigator = StackNavigator({
      artist: { screen: ArtistList },
      album: { screen: AlbumList },
      track: { screen: TrackList }
    });

    return (
      <View style={{ flex: 1, paddingTop: Expo.Constants.statusBarHeight }}>
        <MainNavigator />
      </View>
    );
  }
}

export default App;
