import {
    APP_LISTING_FILTER_APP,
    FETCH_APP_LISTING_START,
    FETCH_APP_LISTING_SUCCESS,
    FETCH_APP_LISTING_FAILURE,
    SET_APP_LISTING_PAGE,
    UPDATE_APP_LISTING,
    UPDATE_APP_LISTING_FILTERED
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

export const fetchDetail = (appId) => async (dispatch, getState) => {

    const {
        topFree: {
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
        type: UPDATE_APP_LISTING,
        value: {
            ...appUpdate,
            avgRating: lookUpApp && lookUpApp.averageUserRatingForCurrentVersion
                ? lookUpApp.averageUserRatingForCurrentVersion
                : 0,
            ratingCount: lookUpApp && lookUpApp.userRatingCountForCurrentVersion
                ? lookUpApp.userRatingCountForCurrentVersion 
                : 0,
            description: lookUpApp && lookUpApp.description
                ? lookUpApp.description
                : ""
        }
    });

    dispatch({
        type: UPDATE_APP_LISTING_FILTERED,
        value: {
            ...appFilteredUpdate,
            avgRating: lookUpApp && lookUpApp.averageUserRatingForCurrentVersion
                ? lookUpApp.averageUserRatingForCurrentVersion
                : 0,
            ratingCount: lookUpApp && lookUpApp.userRatingCountForCurrentVersion
                ? lookUpApp.userRatingCountForCurrentVersion 
                : 0,
            description: lookUpApp && lookUpApp.description
                ? lookUpApp.description
                : ""
        }
    });
};

export const setPage = (page) => async (dispatch, getState) => {
    dispatch({
        type: SET_APP_LISTING_PAGE,
        value: page
    });
};

export const filterFreeApp = (keyword) => async (dispatch, getState) => {

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

    const allApps = getState().topFree.apps;
    const filteredApps = keyword.length === 0 ? allApps : allApps.filter(checkKeyword);

    dispatch({
        type: APP_LISTING_FILTER_APP,
        value: filteredApps
    });
};
