import { createSlice } from "@reduxjs/toolkit";

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    data: [],
  },
  reducers: {
    setAdmins(state, action) {
      // console.log(action.payload);
      state.data = action.payload;
    },
    updateAdmins(state, action) {
      state.data = state.data.push(action.payload);
    },
  },
});
export const { setAdmins, updateAdmins } = adminSlice.actions;
export default adminSlice.reducer;
