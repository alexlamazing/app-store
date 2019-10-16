import {
    CLEAR_KEYWORD,
    SET_KEYWORD
} from "./action-types";

function keyword(state = "", action) {
    if (action && action.type === SET_KEYWORD) {
        return action.value;
    }
    if (action && action.type === CLEAR_KEYWORD) {
        return "";
    }
    return state;
}

export default keyword;