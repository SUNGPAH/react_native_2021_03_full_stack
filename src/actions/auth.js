
export const SET_JWT_TOKEN = 'SET_JWT_TOKEN';
export const SET_LOGIN_TYPE = 'SET_LOGIN_TYPE';
export const SET_BASIC = "SET_BASIC";

export const setRegistrationToken = (jwtToken, registrationToken) => {
  return (dispatch) => {
    registerTokenAPI(registrationToken).then(json => {
      console.log(json);
    })
  };
};

