import { firestore as db } from '../../configs/firebaseConfig';
import { getDoc, doc, collection, query, where, getDocs, orderBy, limit, Timestamp } from 'firebase/firestore';
import { COLLECTION, CONTRACT_END_TYPE, SAILOR_POSITION, SAILOR_STATUS } from '@/utils/enums';
import { SailorContract, SailorInfo, SailorReview, SailorListItem } from '@/interface/sailor';
import * as CONSTANTS from '@/utils/constants';
import moment from 'moment';
import { timestampFormat } from '@/utils/common';

export const apiSearchSailor = async (status: SAILOR_STATUS, position: SAILOR_POSITION, vessel: string, contract: string, contractDateFilter: string) => {
  let q = query(collection(db, COLLECTION.SAILOR));
  if (status !== CONSTANTS.ALL) {
    q = query(q, where("status", "==", status));
  }
  if (position !== CONSTANTS.ALL) {
    q = query(q, where("contract.position", "==", position));
  }
  if (vessel !== CONSTANTS.ALL) {
    q = query(q, where("contract.vessel", "==", vessel));
  }
  if (contract !== CONSTANTS.ALL) {
    q = query(q, where("contract.type", "==", contract));
  }
  if (contractDateFilter === CONTRACT_END_TYPE.ONE_MONTH) {
    let date =  moment().add(30, 'days').toDate(); 
    q = query(q, where('contract.end_date', '<=', date));
  } else if (contractDateFilter === CONTRACT_END_TYPE.TWO_MONTH) {
    let date =  moment().add(60, 'days').toDate(); 
    q = query(q, where('contract.end_date', '<=', date));
  }

  q = query(q, orderBy("contract.end_date", "desc"), limit(10));

  const querySnapshot = await getDocs(q);
  let sailors:SailorListItem[] = [];

  querySnapshot.forEach(async (doc) => {
    const contract = await getCurrentContract(doc.id);

    sailors.push({
      id: doc.id,
      name: doc.data().name,
      birthday: doc.data().birthday,
      phone: doc.data().phone,
      email: doc.data().email,
      homeTown: doc.data().home_town,
      status: doc.data().status,
      position: contract.id !== '' ? contract.position || '' : '',
      experienceMonth: doc.data().experience_month,
      nationality: doc.data().nationality,
      contract: doc.data().contract_type,
      contract_end: timestampFormat(doc.data().contract_end),
    });
  });

  return sailors;
}

export const apiGetContractDuedate = async () => {
  let q = query(collection(db, COLLECTION.SAILOR));
  
  let date =  moment().add(60, 'days').date(); 
  q = query(q, where('contract_end', '<=', date));
  
  //Order by name
  q = query(q, orderBy("contract_end", "desc"), orderBy("name"));

  const querySnapshot = await getDocs(q);
  const count = querySnapshot.docs.length;
  let sailors:SailorListItem[] = [];

  querySnapshot.forEach((doc) => {
    
    sailors.push({
      id: doc.id,
      name: doc.data().name,
      birthday: doc.data().birthday,
      phone: doc.data().phone,
      email: doc.data().email,
      homeTown: doc.data().home_town,
      status: doc.data().status,
      position: doc.data().position,
      experienceMonth: doc.data().experience_month,
      nationality: doc.data().nationality,
      contract: doc.data().contract_type,
      contract_end: timestampFormat(doc.data().contract_end),
    });
  });

  return sailors;
}

export const apiGetSailor = async (id: string) => {
  const docRef = doc(db, `${COLLECTION.SAILOR}/${id}`);
  const sailorSnap = await getDoc(docRef);

  //Get contract list
  const contracts = await getSailorContracts(id);

  //Get review list
  const reviews = await getSailorReviews(id);

  const sailorData = sailorSnap.data() || null;
  if (sailorData == null) return null;

  console.log(sailorData);

  const sailorInfo: SailorInfo = {
    id: id,
    name: sailorData.name,
    birthday: sailorData.birthday,
    phone: sailorData.phone,
    email: sailorData.email,
    homeTown: sailorData.home_town,
    address: sailorData.address,
    level: sailorData.level,
    status: sailorData.status,
    experienceMonth: sailorData.experience_month,
    nationality: sailorData.nationality,
    relative: sailorData.relative,
    relativePhone: sailorData.relative_phone,
    note: sailorData.note,
    passport: {
      number: sailorData.passport.number,
      title: sailorData.passport.number,
      issuedDate: sailorData.passport.issued_date,
      expiryDate: sailorData.passport.expiry_date,
      note: sailorData.passport.note,
    },
    contracts: contracts,
    reviews: reviews,
    createdAt: sailorData.createdAt,
    updatedAt: sailorData.updatedAdt
  };
  return sailorInfo;
};

const getCurrentContract = async (sailor: string) => {
  let q = query(collection(db, COLLECTION.SAILOR_CONTRACT));
  q = query(q, where("sailor", "==", sailor), where("is_active", "==", true));

  const querySnapshot = await getDocs(q);
  let contract:SailorContract = {id:''};

  querySnapshot.forEach((doc) => {
    contract = {
      id: doc.id,
      sailorId: sailor,
      code: doc.data().code,
      type: doc.data().contract_type,
      isActive: doc.data().is_active,
      startedDate: doc.data().started_date,
      endDate: doc.data().end_date,
      signedDate: doc.data().signed_date,
      position: doc.data().position,
      shipOwner: doc.data().ship_owner,
      salary: doc.data().salary
    };
  });

  return contract;
}

const getSailorContracts = async (id: string): Promise<SailorContract[]> => {
  const contractsRef = collection(db, COLLECTION.SAILOR_CONTRACT);
  const q = query(contractsRef, where("sailor", "==", id));

  const querySnapshot = await getDocs(q);
  let contracts: SailorContract[] = []; 

  querySnapshot.forEach((doc) => {
    contracts.push({
      id: doc.id,
      sailorId: id,
      code: doc.data().code,
      type: doc.data().contract_type,
      isActive: doc.data().is_active,
      startedDate: doc.data().started_date,
      endDate: doc.data().end_date,
      signedDate: doc.data().signed_date,
      position: doc.data().position,
      shipOwner: doc.data().ship_owner,
      salary: doc.data().salary
    });
  });

  console.log(contracts);
  
  return contracts;
}

const getSailorReviews = async (id: string): Promise<SailorReview[]> => {
  const reviewsRef = collection(db, COLLECTION.SAILOR_REVIEW);
  const q = query(reviewsRef, where("sailor", "==", id));

  const querySnapshot = await getDocs(q);
  let reviews: SailorReview[] = [];

  querySnapshot.forEach((doc) => {
    reviews.push({
      id: doc.id,
      sailorId: id,
      reviewer: doc.data().reviewer,
      ship: doc.data().ship,
      detail: doc.data().detail,
      date: doc.data().date,
    });
  });

  console.log(reviews);
  
  return reviews;
}
