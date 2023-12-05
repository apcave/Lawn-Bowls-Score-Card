import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import React from 'react';

import ScoreStack from './ScoreCard/ScoreHome';

/* Google account login to https://cloud.mongodb.com/
    https://benestudio.co/mongodb-app-services-react-native/

https://www.npmjs.com/package/@realm/react

const MongoDb = {
  Usersname: "BowlsBowlsBowls",
  Password: "ffqr3q80qVZHy2y4",

  "mongodb+srv://BowlsBowlsBowls:ffqr3q80qVZHy2y4@lawnbowls.abz4cdn.mongodb.net/?retryWrites=true&w=majority"

  FitzroyVictoria
  Vek0wvTgy4gGSG0v

  appservices login --api-key vccmnbvo --private-api-key 41c8a02b-191c-4aef-ac2e-8900e8cccd76
{
    appId: "bowlsdata-xiczj",
    PublicKey: "vccmnbvo"
    PrivateKey: "41c8a02b-191c-4aef-ac2e-8900e8cccd76"
}
}
*/

function App() {
  console.warn('Starting App.');
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <ScoreStack />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;
