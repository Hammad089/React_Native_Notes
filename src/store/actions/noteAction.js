import { ADD_NOTE,UPDATE_NOTE,DELETE_NOTE } from "../type";

export const addNote = (data) => {
    const newNote = {...data,id:Date.now()}
    console.log("ADD NOTES",data);
    
    return dispatch => {
        dispatch({
            type:ADD_NOTE,
            payload:newNote
        })
    }
}

export const UpdatedNote = (id, updatedNote) => {
    console.log("id, update", id, updatedNote);
    return dispatch => {
        dispatch({
            type: UPDATE_NOTE,
            payload: { id, updatedNote } 
        });
    };
}

export const DeleteNote = (id) => {
    console.log("Delete the item",id);
    
    return dispatch => {
        dispatch({
            type:DELETE_NOTE,
            payload:id
        })
    }
}