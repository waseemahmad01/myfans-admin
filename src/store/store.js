import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import user from "./users/index";
import creator from "./creators/index";
import report from "./reports/index";
import admin from "./admins/index";
import creatorRequest from "./creatorRequest/index";
import videos from "./videos";
import gifts from "./gifts";
import adminData from "./admin";

const store = configureStore({
  reducer: {
    user,
    creator,
    report,
    admin,
    creatorRequest,
    videos,
    gifts,
    adminData,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export default store;
