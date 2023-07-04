import { firestore as db } from '../../configs/firebaseConfig';
import { getDoc, doc, collection, setDoc, runTransaction, getDocs, Timestamp } from 'firebase/firestore';
import { COLLECTION } from '@/utils/enums';
import { SailorContract, SailorInfo, SailorReview } from '@/interface/sailor';
import moment from 'moment';

export const apiCreateSailor = async (sailor: SailorInfo) => {
    let sailorRef = sailor.id === '' ? doc(db, COLLECTION.SAILOR) : doc(db, COLLECTION.SAILOR, sailor.id);

    // const createdAt = sailor.id === '' ? Timestamp.fromDate(new Date()) : sailor.createdAt;
    // const updatedAt = Timestamp.fromDate(new Date());
    
    const {id, createdAt, updatedAt, contracts, reviews, ...docData } = sailor;

    Object.assign(docData, {'updatedAt': Timestamp.fromDate(new Date()) });

    // const docData = {
    //     name: sailor.name,
    //     birthday: sailor.birthday,
    //     phone: sailor.phone,
    //     email: sailor.email,
    //     homeTown: string,
    //     address: string,
    //     level: string,
    //     status: SAILOR_STATUS,
    //     experienceMonth: number,
    //     nationility: string,
    //     relative: string,
    //     relativePhone: string,
    //     note: string,
    //     passport: SailorPassport,
    //     contracts: SailorContract[],
    //     reviews: SailorReview[],
    // };

    await setDoc(sailorRef, docData);

}

export const apiUpdateSailor = async () => {

}

export const apiCreateSailorContract = async (contract: SailorContract) => {
    let contractRef = contract.id === '' ? doc(db, COLLECTION.SAILOR) : doc(db, COLLECTION.SAILOR, contract.id);
    
    const sailorRef = doc(db, `${COLLECTION.SAILOR}/${contract.sailorId}`);
    try {
        await runTransaction(db, async (transaction) => {
          const sailor = await transaction.get(sailorRef);
          if (!sailor.exists()) {
            throw "Sailor does not exist!";
          }
      
        //   const newPopulation = sfDoc.data().population + 1;
          transaction.update(sailorRef, { 'contract_end': contract.endDate, 'contract_type': contract.type });

          transaction.set(contractRef, contract);
        });
        console.log("Transaction successfully committed!");
      } catch (e) {
        console.log("Transaction failed: ", e);
      }

}

export const apiUpdateSailorContract = async () => {

}

export const apiCreateSailorReview = async () => {

}

export const apiUpdateSailorReview = async () => {

}