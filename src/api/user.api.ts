import { firestore as db } from '../configs/firebaseConfig';
import { getDoc, doc } from 'firebase/firestore';

export const apiGetUser = async (id: string) => {
  const docRef = doc(db, `users/${id}`);
  const docSnap = await getDoc(docRef);

  console.log(docSnap);

  return docSnap.data() || null;
};
