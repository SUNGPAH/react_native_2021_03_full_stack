import React, {useState, useEffect} from 'react';
import {View,Text,TextInput, 
  TouchableOpacity, Dimensions, 
  ActivityIndicator} from 'react-native';
import { Actions } from 'react-native-router-flux';
import {postSignUpAPI} from  '../apis/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch} from 'react-redux';
import {setBasicInfo,setJwtToken} from '../reducers/user';

const Signup = (props) => {  
  const dispatch = useDispatch();
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

  const [input, setInput] = useState({
    email: "",
    password: "",
    passwordCheck: "",
    nickName: ""
  });

  const [visibleLoader, setVisibleLoader] = useState(false);

  const onChangeText = (text:string, key:string) => {
    let convertedText = null;
    if(key === "email"){
      convertedText = text.toLowerCase();
    }else{
      convertedText = text
    }
    setInput({
      ...input,
      [key]: convertedText
    })
  }

  const saveJwtTokenToAsync = async (value) => {
    try {
      await AsyncStorage.setItem('jwtToken', value)
    } catch(e) {
      //!!
      console.log(e);
      console.log('????');
    }
  
    console.log('Done.')
  }

  const onPress = () => {
    if(input.password !== input.passwordCheck){
      alert('password check is not same with password');
      return false
    }

    if(input.password.length < 6) {
      alert('password is too short');
      return false
    }

    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const emailResult = re.test(input.email);

    if (!emailResult){
      alert('email is not valid');
    }

    if(input.email === ""){
      alert('email should be inserted');
      return false
    }

    setVisibleLoader(true);

    try{
      postSignUpAPI({email: input.email, 
        password: input.password, 
        nick_name: input.nickName}).then(json => {

          if(json.success){
            dispatch(setBasicInfo(json.basic));
            dispatch(setJwtToken(json.jwt_token));
            saveJwtTokenToAsync(json.jwt_token);
            Actions.main();
          }else{
            alert(json.message);
          }
          setVisibleLoader(false);
        })  
    }
    catch(e){
      setVisibleLoader(false);
    }
  }

	return <View>
    <TextInput
      style={{ height: 40, borderColor: 'red', borderWidth: 1 }}
      onChangeText={txt => onChangeText(txt, 'email')}
      value={input.email}
    />

    <TextInput
      style={{ height: 40, borderColor: 'red', borderWidth: 1 }}
      onChangeText={txt => onChangeText(txt, 'password')}
      value={input.password}
      placeholder="insert password"
      secureTextEntry={true}
    />

    <TextInput
      style={{ height: 40, borderColor: 'red', borderWidth: 1 }}
      onChangeText={txt => onChangeText(txt, 'passwordCheck')}
      value={input.passwordCheck}
      secureTextEntry={true}
    />

    <TextInput
      style={{ height: 40, borderColor: 'red', borderWidth: 1 }}
      onChangeText={txt => onChangeText(txt, 'nickName')}
      value={input.nickName}
      placeholder="nick name"
    />

    <Text>sigup page pageddd!!!</Text>

    <TouchableOpacity
    style={{backgroundColor:'gray'}}
    onPress={onPress}
      >
      <Text>Press Here</Text>
    </TouchableOpacity>

    {visibleLoader &&
      <View style={{position:'absolute', backgroundColor:'rgba(0,0,0,0.2)',
      width:windowWidth, height: windowHeight,
        alignItems: 'center', justifyContent: 'center',
      }}>
        <ActivityIndicator size="large" color="#442dc9" />
      </View>
    }
  </View>
}

//command + d 
export default Signup;