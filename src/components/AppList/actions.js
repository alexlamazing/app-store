import {
    APP_LISTING_LOAD_MORE_START,
    APP_LISTING_LOAD_MORE_SUCCESS,
    FETCH_APP_LISTING_START,
    FETCH_APP_LISTING_SUCCESS,
    FETCH_APP_LISTING_FAILURE,
    SET_APP_LISTING_PAGE,
    UPDATE_APP_LISTING,
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

        const sortedResults = results.map((app, index) => {
            return {...app, rank: index + 1};
        });

        dispatch({
            type: FETCH_APP_LISTING_SUCCESS,
            value: sortedResults
        })
    } catch (err) {
        dispatch({
            type: FETCH_APP_LISTING_FAILURE,
            value: err
        })
    }

};

export const loadMore = page => async (dispatch, getState) => {
    dispatch({
        type: APP_LISTING_LOAD_MORE_START
    });

    setTimeout(function(){
        dispatch({
            type: SET_APP_LISTING_PAGE,
            value: page
        });
        dispatch({
            type: APP_LISTING_LOAD_MORE_SUCCESS
        });
    }, 1000);
};

export const setPage = (page) => async (dispatch, getState) => {
    dispatch({
        type: SET_APP_LISTING_PAGE,
        value: page
    });
};

export const fetchDetail = (appId) => async (dispatch, getState) => {

    const {
        topFree: {
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
        type: UPDATE_APP_LISTING,
        value: {
            ...appUpdate,
            avgRating: lookUpApp && lookUpApp.averageUserRating
                ? lookUpApp.averageUserRating
                : 0,
            ratingCount: lookUpApp && lookUpApp.userRatingCount
                ? lookUpApp.userRatingCount 
                : 0,
            description: lookUpApp && lookUpApp.description
                ? lookUpApp.description
                : ""
        }
    });
};
