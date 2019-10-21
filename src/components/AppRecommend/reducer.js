import { combineReducers } from "redux";

// types
import {
    FETCH_APP_RECOMMEND_START,
    FETCH_APP_RECOMMEND_SUCCESS,
    FETCH_APP_RECOMMEND_FAILURE,
    UPDATE_APP_RECOMMEND,
} from "./action-types";

function apps(state = [], action) {
    switch (action.type) {
        case FETCH_APP_RECOMMEND_SUCCESS:
            return [...state, ...action.value];
        case UPDATE_APP_RECOMMEND:
            return [...state.map(app =>
                app.id === action.value.id
                    ? { ...app, ...action.value }
                    : app
                )];
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

function error(state = "", action) {
    switch (action.type) {
        case FETCH_APP_RECOMMEND_FAILURE:
            return "無法獲取資料，請檢查你的網絡或稍後重試";
        default:
            return state;
    }
}

export default combineReducers({
    apps,
    error,
    isFetching
});