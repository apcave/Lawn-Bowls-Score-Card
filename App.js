import { NavigationContainer } from "@react-navigation/native"
import { Realm, RealmProvider, useRealm, useQuery } from "@realm/react"
import React, { useState } from "react"
import {
  SafeAreaView,
  View,
  TextInput,
  Text,
  Pressable,
  FlatList
} from "react-native"

import ScoreStack from "./ScoreCard/ScoreHome"

/* Google account login to https://cloud.mongodb.com/
    https://benestudio.co/mongodb-app-services-react-native/

https://www.npmjs.com/package/@realm/react

const MongoDb = {
  Usersname: "BowlsBowlsBowls",
  Password: "ffqr3q80qVZHy2y4",
  IP_Address: "101.176.33.99/32"

  "mongodb+srv://BowlsBowlsBowls:ffqr3q80qVZHy2y4@lawnbowls.abz4cdn.mongodb.net/?retryWrites=true&w=majority"

  FitzroyVictoria
  Vek0wvTgy4gGSG0v
}
*/

export default function App() {
  return (
    //<SafeAreaView style={{ flex: 1 }}>
    <NavigationContainer>
      <ScoreStack />
    </NavigationContainer>
    //</SafeAreaView>
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

function AppWrapper() {
  return (
    <RealmProvider schema={[Task]}>
      <TaskApp />
    </RealmProvider>
  )
}

function TaskApp() {
  const realm = useRealm()
  const tasks = useQuery(Task)
  const [newDescription, setNewDescription] = useState("")

  return (
    <SafeAreaView>
      <View
        style={{ flexDirection: "row", justifyContent: "center", margin: 10 }}
      >
        <TextInput
          value={newDescription}
          placeholder="Enter new task description"
          onChangeText={setNewDescription}
        />
        <Pressable
          onPress={() => {
            realm.write(() => {
              realm.create("Task", Task.generate(newDescription))
            })
            setNewDescription("")
          }}
        >
          <Text>➕</Text>
        </Pressable>
      </View>
      <FlatList
        data={tasks.sorted("createdAt")}
        keyExtractor={(item) => item._id.toHexString()}
        renderItem={({ item }) => {
          return (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                margin: 10
              }}
            >
              <Pressable
                onPress={() =>
                  realm.write(() => {
                    item.isComplete = !item.isComplete
                  })
                }
              >
                <Text>{item.isComplete ? "✅" : "☑️"}</Text>
              </Pressable>
              <Text style={{ paddingHorizontal: 10 }}>{item.description}</Text>
              <Pressable
                onPress={() => {
                  realm.write(() => {
                    realm.delete(item)
                  })
                }}
              >
                <Text>🗑️</Text>
              </Pressable>
            </View>
          )
        }}
      />
    </SafeAreaView>
  )
}
