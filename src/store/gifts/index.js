import { createSlice } from "@reduxjs/toolkit";

const giftSlice = createSlice({
  name: "reports",
  initialState: {
    data: [],
  },
  reducers: {
    setGifts(state, action) {
      state.data = action.payload;
    },
  },
});
export const { setGifts } = giftSlice.actions;
export default giftSlice.reducer;
