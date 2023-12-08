import React from 'react';
import {View, StyleSheet, Text, TextInput} from 'react-native';

export default function UserSettings({navigation}) {
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
    </View>
  );
}
