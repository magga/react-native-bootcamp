import _ from 'lodash';
import {
    REHYDRATE
} from 'redux-persist/constants';
import { Alert } from 'react-native';

import {
    LIKE_PLACE,
    CLEAR_LIKED_PLACES
} from './../actions/types';

const INITIAL_STATE = [];

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case REHYDRATE:
            return action.payload.likedPlaces || INITIAL_STATE;
        case LIKE_PLACE:
            {
                const newArray = _.uniqBy([
                    ...state, action.payload
                ], 'id');

                const message = newArray.length === state.length 
                                    ? 'Place already liked' 
                                    : 'Place has been saved';

                Alert.alert(message);
                
                return newArray;
            }
        case CLEAR_LIKED_PLACES:
            Alert.alert('Data berhasil dihapus');
            return INITIAL_STATE;
        default:
            return state;
    }
};
