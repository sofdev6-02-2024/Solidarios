import { UserInterface } from '@/utils/interfaces/UserInterfaces';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  userInfo: UserInterface | null;
}

const initialState: UserState = {
  userInfo: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserInfo(state, action: PayloadAction<UserInterface>) {
      state.userInfo = action.payload;
    },
    clearUserInfo(state) {
      state.userInfo = null;
    },
  },
});

export const { setUserInfo, clearUserInfo } = userSlice.actions;
export default userSlice.reducer;
