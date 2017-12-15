import React, { Component } from 'react';
import { BackHandler, Alert, AsyncStorage } from 'react-native';
import { Button } from 'react-native-elements';
import firebase from 'firebase';

import TodoList from './../todo/TodoList';

class AddTodoScreen extends Component {
    static navigationOptions = ({ navigation }) => {
        const logout = () => {
            Alert.alert(
                'Logout',
                'Are you sure?',
                [
                    { 
                        text: 'OK', 
                        onPress: () => {
                            console.log('Masuk');
                            firebase.auth().signOut()
                                .then((user) => {
                                    console.log(navigation);
                                    AsyncStorage.removeItem('token');
                                    navigation.goBack();
                                })
                                .catch((err) => {
                                    console.log('Masuk 3');
                                    console.log(err);
                                });
                        }
                    },
                    { text: 'Cancel', onPress: () => {} }
                ]
            );
        };

        return {
            title: `Logged in as ${navigation.state.params.userId}`,
            headerTitleStyle: {
                alignSelf: 'center'
            },
            headerLeft: null,
            headerRight: (
                <Button 
                    title='Logout' 
                    onPress={() => logout()} 
                    backgroundColor='rgba(0,0,0,0)'
                    color='rgba(0, 122, 255, 1)'
                />
            )
        };
    };

    componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', () => {
            return true;
        });
    }

    render() {
        return (
            <TodoList phone={this.props.navigation.state.params.userId} />
        );
    }
}

export default AddTodoScreen;
