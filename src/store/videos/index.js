import { createSlice } from "@reduxjs/toolkit";

const videoSlice = createSlice({
  name: "videos",
  initialState: {
    data: [],
  },
  reducers: {
    setVideos(state, action) {
      const users = action.payload;
      const data = [];
      let i = 0;
      users.forEach((user) => {
        i++;
        if (user.videos) {
          user.videos.forEach((video) => {
            const { videos, ...doc } = user;
            data.push({ video, ...doc, sno: i });
            i++;
          });
        }
      });
      state.data = data;
      // console.log(data);
    },
  },
});
export const { setVideos } = videoSlice.actions;
export default videoSlice.reducer;
