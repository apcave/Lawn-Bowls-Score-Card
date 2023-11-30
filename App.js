import { NavigationContainer } from "@react-navigation/native"
import React from "react"

import ScoreStack from "./ScoreCard/ScoreHome"

/* Google account login to https://cloud.mongodb.com/
    https://benestudio.co/mongodb-app-services-react-native/

const MongoDb = {
  Usersname: "BowlsBowlsBowls",
  Password: "ffqr3q80qVZHy2y4",
  IP_Address: "101.176.33.99/32"
}
*/

export default function App() {
  run()

  return (
    //<SafeAreaView style={{ flex: 1 }}>
    <NavigationContainer>
      <ScoreStack />
    </NavigationContainer>
    //</SafeAreaView>
  )
}

const { MongoClient, ServerApiVersion } = require("mongodb")
const uri =
  "mongodb+srv://BowlsBowlsBowls:ffqr3q80qVZHy2y4@lawnbowls.abz4cdn.mongodb.net/?retryWrites=true&w=majority"
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true
  }
})

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect()
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 })
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    )
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close()
  }
}
run().catch(console.dir)
