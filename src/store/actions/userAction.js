import {SET_HOME_SCREEN} from '../type';

export const setHomeScreen = () => {
  return dispatch => {
    dispatch({
        type: SET_HOME_SCREEN,
      payload: true,
    })
  }
};
