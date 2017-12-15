import { combineReducers } from 'redux';

import places from './places_reducer';
import likedPlaces from './like_reducer';

export default combineReducers({
    places,
    likedPlaces
});
