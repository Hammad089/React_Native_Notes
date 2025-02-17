import {ADD_TODO,TOGGLE_TODO_COMPLETION} from '../type';
export const addTodo = data => {
  console.log("TODO",data);
  
  return dispatch => {
    dispatch({
      type: ADD_TODO,
      payload: data,
    });
  };
};
export const toggleTodoCompletion = (taskId) => {
  return dispatch => {
    dispatch({
      type:TOGGLE_TODO_COMPLETION,
      payload:taskId
    })
  }
}