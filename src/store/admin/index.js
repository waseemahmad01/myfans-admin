import { createSlice } from "@reduxjs/toolkit";

const adminUserSlice = createSlice({
  name: "adminUser",
  initialState: {
    data: {
      uid: "",
      email: "",
      name: "",
      photoUrl: {
        url: "",
      },
    },
  },
  reducers: {
    setAdminData(state, action) {
      state.data = action.payload;
    },
  },
});
export const { setAdminData } = adminUserSlice.actions;
export default adminUserSlice.reducer;
