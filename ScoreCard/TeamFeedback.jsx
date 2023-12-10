import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Button,
  TextInput,
  Switch,
  Modal,
} from 'react-native';

import {colors} from '../Colors';

export default function TeamFeedback({
  gameDetails,
  scoreCard,
  teamDetails,
  changeTeamDetails,
}) {
  function onChangeData(data, field) {
    const newTeamDetails = {...teamDetails};
    newTeamDetails[field] = data;
    changeTeamDetails(newTeamDetails);
  }
  console.log(teamDetails);

  return (
    <View style={styles.column}>
      <Text>Team Feedback</Text>
      <View style={styles.feedbackBox}>
        <TextInput
          style={styles.inputTextUs}
          editable
          multiline
          numberOfLines={4}
          maxLength={200}
          onChangeText={t => onChangeData(t, 'teamComments')}
          value={teamDetails.teamComments}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  column: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  feedbackBox: {
    margin: 10,
    height: 100,
    alignSelf: 'stretch',
    flexDirection: 'row',
    justifyContent: 'center',
    textAlign: 'center',
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 5,
  },
  inputTextUs: {
    fontSize: 18,
  },
  inputTextThem: {
    fontSize: 18,
    height: 40,
    width: 220,
    margin: 10,
    padding: 5,
    borderWidth: 2,
    borderRadius: 5,
    borderColor: colors.themColor,
    backgroundColor: 'white',
  },
});
