import axios from 'axios';
import qs from 'qs';

import {
    FETCH_PLACES,
    LIKE_PLACE,
    CLEAR_LIKED_PLACES
} from './types';

const PLACES_ROOT_URL = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?';

const PLACES_QUERY_PARAMS = {
    radius: '500',
    key: 'AIzaSyA8Mr9byZ3ITgJldj7Y_oFQm4Ma1T3WrmQ'
};

const buildPlacesUrl = (location, keyword) => {
    const params = qs.stringify({ 
        ...PLACES_QUERY_PARAMS, 
        location: `${location.latitude},${location.longitude}`,
        keyword
    });

    return PLACES_ROOT_URL + params;
};

export const fetchPlaces = (region, keyword, callback) => {
    return async (dispatch) => {
        try {
            const url = buildPlacesUrl(region, keyword);
            const response = await axios.get(url);

            console.log(url);

            dispatch({
                type: FETCH_PLACES,
                payload: response.data
            });

            callback();
        } catch (error) {
            console.log(error);   
        }
    };
};

export const likePlace = (place) => {
    return {
        type: LIKE_PLACE,
        payload: place
    };
};

export const clearLikedPlaces = () => {
    return {
        type: CLEAR_LIKED_PLACES
    };
};
