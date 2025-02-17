import { ADD_TASK } from '../type';

const initialState = {
  task: [],
};

export const TaskReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TASK:
      return {
        ...state,
        task: [
          ...state.task,
          {
            id: action.payload.id,
            title: action.payload.title, 
            description: action.payload.description, 
            createdAt: action.payload.createdAt, 
          },
        ],
      };
    default:
      return state;
  }
};
