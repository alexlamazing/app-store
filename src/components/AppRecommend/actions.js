import {
    FETCH_APP_RECOMMEND_START,
    FETCH_APP_RECOMMEND_SUCCESS,
    FETCH_APP_RECOMMEND_FAILURE
} from "./action-types";

import ApiRoute from "../../api/api-route";
import ApiCaller from "../../api/api-caller";

export const fetchGrossingApp = () => async (dispatch, getState) => {
    
    dispatch({
        type: FETCH_APP_RECOMMEND_START
    })

    try {
        const res = await ApiCaller.rss.get(ApiRoute.apps.TOP_GROSSING);
        const { data: { feed: { results } } } = res;

        dispatch({
            type: FETCH_APP_RECOMMEND_SUCCESS,
            value: results
        })
    } catch (err) {
        dispatch({
            type: FETCH_APP_RECOMMEND_FAILURE,
            value: err
        })
    }

};
