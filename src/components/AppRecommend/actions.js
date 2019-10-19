import {
    FETCH_APP_RECOMMEND_START,
    FETCH_APP_RECOMMEND_SUCCESS,
    FETCH_APP_RECOMMEND_FAILURE,
    APP_RECOMMEND_FILTER_APP,
    UPDATE_APP_RECOMMEND,
    UPDATE_APP_RECOMMEND_FILTERED
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

    console.log(`fetchDetail`);

    const {
        topGrossing: {
            apps,
            appsFiltered
        }
    } = getState();
    const {
        data: {
            results
        }
    } = await ApiCaller.itunes.get(ApiRoute.apps.LOOKUP(appId));

    const lookUpApp = results.length > 0 ? results[0] : null;

    const appUpdate = apps.find(app => app.id === appId);
    const appFilteredUpdate = appsFiltered.find(app => app.id === appId);

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

export const filterRecommendApp = (keyword) => async (dispatch, getState) => {

    const checkKeyword = (app) => {
        const substring = keyword;

        if (app.name.toLowerCase().includes(substring.toLowerCase())) {
            return true;
        }
        app.genres.map(category => {
            if (category.name.toLowerCase().includes(substring.toLowerCase())) {
                return true;
            };
        })
        if (app.artistName.toLowerCase().includes(substring.toLowerCase())) {
            return true;
        }
        if (app.description) {
            if (app.description.toLowerCase().includes(substring.toLowerCase())) {
                return true;
            }
        }

        return false;
    }

    const allApps = getState().topGrossing.apps;
    const filteredApps = keyword.length === 0 ? allApps : allApps.filter(checkKeyword);

    dispatch({
        type: APP_RECOMMEND_FILTER_APP,
        value: filteredApps
    });
}
