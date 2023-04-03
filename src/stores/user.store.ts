import { createSlice, PayloadAction, Dispatch } from '@reduxjs/toolkit';
import { apiLogin, apiLogout, ggLogin } from '@/api/auth.api';
import { apiGetUser } from '@/api/user.api';
import { LoginParams } from '@/interface/user/login';
import { Locale, UserState } from '@/interface/user/user';
import { createAsyncAction } from './utils';
import { getGlobalState } from '@/utils/common';
import { createToken, parseToken } from '@/utils/token';

const initialState: UserState = {
  ...getGlobalState(),
  ...parseToken(),
  noticeCount: 0,
  locale: (localStorage.getItem('locale')! || 'en_US') as Locale,
  logged: localStorage.getItem('token') ? true : false,
  menuList: [],
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserItem(state, action: PayloadAction<Partial<UserState>>) {
      Object.assign(state, action.payload);
    },
  },
});

export const { setUserItem } = userSlice.actions;

export default userSlice.reducer;

// source async thunk
// export const loginAsync = (payload: LoginParams) => {
//   return async (dispatch: Dispatch) => {
//     const { result, status } = await apiLogin(payload);
//     if (status) {
//       localStorage.setItem('t', result.token);
//       localStorage.setItem('username', result.username);
//       dispatch(
//         setUserItem({
//           logged: true,
//           username: result.username
//         })
//       );
//       return true;
//     }
//     return false;
//   };
// };

// typed wrapper async thunk function demo, no extra feature, just for powerful typings
export const loginAsync = createAsyncAction<LoginParams, boolean>(payload => {
  return async dispatch => {
    const result = await apiLogin(payload);

    console.log(result);

    return await setUserInfo(result, dispatch);
  };
});

//Login with google
export const googleLoginAsync = createAsyncAction(() => {
  return async dispatch => {
    const result = await ggLogin();

    console.log(result);

    return await setUserInfo(result, dispatch);
  };
});

export const logoutAsync = () => {
  return async (dispatch: Dispatch) => {
    const status = await apiLogout();

    if (status) {
      localStorage.removeItem('token');
      dispatch(
        setUserItem({
          noticeCount: 0,
          logged: false,
          userId: undefined,
          username: undefined,
          displayName: undefined,
          role: undefined,
          avatar: undefined,
        }),
      );

      return true;
    }

    return false;
  };
};

const setUserInfo = async (user: any, dispatch: Dispatch) => {
  if (user !== null) {
    const profile = await apiGetUser(user.id);

    console.log(profile);

    createToken({
      userId: user.id,
      username: user.username,
      displayName: user.displayName || profile?.name,
      role: profile?.role,
      avatar: user.avatar || profile?.photoURL,
    });

    dispatch(
      setUserItem({
        logged: true,
        noticeCount: 5,
        userId: user?.id,
        username: user.username,
        displayName: user.displayName || profile?.name,
        role: profile?.role,
        avatar: user.avatar || profile?.photoURL,
      }),
    );

    return true;
  }

  return false;
};
