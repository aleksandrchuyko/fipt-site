import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  filter: '',
};

export const userlistSlice = createSlice({
  name: 'userlist',
  initialState,
  reducers: {
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
});

export const { setFilter } = userlistSlice.actions;

export const userlistReducer = userlistSlice.reducer;

//selectors
export const getFilter = state => state.userlist.filter;
