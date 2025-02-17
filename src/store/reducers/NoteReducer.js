import {ADD_NOTE, DELETE_NOTE, UPDATE_NOTE} from '../type';
const initialState = {
  notes: [],
};
export const NoteReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_NOTE:
      return {
        ...state,
        notes: [...state.notes, action.payload],
      };
      case UPDATE_NOTE:
        return {
            ...state,
            notes: state.notes.map(note =>
                note.id === action.payload.id
                    ? { ...note, ...action.payload.updatedNote } 
                    : note
            ),
        };
    case DELETE_NOTE:
      return {
        ...state,
        notes: state.notes.filter(notes => notes.id !== action.payload),
      };
    default:
      return state;
  }
};
