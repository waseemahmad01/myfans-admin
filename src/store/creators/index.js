import { createSlice } from "@reduxjs/toolkit";

const creatorsSlice = createSlice({
  name: "creators",
  initialState: {
    data: [],
  },
  reducers: {
    setCreators(state, action) {
      state.data = action.payload;
    },
  },
});
export const { setCreators } = creatorsSlice.actions;
export default creatorsSlice.reducer;
