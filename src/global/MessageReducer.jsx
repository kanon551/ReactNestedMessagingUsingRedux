import { createSlice } from '@reduxjs/toolkit';
import { getComments } from '../api';

const findAndUpdateObject = (obj, id, name, child) => {
  if (obj.id === id) {
    obj.name = name;
    obj.child = child;
    return true;
  }

  if (Array.isArray(obj.child)) {
    for (let i = 0; i < obj.child.length; i++) {
      const childObject = obj.child[i];
      if (findAndUpdateObject(childObject, id, name, child)) {
        return true;
      }
    }
  }

  return false;
};

const deleteObjectById = (arr, id) => {
  for (let i = 0; i < arr.length; i++) {
    const item = arr[i];
    if (item.id === id) {
      arr.splice(i, 1);
      return true;
    }
    if (item.child.length > 0) {
      const childDeleted = deleteObjectById(item.child, id);
      if (childDeleted) {
        return true;
      }
    }
  }
  return false;
};


const messageSlice = createSlice({
  name: "Messages",
  initialState: getComments,
  reducers: {
    addMessage: (state, action) => {
      state.push({
        name: action.payload.name,
        child: action.payload.child,
        id: action.payload.id,
      });
    }, 
    updateMessage: (state, action) => {
      const { id, name, child } = action.payload;
      for (let i = 0; i < state.length; i++) {
        const obj = state[i];
        if (findAndUpdateObject(obj, id, name, child)) {
          return;
        }
      }
    },
    deleteMessage: (state, action) => {
      const { id } = action.payload;
        deleteObjectById(state,id)
    },
  },
});

export const { updateMessage, deleteMessage,addMessage } = messageSlice.actions;
export default messageSlice.reducer;