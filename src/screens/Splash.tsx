import React, { useEffect } from 'react';
import {View,Text,} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {signInAPI} from  '../apis/auth';
import { Actions } from 'react-native-router-flux';

import {useSelector, useDispatch} from 'react-redux';
import {setBasicInfo, setJwtToken} from '../reducers/user';

const Splash = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    //read jwt token from asynchonous storage
    //if we have, then signin api!
    init();
  }, [])

  const init = async () => {
    // await AsyncStorage.removeItem('jwtToken')

    console.log('get my string value');
    const jwtToken = await AsyncStorage.getItem('jwtToken')

    if(jwtToken !== null && jwtToken !== "" && jwtToken !== undefined){
      signInAPI({jwt_token: jwtToken}).then(json => {
        if(json.success){
          Actions.main();
          dispatch(setBasicInfo(json.basic));
          dispatch(setJwtToken(json.jwt_token));
        }else{
          alert(json.message);
          AsyncStorage.removeItem('jwtToken')
          Actions.signup();
          return false
        }
      })  
    }else{
      Actions.signup();
    }
  }
    
	return <View><Text>this is splash!</Text></View>
}

//command + d 
export default Splash;