import { firestore as db } from '../configs/firebaseConfig';
import { getDoc, doc } from 'firebase/firestore';
import { COLLECTION } from '@/utils/enums';

export const apiGetUser = async (id: string) => {
  const docRef = doc(db, `${COLLECTION.USER}/${id}`);
  const docSnap = await getDoc(docRef);

  console.log(docSnap);

  return docSnap.data() || null;
};
