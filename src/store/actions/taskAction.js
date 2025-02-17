import { ADD_TASK } from "../type";
export const SetAddTask = task => {
  console.log("TASK",task);
  
  return dispatch => {
    dispatch({
      type: ADD_TASK,
      payload: {
        id: Date.now(),
        title: task.titleTask, 
        description: task.description, 
        createdAt: new Date().toISOString(),
      },
    });
  };
};
