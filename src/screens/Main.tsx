import React from 'react';
import {View,Text,TouchableOpacity} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {useSelector} from 'react-redux';

const Main = (props) => {
	const {basic, jwtToken} = useSelector((state:any) => state.user);

	const back = () => {
		Actions.pop();
	}

	if(!basic){
		return <></>
	}

	return <View>
		<Text>{basic.email}</Text>
		<Text>{jwtToken}</Text>
		<TouchableOpacity
			onPress={back}
		>
			<Text>back!</Text>			
		</TouchableOpacity>
		</View>
}

//command + d 
export default Main;