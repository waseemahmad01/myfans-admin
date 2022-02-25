import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "users",
  initialState: {
    data: [],
  },
  reducers: {
    setUsers(state, action) {
      state.data = action.payload;
    },
  },
});
export const { setUsers } = userSlice.actions;
export default userSlice.reducer;
