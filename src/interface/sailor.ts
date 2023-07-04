import { CONTRACT_TYPE, SAILOR_POSITION, SAILOR_STATUS } from "@/utils/enums";
import { Timestamp } from "firebase/firestore";

export interface SailorPassport {
    number: string,
    title: SAILOR_POSITION,
    issuedDate: string,
    expiryDate: string,
    note: string
}

export interface SailorContract {
    id: string,
    sailorId?: string,
    code?: string,
    type?: CONTRACT_TYPE,
    isActive?: boolean,
    startedDate?: string,
    endDate?: string,
    signedDate?: string,
    position?: SAILOR_POSITION,
    shipOwner?: string,
    salary?: number
}

export interface SailorReview {
    id: string,
    sailorId: string,
    reviewer: string,
    ship: string,
    date: string,
    detail: string,
}

export interface SailorInfo {
    id: string,
    name: string,
    birthday: Date,
    phone: string,
    email: string,
    homeTown: string,
    address: string,
    level: string,
    status: SAILOR_STATUS,
    experienceMonth: number,
    nationality: string,
    relative: string,
    relativePhone: string,
    note: string,
    passport: SailorPassport,
    contracts: SailorContract[],
    reviews: SailorReview[],
    createdAt?: Timestamp,
    updatedAt?: Timestamp
}

export interface SailorListItem {
    id: string,
    name: string,
    birthday: Date,
    phone: string,
    email: string,
    homeTown: string,
    status: SAILOR_STATUS,
    position: SAILOR_POSITION | '',
    experienceMonth: number,
    nationality: string,
    contract: string,
    contract_end: string,
}