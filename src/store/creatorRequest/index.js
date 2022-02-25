import { createSlice } from "@reduxjs/toolkit";

const creatorRequestSlice = createSlice({
  name: "users",
  initialState: {
    data: [],
  },
  reducers: {
    setCreatorRequest(state, action) {
      state.data = action.payload;
    },
  },
});
export const { setCreatorRequest } = creatorRequestSlice.actions;
export default creatorRequestSlice.reducer;
