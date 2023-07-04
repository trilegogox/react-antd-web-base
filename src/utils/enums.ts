export const enum Role {
  ADMIN = 'admin',
  MOD = 'moderator',
  USER = 'user',
}

export const enum COLLECTION {
  USER = 'users',
  SAILOR = 'sailors',
  SHIP = 'ships',
  SAILOR_CONTRACT = 'sailor_contracts',
  SAILOR_REVIEW = 'sailor_reviews',
  SHIP_OWNER = 'ship_owners'
}

export const enum SAILOR_STATUS {
  ALL = '',
  WAITING = 'waiting',
  ONGOGING = 'ongoing',
  OUTGOING = 'outgoging',
  RETIRED = 'retired'
}

export const enum CONTRACT_TYPE {
  ALL = '',
  PROBATION = 'probation',
  ONE_YEARL = '1-year',
  INDEFINITE = 'indefinite'
}

export const enum CONTRACT_END_TYPE {
  ALL = '',
  ONE_MONTH = '1-month',
  TWO_MONTH = '2-month',
}

export const enum SAILOR_POSITION {
  ALL = '',
  CAPTAINT = 'capt',
  DECK_SAILOR ='deck_sailor',
  MECHANIC_SAILOR ='mechanical sailor',
}