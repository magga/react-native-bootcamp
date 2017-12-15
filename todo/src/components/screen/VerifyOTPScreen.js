import React, { Component } from 'react';
import firebase from 'firebase';
import { Text, ActivityIndicator, View, AsyncStorage } from 'react-native';
import { Button } from 'react-native-elements';
import axios from 'axios';

import Card from './../common/Card';
import CardSection from './../common/CardSection';
import Input from './../common/Input';

class VerifyOTPScreen extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.state.params.phone,
            headerTitleStyle: {
                alignSelf: 'center'
            }
        };
    };

    state = { code: '', error: '', isLoading: false };

    async onButtonPress() {
        if (this.state.code === '') {
            this.setState({ error: 'Harap masukkan kode OTP yang dikirim via SMS' });
            return;
        }

        const { phone } = this.props.navigation.state.params;

        const BASE_URL = 'https://us-central1-one-time-password-8b1c9.cloudfunctions.net/verifyOtp';

        this.setState({ error: '', isLoading: true });

        try {
            const res = await axios({
                method: 'POST',
                url: BASE_URL,
                data: {
                    phone,
                    code: this.state.code
                },
                headers: {
                    'content-type': 'application/json'
                }
            });

            this.login(res.data.token);
        } catch (error) {
            this.setState({ error: error.response.data.message, isLoading: false });
        }
    }

    login(token) {
        firebase.auth().signInWithCustomToken(token)
            .then((user) => {
                AsyncStorage.setItem('token', token);
                this.props.navigation.navigate('addTodo', { userId: user.uid });
                
                this.setState({ isLoading: false, code: '' });
            })
            .catch((error) => {
                this.setState({ error: error.message, isLoading: false });
            });
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
                    title='Verify OTP'
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
        return (
            <Card>
                <CardSection>
                    <Input
                        label='OTP Code'
                        placeholder='xxxx'
                        keyboardType='numeric'
                        onChangeText={code => this.setState({ code })}
                        value={this.state.code}
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

export default VerifyOTPScreen;
