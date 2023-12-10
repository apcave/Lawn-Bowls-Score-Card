import React, {useState} from 'react';
import {View, StyleSheet, Text, TextInput, Switch} from 'react-native';
import {colors} from '../Colors';

export default function TeamDetails({
  navigation,
  saveScoreCard,
  teamSize,
  teamDetails,
  changeTeamDetails,
}) {
  const [showUs, changeShowUs] = useState(true);

  // Save on each update.
  saveScoreCard();

  function onChangeData(data, field) {
    const newTeamDetails = {...teamDetails};
    newTeamDetails[field] = data;
    changeTeamDetails(newTeamDetails);
  }

  function toggleTeamSwitch() {
    changeShowUs(!showUs);
  }

  return (
    <View style={styles.column}>
      <View style={styles.entryRow}>
        <Text style={styles.labelText}>Us Team</Text>
        <TextInput
          style={styles.inputText}
          onChangeText={t => onChangeData(t, 'homeTeam')}
          maxLength={16}
          value={teamDetails.homeTeam}
        />
      </View>
      <View style={styles.entryRow}>
        <Text style={styles.labelText}>Them Team</Text>
        <TextInput
          style={styles.inputText}
          onChangeText={t => onChangeData(t, 'awayTeam')}
          maxLength={16}
          value={teamDetails.awayTeam}
        />
      </View>
      <View style={styles.entryRow}>
        <Text style={styles.labelText}>Host Club</Text>
        <TextInput
          style={styles.inputText}
          onChangeText={t => onChangeData(t, 'hostClub')}
          maxLength={16}
          value={teamDetails.hostClub}
        />
      </View>
      <View style={styles.entryRow}>
        <Text style={styles.labelText}>Toggle Teams"</Text>
        <View style={styles.toggle}>
          <Switch
            trackColor={{false: colors.themColor, true: colors.usColor}}
            ios_backgroundColor={colors.themColor}
            onValueChange={toggleTeamSwitch}
            value={showUs}
          />
        </View>
      </View>
      {showUs && teamSize > 1 && (
        <View style={styles.entryRow}>
          <Text style={styles.labelText}>Us Lead</Text>
          <TextInput
            style={styles.inputTextUs}
            onChangeText={t => onChangeData(t, 'usLead')}
            maxLength={16}
            value={teamDetails.usLead}
          />
        </View>
      )}
      {showUs && teamSize > 2 && (
        <View style={styles.entryRow}>
          <Text style={styles.labelText}>Us Second</Text>
          <TextInput
            style={styles.inputTextUs}
            onChangeText={t => onChangeData(t, 'usSecond')}
            maxLength={16}
            value={teamDetails.usSecond}
          />
        </View>
      )}
      {showUs && teamSize > 3 && (
        <View style={styles.entryRow}>
          <Text style={styles.labelText}>Us Third</Text>
          <TextInput
            style={styles.inputTextUs}
            onChangeText={t => onChangeData(t, 'usThird')}
            maxLength={16}
            value={teamDetails.usThird}
          />
        </View>
      )}
      {showUs && (
        <View style={styles.entryRow}>
          <Text style={styles.labelText}>Us Skip</Text>
          <TextInput
            style={styles.inputTextUs}
            onChangeText={t => onChangeData(t, 'usSkip')}
            maxLength={16}
            value={teamDetails.usSkip}
          />
        </View>
      )}
      {showUs === false && teamSize > 1 && (
        <View style={styles.entryRow}>
          <Text style={styles.labelText}>Them Lead</Text>
          <TextInput
            style={styles.inputTextThem}
            onChangeText={t => onChangeData(t, 'themLead')}
            maxLength={16}
            value={teamDetails.themLead}
          />
        </View>
      )}
      {showUs === false && teamSize > 2 && (
        <View style={styles.entryRow}>
          <Text style={styles.labelText}>Them Second</Text>
          <TextInput
            style={styles.inputTextThem}
            onChangeText={t => onChangeData(t, 'themSecond')}
            maxLength={16}
            value={teamDetails.themSecond}
          />
        </View>
      )}
      {showUs === false && teamSize > 3 && (
        <View style={styles.entryRow}>
          <Text style={styles.labelText}>Them Third</Text>
          <TextInput
            style={styles.inputTextThem}
            onChangeText={t => onChangeData(t, 'themThird')}
            maxLength={16}
            value={teamDetails.themThird}
          />
        </View>
      )}
      {showUs === false && (
        <View style={styles.entryRow}>
          <Text style={styles.labelText}>Them Skip</Text>
          <TextInput
            style={styles.inputTextThem}
            onChangeText={t => onChangeData(t, 'themSkip')}
            maxLength={16}
            value={teamDetails.themSkip}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  column: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  entryRow: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'left',
    textAlign: 'center',
  },

  inputView: {
    height: 40,
    width: 220,
    margin: 10,
  },

  inputText: {
    fontSize: 18,
    height: 40,
    width: 220,
    margin: 10,
    padding: 5,
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: 'white',
  },

  inputTextUs: {
    fontSize: 18,
    height: 40,
    width: 220,
    margin: 10,
    padding: 5,
    borderWidth: 2,
    borderRadius: 5,
    borderColor: colors.usColor,
    backgroundColor: 'white',
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

  labelText: {
    fontSize: 18,
    height: 40,
    marginLeft: 10,
    marginTop: 10,
    marginBottom: 10,
    marginRight: 5,
    padding: 5,
    width: 120,
    textAlign: 'left',
  },

  toggle: {
    height: 40,
    width: 220,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 5,
    padding: 5,
  },
});
