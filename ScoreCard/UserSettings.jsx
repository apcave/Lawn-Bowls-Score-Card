import React, {useEffect} from 'react';
import {View, StyleSheet, Text, TextInput, Button} from 'react-native';
import {BSON} from 'realm';
import {useUser, useRealm, useQuery} from '@realm/react';
import {Item} from '../ToDoList/ItemSchema';

export default function UserSettings({navigation}) {
  const realm = useRealm();
  const userCol = useQuery(Item).sorted('_id');

  //useQuery(PlayerData).filtered('PlayerKey == $0', user.id);
  const user = useUser();

  useEffect(() => {
    console.log('useEffect, updating subscriptions');
    realm.subscriptions.update(mutableSubs => {
      mutableSubs.removeByName('ownItems');
      mutableSubs.add(realm.objects(Item), {name: 'items'});
    });
  });

  console.log('realm', realm);
  console.log('userCol', userCol);
  console.log('user', user);
  let curPlayerData = {};
  //if (userCol.length === 8) {
  // Create a new default user profile.

  /*
    curPlayerData = new PlayerData(realm, {
      PlayerKey: user.id,
      FirstName: 'First Name',
      LastName: 'Last Name',
      Email: '<EMAIL>',
      FirstName: 'First Name',
      LastName: 'Last Name',
      PreferredName: '-',
      playerKey: user.id,
      StartedBowling: new Date(),
      BirthYear: new Date(),
      Gender: 'Unspecified',
      PhoneNumber: '-',
      EmergencyContactName: 'Emergency Contact',
      EmergencyPhoneNumber: '-',
      competitions: [],
    });
    */
  //} else {
  //  curPlayerData = userCol[0];
  //}
  console.log('UpdateUserSettings', curPlayerData, userCol);

  function UpdateUserSettings() {
    console.log('UpdateUserSettings');
    realm.write(() => {
      return new Item(realm, {
        summary: 'This is a test',
        owner_id: user?.id,
      });
    });
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
