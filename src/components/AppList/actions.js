import {
    FETCH_APP_LISTING_START,
    FETCH_APP_LISTING_SUCCESS,
    FETCH_APP_LISTING_FAILURE
} from "./action-types";

import ApiRoute from "../../api/api-route";
import ApiCaller from "../../api/api-caller";

export const fetchFreeApp = () => async (dispatch, getState) => {

    dispatch({
        type: FETCH_APP_LISTING_START
    })

    try {
        const res = await ApiCaller.rss.get(ApiRoute.apps.TOP_FREE);
        const { data: { feed: { results } } } = res;

        dispatch({
            type: FETCH_APP_LISTING_SUCCESS,
            value: results
        })
    } catch (err) {
        dispatch({
            type: FETCH_APP_LISTING_FAILURE,
            value: err
        })
    }

};