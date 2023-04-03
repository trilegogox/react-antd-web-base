import { LoginParams } from '../interface/user/login';
import { auth } from '../configs/firebaseConfig';
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';

// export const apiLogin = (data: LoginParams) => request<LoginResult>('post', '/user/login', data);
export const apiLogin: any = (data: LoginParams) => {
  return signInWithEmailAndPassword(auth, data.username, data.password)
    .then(response => {
      console.log(response.user);

      return {
        id: response.user.uid,
        username: response.user.email,
        displayName: response.user.displayName,
        avatar: response.user.photoURL,
      };
    })
    .catch(() => {
      return null;
    });
};

export const ggLogin: any = () => {
  const provider = new GoogleAuthProvider();

  provider.setCustomParameters({ prompt: 'select_account' });

  return signInWithPopup(auth, provider)
    .then(response => {
      console.log(response.user);

      return {
        id: response.user.uid,
        username: response.user.email,
        displayName: response.user.displayName,
        avatar: response.user.photoURL,
      };
    })
    .catch(() => {
      return null;
    });
};

export const apiLogout = () => {
  return signOut(auth)
    .then(() => true)
    .catch(() => false);
};
