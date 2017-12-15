import React, { Component } from 'react';
import { View, ActivityIndicator, TextInput, ScrollView, Alert } from 'react-native';
import firebase from 'firebase';
import { Button } from 'react-native-elements';

import TodoDetail from './TodoDetail';
import CardSection from './../common/CardSection';

class TodoList extends Component {
    state = { todos: [], isLoading: false, item: '' };

    componentWillMount() {
        const ref = firebase.database().ref(`users/${this.props.phone}`);

        ref.on('value', (snapshot) => {
            ref.off();

            const { todos } = snapshot.val();
            
            if (!todos) {
                this.setState({ isLoading: false });
                return;
            }

            this.setState({ todos, isLoading: false });
        });
    }

    onTodoChange(item) {
        this.setState({ item });
    }

    onButtonDonePress(todo) {
        Alert.alert(
            'Done',
            `Already did "${todo.item}" ?`,
            [
                { text: 'OK', onPress: this.deleteTodo.bind(this, todo) },
                { text: 'Cancel', onPress: () => {} }
            ]
        );
    }

    addTodo() {
        if (this.state.item === '') {
            Alert.alert('Harap masukkan todo');
            return;
        }

        this.setState({ isLoading: true });

        const ref = firebase.database().ref(`users/${this.props.phone}`);

        const newTodos = [ 
            ...this.state.todos, 
            {
                id: Math.floor(Math.random() * 8999 + 1000),
                item: this.state.item
            }
        ];

        ref.child('todos').set(newTodos)
            .then(() => {
                Alert.alert('ADD SUCCESS');
                this.setState({ todos: newTodos, item: '', isLoading: false });
            })
            .catch((error) => {
                Alert.alert(error.message);
                this.setState({ isLoading: false });
            });
    }

    deleteTodo(todo) {
        this.setState({ isLoading: true });

        const newTodos = [...this.state.todos];

        const index = newTodos.indexOf(todo);

        newTodos.splice(index, 1);

        const ref = firebase.database().ref(`users/${this.props.phone}`);

        ref.child('todos').set(newTodos)
            .then(() => {
                Alert.alert('DELETE SUCCESS');
                this.setState({ todos: newTodos, item: '', isLoading: false });
            })
            .catch((error) => {
                Alert.alert(error.message);
                this.setState({ isLoading: false });
            });
    }

    renderTodos() {
        return this.state.todos.map((todo) => {
            return (
                <TodoDetail todo={todo} key={todo.id} onPress={this.onButtonDonePress.bind(this, todo)} />
            );
        });
    }

    render() {
        if (this.state.isLoading) {
            return (
                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <ActivityIndicator size='large' />
                </View>
            );
        }

        return (
            <ScrollView style={{ flex: 1 }}>
                <CardSection>
                    <View style={styles.formInputContainer}>
                        <TextInput
                            style={{ height: 40, flex: 3, marginLeft: 10 }}
                            onChangeText={this.onTodoChange.bind(this)}
                            value={this.state.item}
                        />

                        <Button
                            icon={{ name: 'note-add' }}
                            style={{ flex: 1 }}
                            title='Add'
                            onPress={this.addTodo.bind(this)}
                        />
                    </View>
                </CardSection>

                {this.renderTodos()}
            </ScrollView>
        );
    }
}

const styles = {
    formInputContainer: {
        backgroundColor: 'rgba(255,255,255,0.8)',
        flexDirection: 'row',
        flex: 1
    }
};

export default TodoList;
