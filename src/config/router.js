import React from 'react';
import {
  Scene,
  Router,
  ActionConst,
  Tabs,
  Stack,
} from 'react-native-router-flux';

import Splash from '../screens/Splash';
import Main from '../screens/Main';
import Login from '../screens/Login';
import Signup from '../screens/Signup';

const RouterComponent = () => {
  return (
    <Router>
      <Stack key="root">
        <Scene key="splash" hideNavBar component={Splash} />
        <Scene key="signup" hideNavBar component={Signup} />
        <Scene key="login" hideNavBar component={Login} 
				gesturesEnabled={false} panHandlers={null}/>
        <Scene key="main" hideNavBar component={Main} 
        gesturesEnabled={false} panHandlers={null}
				/>

      </Stack>
    </Router>
  );
};

export default RouterComponent;