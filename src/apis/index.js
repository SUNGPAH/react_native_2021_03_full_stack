import {APP_API_PATH} from '../Constant';
import store from '../config/store';
//access the value here..!
export const getToken = () => {
  let jwtToken 
  try{
    jwtToken = store.getState().user.jwtToken
  }catch(e){
    jwtToken = null
  }

  return jwtToken
}

export const request = async(options, headerData, contentType) => {
  let headers = new Headers({})
  if(contentType === "image"){
  }else{
    headers.append("Content-Type", "application/json");
  }

  let bearer = null;

  const jwtToken = getToken()

  if(jwtToken) {
    bearer = 'Bearer ' + jwtToken;
    headers.append('Authorization', bearer);
  } 
    
  const defaults = {headers: headers};
  options = Object.assign({}, defaults, options);

  return await fetch(APP_API_PATH + options.url, options)
    .then(response =>
      response.json().then(json => {
        if(!response.ok) {
          return Promise.reject(json);
        }
        return json;
      })
    )
    .catch(e => {
      console.log(e);
    })
}