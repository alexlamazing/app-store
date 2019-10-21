import {
    FETCH_APP_RECOMMEND_START,
    FETCH_APP_RECOMMEND_SUCCESS,
    FETCH_APP_RECOMMEND_FAILURE,
    UPDATE_APP_RECOMMEND,
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

export const fetchDetail = (appId) => async (dispatch, getState) => {

    const {
        topGrossing: {
            apps,
        }
    } = getState();

    const {
        data: {
            results
        }
    } = await ApiCaller.itunes.get(ApiRoute.apps.LOOKUP(appId));

    const lookUpApp = results.length > 0 ? results[0] : null;

    const appUpdate = apps.find(app => app.id === appId);

    dispatch({
        type: UPDATE_APP_RECOMMEND,
        value: {
            ...appUpdate,
            description: lookUpApp && lookUpApp.description
                ? lookUpApp.description
                : ""
        }
    });
    
}
