import { CHANGE_LANGUAGE } from "../type";

export const changelanguage = (language) => {
    return dispatch => {
        dispatch({
            type:CHANGE_LANGUAGE,
            payload:language
        })
    }
}