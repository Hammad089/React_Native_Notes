import { ADD_TODO,TOGGLE_TODO_COMPLETION } from "../type";
const initialState = {
  todo: [],
};

export const TodoReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TODO:
      return {
        ...state,
        todo: [...state.todo, {id: Date.now(), TodoItem: action.payload.TodoItem, completed: false}],
      };
    case TOGGLE_TODO_COMPLETION:
      return {
        ...state,
        todo: state.todo.map(item =>
          item.id === action.payload
            ? {...item, completed: !item.completed}
            : item
        ),
      };
    default:
      return state;
  }
};


