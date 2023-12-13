import React, {useEffect} from 'react';
import {View, StyleSheet, Text, TextInput, Button, Alert} from 'react-native';
import {BSON} from 'realm';
import {useUser, useRealm, useQuery} from '@realm/react';
import {Item} from '../ToDoList/ItemSchema';
import {PlayerData} from './RealmClasses';

export default function UserSettings({navigation}) {
  const realm = useRealm();
  const user = useUser();

  userId = new BSON.ObjectId(user.id);
  const userDataCol = useQuery(PlayerData).filtered('playerKey == $0', userId);
  const userData = userDataCol[0];

  useEffect(() => {
    realm.subscriptions.update(mutableSubs => {
      mutableSubs.add(realm.objects(PlayerData), {name: 'UserData'});
    });

    if (userDataCol.length === 0) {
      console.log('Creating new user setting.', userDataCol);
      realm.write(() => {
        return new PlayerData(realm, {
          firstName: 'This is a test',
          playerKey: userId,
        });
      });
    }
  });

  function UpdateUserSettings() {
    console.log('Updating new user setting.', userDataCol);

    //const item = realm.objectForPrimaryKey(PlayerData, id);
    console.log('updating, item', userData, userId);
    if (userData) {
      if (userData.playerKey.toString() !== userId.toString()) {
        Alert.alert("You can't modify someone else's user profile!");
      } else {
        realm.write(() => {
          userData.firstName = 'Updated to Alex.';
        });
      }
    }
  }

  return (
    <View>
      <Text>This is where the user settings go. You can :</Text>
      <Text>* Logout of the current user on MongoDb</Text>
      <Text>
        * Assign which Clubs and Competitions you subscribe to for games as a
        player.
      </Text>
      <Text>
        * Assign which Clubs and Competitions you subscribe to for games as a
        selector.
      </Text>
      <Text>* Apply for role as selector with the club administrator.</Text>

      <Button title={'Update User Details'} onPress={UpdateUserSettings} />
    </View>
  );
}
