import { combineReducers } from "redux";

// types
import {
    FETCH_APP_LISTING_START,
    FETCH_APP_LISTING_SUCCESS,
    FETCH_APP_LISTING_FAILURE,
    SET_APP_LISTING_LOADED_PAGES,
    SET_APP_LISTING_PAGE,
    UPDATE_APP_LISTING
} from "./action-types";

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

function page(state = 1, action) {
    switch (action.type) {
        case SET_APP_LISTING_PAGE:
            return action.value;
        default:
            return state;
    }
}

function loadedPages(state = [], action) {
    switch (action.type) {
        case SET_APP_LISTING_LOADED_PAGES:
            return action.value;
        default:
            return state;
    }
}

export default combineReducers({
    apps,
    isFetching,
    page,
    loadedPages
});