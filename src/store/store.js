import { applyMiddleware, combineReducers, createStore } from "redux";
import { createLogger } from "redux-logger";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";
import thunk from "redux-thunk";

// import reducers
import searchReducer from "../components/SearchBar/reducer";

const logger = createLogger();

const getMiddleware = () => {
    if (process.env.NODE_ENV === "production") {
        return applyMiddleware(thunk);
    } else {
        // Enable additional logging in non-production environments
        return applyMiddleware(thunk, logger)
    }
};

export const store = createStore(combineReducers({
    keyword: searchReducer
}), composeWithDevTools(getMiddleware()));