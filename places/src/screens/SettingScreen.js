import React, { Component } from 'react';
import { View, } from 'react-native';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';

import * as actions from './../actions';

class SettingScreen extends Component {
    static navigationOptions = {
        title: 'Setting',
        headerTitleStyle: {
            alignSelf: 'center'
        }
    }

    render() {
        return (
            <View>
                <Button 
                    title='Reset All Liked Places'
                    large
                    icon={{ name: 'delete-forever' }}
                    backgroundColor='#F44336'
                    buttonStyle={{ marginTop: 10 }}
                    onPress={this.props.clearLikedPlaces}
                />
            </View>
        );
    }
}

export default connect(null, actions)(SettingScreen);
