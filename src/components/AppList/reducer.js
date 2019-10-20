import { combineReducers } from "redux";

// types
import {
    APP_LISTING_FILTER_APP,
    FETCH_APP_LISTING_START,
    FETCH_APP_LISTING_SUCCESS,
    FETCH_APP_LISTING_FAILURE,
    SET_APP_LISTING_LOADED_PAGES,
    SET_APP_LISTING_PAGE,
    UPDATE_APP_LISTING,
    UPDATE_APP_LISTING_FILTERED,
    APP_LISTING_ADD_DETAILS,
    APP_LISTING_LOAD_MORE_START,
    APP_LISTING_LOAD_MORE_SUCCESS
} from "./action-types";

import {
    SET_KEYWORD,
    CLEAR_KEYWORD
} from "../SearchBar/action-types";

function apps(state = [], action) {
    switch (action.type) {
        case FETCH_APP_LISTING_SUCCESS:
            return [...state, ...action.value];
        case UPDATE_APP_LISTING:
            return state.map(app =>
                app.id === action.value.id
                    ? { ...app, ...action.value }
                    : app
            );
        default:
            return state;
    }
}

function isFetching(state = false, action) {
    switch (action.type) {
        case FETCH_APP_LISTING_START:
            return true;
        case FETCH_APP_LISTING_SUCCESS:
            return false;
        case FETCH_APP_LISTING_FAILURE:
            return false;
        default:
            return state;
    }
}

function isLoadingMore(state = false, action) {
    switch (action.type) {
        case APP_LISTING_LOAD_MORE_START:
            return true;
        case APP_LISTING_LOAD_MORE_SUCCESS:
            return false;
        default:
            return state;
    }
}

function page(state = 1, action) {
    switch (action.type) {
        case SET_APP_LISTING_PAGE:
            return action.value;
        case SET_KEYWORD:
        case CLEAR_KEYWORD:
            return 1;
        default:
            return state;
    }
}

function error(state = "", action) {
    switch (action.type) {
        case FETCH_APP_LISTING_FAILURE:
            return "無法獲取資料，請檢查你的網絡或稍後重試";
        default:
            return state;
    }
}

export default combineReducers({
    apps,
    error,
    isFetching,
    isLoadingMore,
    page
});