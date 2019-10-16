import {
    CLEAR_KEYWORD,
    SET_KEYWORD
} from "./action-types";

export function setKeyword(keyword) {
    return {
        type: SET_KEYWORD,
        value: keyword
    }
}

export function clearKeyword() {
    return {
        type: CLEAR_KEYWORD
    }
}