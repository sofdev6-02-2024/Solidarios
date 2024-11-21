import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import userReducer from './slices/userSlice';
import categoryReducer from './slices/categorySlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    category : categoryReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
