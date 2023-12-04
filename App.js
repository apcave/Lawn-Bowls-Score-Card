import { NavigationContainer } from "@react-navigation/native"
import { AppProvider, UserProvider, RealmProvider } from "@realm/react"
import React from "react"
import { SafeAreaView, View, StyleSheet, ActivityIndicator } from "react-native"

import Item from "./ItemSchema"
import ScoreStack from "./ScoreCard/ScoreHome"
import WelcomeView from "./WelcomeView"
import { appId, baseUrl } from "./atlasConfig"

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
  console.warn("Starting App.")
  return (
    <AppProvider id={atlasMongo.appId} baseUrl={atlasMongo.baseUrl}>
      <UserProvider fallback={WelcomeView}>
        <RealmProvider
          schema={[Item]}
          sync={{
            flexible: true,
            onError: (_session, error) => {
              // Show sync errors in the console
              console.error(error)
            }
          }}
          fallback={LoadingIndicator}
        >
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

const styles = StyleSheet.create({
  activityContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10
  }
})
