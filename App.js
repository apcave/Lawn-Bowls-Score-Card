import { NavigationContainer } from "@react-navigation/native"
import React from "react"

import ScoreStack from "./ScoreCard/ScoreHome"

export default function App() {
  return (
    //<SafeAreaView style={{ flex: 1 }}>
    <NavigationContainer>
      <ScoreStack />
    </NavigationContainer>
    //</SafeAreaView>
  )
}
