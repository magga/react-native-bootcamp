import React from 'react';
import { TextInput, View, Text } from 'react-native';

const Input = ({ label, onChangeText, placeholder, keyboardType, secureTextEntry, value }) => {
    const { inputStyle, labelStyle, containerStyle } = styles;

    return (
        <View style={containerStyle}>
            <Text style={labelStyle}>{label}</Text>
            
            <TextInput
                secureTextEntry={secureTextEntry}
                autoCorrect={false}
                placeholder={placeholder}
                keyboardType={keyboardType}
                onChangeText={onChangeText}
                style={inputStyle}
                value={value}
            />
        </View>
    );
};

const styles = {
    inputStyle: {
        color: '#000',
        paddingRight: 5,
        paddingLeft: 5,
        fontSize: 18,
        flex: 2,
        height: 30
    },
    labelStyle: {
        fontSize: 16,
        paddingLeft: 20,
        flex: 1
    },
    containerStyle: {
        height: 50,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    }
};

export default Input;
