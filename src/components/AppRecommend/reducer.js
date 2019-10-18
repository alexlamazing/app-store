import { combineReducers } from "redux";

// types
import {
    FETCH_APP_RECOMMEND_START,
    FETCH_APP_RECOMMEND_SUCCESS,
    FETCH_APP_RECOMMEND_FAILURE
} from "./action-types";

function apps(state = [], action) {
    switch (action.type) {
        case FETCH_APP_RECOMMEND_SUCCESS:
            return [...state, ...action.value];
        default:
            return state;
    }
}

function isFetching(state = false, action) {
    switch (action.type) {
        case FETCH_APP_RECOMMEND_START:
            return true;
        case FETCH_APP_RECOMMEND_SUCCESS:
            return false;
        case FETCH_APP_RECOMMEND_FAILURE:
            return false;
        default:
            return state;
    }
}

export default combineReducers({
    apps,
    isFetching
});