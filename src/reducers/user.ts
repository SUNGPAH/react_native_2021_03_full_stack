export const SET_BASIC_INFO = 'SET_BASIC_INFO' as const;
// export const SET_PRIVACY_INFO = 'SET_PRIVACY_INFO' as const;

export const SET_JWT_TOKEN = "SET_JWT_TOKEN" as const;

export const setBasicInfo = (basic:any) => ({
  type:SET_BASIC_INFO,
  payload: basic
})

export const setJwtToken = (jwtToken:string) => ({
  type:SET_JWT_TOKEN,
  payload: jwtToken
})

type BasicType = {
  user_id: number,
  email: string,
}

type UserInitialType = {
  jwtToken?:string,
  basic?:BasicType,
  privacy:any,
}

//appState
//user.basic
//user.jwtToken

const initialState:UserInitialType = {
  jwtToken: undefined,
  basic:undefined,
};

type UserActionType =
  | ReturnType<typeof setBasicInfo>
  | ReturnType<typeof setJwtToken>

const user = (state:UserInitialType = initialState, action:UserActionType) => {
  switch (action.type) {
    case SET_BASIC_INFO:{
      return {
        ...state,
        basic: action.payload
      }
    }
    case SET_JWT_TOKEN: {
      return {
        ...state,
        jwtToken: action.payload
      }
    }
    default:{      
      return state;
    }
  }
};

export default user;