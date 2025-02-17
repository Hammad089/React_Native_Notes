import { SET_HOME_SCREEN } from "../type";
const initialState = {
    is_home_screen:false
}

export const userReducer = (state = initialState , action) => {
    switch (action.type) {
        case SET_HOME_SCREEN:
            return {
                ...state,
                is_home_screen:true
            }    
        default:
            return state;
    }
}