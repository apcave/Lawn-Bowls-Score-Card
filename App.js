import { NavigationContainer, ActivityIndicator } from "@react-navigation/native"
import React, { useState } from "react"
import {
  SafeAreaView,
  View,
  TextInput,
  Text,
  Pressable,
  FlatList
} from "react-native"
import {AppProvider, UserProvider, RealmProvider} from '@realm/react'

import {appId, baseUrl} from './atlasConfig.json'
import ScoreStack from "./ScoreCard/ScoreHome"

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

export default function App() {
  return (
    <AppProvider id={appId} baseUrl={baseUrl}>
    <UserProvider fallback={WelcomeView}>
    <RealmProvider
          schema={[Item]}
          sync={{
            flexible: true,
            onError: (_session, error) => {
              // Show sync errors in the console
              console.error(error);
            },
          }}
          fallback={LoadingIndicator}>
    <SafeAreaView>
    <NavigationContainer>
      <ScoreStack />
    </NavigationContainer>
    </SafeAreaView>
    </RealmProvider>
    </UserProvider>
    </AppProvider>
  )
}

function LoadingIndicator() {
  return (
    <View style={styles.activityContainer}>
      <ActivityIndicator size="large" />
    </View>
  )
}

class Task extends Realm.Object {
  static generate(description) {
    return {
      _id: new Realm.BSON.ObjectId(),
      description,
      createdAt: new Date()
    }
  }

  static schema = {
    name: "Task",
    primaryKey: "_id",
    properties: {
      _id: "objectId",
      description: "string",
      isComplete: { type: "bool", default: false },
      createdAt: "date"
    }
  }
}

const styles = StyleSheet.create({
  activityContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
});
