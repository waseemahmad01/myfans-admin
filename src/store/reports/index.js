import { createSlice } from "@reduxjs/toolkit";

const reportSlice = createSlice({
  name: "reports",
  initialState: {
    data: [],
  },
  reducers: {
    setReports(state, action) {
      state.data = action.payload;
    },
  },
});
export const { setReports } = reportSlice.actions;
export default reportSlice.reducer;
