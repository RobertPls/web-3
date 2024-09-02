import { createSlice } from '@reduxjs/toolkit'
import { clearToken } from '../../utilities/TokenUtilities';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    username: ''
  },
  reducers: {
    userLogin: (state, action) => {
      state.username = action.payload;
    },
    userLogout: (state) => {
      clearToken();
      state.username = '';
    }
  },
})

export const { userLogin, userLogout } = userSlice.actions

export default userSlice.reducer