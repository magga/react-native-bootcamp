import React, { Component } from 'react';
import { Text, ActivityIndicator, View, AsyncStorage } from 'react-native';
import { Button } from 'react-native-elements';
import axios from 'axios';
import firebase from 'firebase';

import Card from './../common/Card';
import CardSection from './../common/CardSection';
import Input from './../common/Input';

class RequestOTPScreen extends Component {
    static navigationOptions = {
        title: 'Purwadhika Todo App',
        headerTitleStyle: {
            alignSelf: 'center'
        }
    };

    state = { phone: '', error: '', isLoading: false, isCheckingUser: true };

    async componentWillMount() {
        const token = await AsyncStorage.getItem('token');

        if (!token) {
            this.setState({ isCheckingUser: false });
            return;
        }

        firebase.auth().signInWithCustomToken(token)
            .then((user) => {
                this.props.navigation.navigate('addTodo', { userId: user.uid });
                
                this.setState({ isCheckingUser: false, phone: '' });
            })
            .catch((error) => {
                console.log(error);
                this.setState({ isCheckingUser: false });
            });
    }

    async onButtonPress() {
        const { phone } = this.state;

        if (phone.substr(0, 2) !== '08') {
            this.setState({ error: 'Nomor telepon harus diawali dengan 08' });
            return;
        }

        const BASE_URL = 'https://us-central1-one-time-password-8b1c9.cloudfunctions.net/requestOtp';

        this.setState({ error: '', isLoading: true });

        try {
            await axios({
                method: 'POST',
                url: BASE_URL,
                data: {
                    phone
                },
                headers: {
                    'content-type': 'application/json'
                }
            });

            this.props.navigation.navigate('verifyOtp', { phone: this.state.phone });
        } catch (error) {
            this.setState({ error: 'Error connecting to server' });
        }
        
        this.setState({ isLoading: false });
    }

    renderButton() {
        if (this.state.isLoading) {
            return (
                <View style={{ flex: 1, alignItems: 'center' }}>
                    <ActivityIndicator size='large' />
                </View>
            );
        }

        return (
            <View style={{ flex: 1, alignItems: 'center' }}>
                <Button 
                    onPress={this.onButtonPress.bind(this)} 
                    title='Request OTP'
                    icon={{ name: 'stay-current-portrait' }}
                />
            </View>
        );
    }

    renderError() {
        if (this.state.error) {
            return (
                <CardSection>
                    <Text style={styles.errorTextStyle}>
                        {this.state.error}
                    </Text>
                </CardSection>
            );
        }
    }

    render() {
        if (this.state.isCheckingUser) {
            return (
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <ActivityIndicator size='large' />
                </View>
            );
        }

        return (
            <Card>
                <CardSection>
                    <Input
                        label='Phone Number'
                        placeholder='08xxxxxxxxxx'
                        keyboardType='numeric'
                        onChangeText={phone => this.setState({ phone })}
                        value={this.state.phone}
                    />
                </CardSection>

                <CardSection>
                    {this.renderButton()}
                </CardSection>

                {this.renderError()}
            </Card>
        );
    }
}

const styles = {
    errorTextStyle: {
        fontSize: 16,
        alignSelf: 'center',
        color: 'red'
    }
};

export default RequestOTPScreen;
