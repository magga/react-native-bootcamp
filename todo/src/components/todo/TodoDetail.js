import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-elements';

import Card from './../common/Card';
import CardSection from './../common/CardSection';

class TodoDetail extends Component {
    render() {
        return (
            <Card>
                <CardSection>
                    <View style={{ flex: 1, flexDirection: 'row' }}>
                        <Text
                            style={{ fontSize: 16, color: 'blue', flex: 4 }}
                        >
                            {this.props.todo.item}
                        </Text>

                        <Button
                            icon={{ name: 'done' }}
                            style={{ flex: 1 }}
                            onPress={this.props.onPress}
                        />
                    </View>
                </CardSection>
            </Card>
        );
    }
}

export default TodoDetail;
