import React from "react"
import { View, StyleSheet, Text, TextInput } from "react-native"

export default function TeamDetails({
  navigation,
  saveScoreCard,
  teamSize,
  teamDetails,
  changeTeamDetails
}) {
  // Save on each update.
  saveScoreCard()

  function onChangeData(data, field) {
    const newTeamDetails = { ...teamDetails }
    newTeamDetails[field] = data
    changeTeamDetails(newTeamDetails)
  }

  return (
    <View style={styles.column}>
      <View style={styles.entryRow}>
        <Text style={styles.labelText}>Us Team</Text>
        <TextInput
          style={styles.inputText}
          onChangeText={(t) => onChangeData(t, "homeTeam")}
          maxLength={16}
          value={teamDetails.homeTeam}
        />
      </View>
      <View style={styles.entryRow}>
        <Text style={styles.labelText}>Them Team</Text>
        <TextInput
          style={styles.inputText}
          onChangeText={(t) => onChangeData(t, "awayTeam")}
          maxLength={16}
          value={teamDetails.awayTeam}
        />
      </View>
      <View style={styles.entryRow}>
        <Text style={styles.labelText}>Host Club</Text>
        <TextInput
          style={styles.inputText}
          onChangeText={(t) => onChangeData(t, "hostClub")}
          maxLength={16}
          value={teamDetails.hostClub}
        />
      </View>
      {teamSize > 1 && (
        <View style={styles.entryRow}>
          <Text style={styles.labelText}>Us Lead</Text>
          <TextInput
            style={styles.inputTextUs}
            onChangeText={(t) => onChangeData(t, "usLead")}
            maxLength={16}
            value={teamDetails.usLead}
          />
        </View>
      )}
      {teamSize > 2 && (
        <View style={styles.entryRow}>
          <Text style={styles.labelText}>Us Second</Text>
          <TextInput
            style={styles.inputTextUs}
            onChangeText={(t) => onChangeData(t, "usSecond")}
            maxLength={16}
            value={teamDetails.usSecond}
          />
        </View>
      )}
      {teamSize > 3 && (
        <View style={styles.entryRow}>
          <Text style={styles.labelText}>Us Third</Text>
          <TextInput
            style={styles.inputTextUs}
            onChangeText={(t) => onChangeData(t, "usThird")}
            maxLength={16}
            value={teamDetails.usThird}
          />
        </View>
      )}
      <View style={styles.entryRow}>
        <Text style={styles.labelText}>Us Skip</Text>
        <TextInput
          style={styles.inputTextUs}
          onChangeText={(t) => onChangeData(t, "usSkip")}
          maxLength={16}
          value={teamDetails.usSkip}
        />
      </View>
      {teamSize > 1 && (
        <View style={styles.entryRow}>
          <Text style={styles.labelText}>Them Lead</Text>
          <TextInput
            style={styles.inputTextThem}
            onChangeText={(t) => onChangeData(t, "themLead")}
            maxLength={16}
            value={teamDetails.themLead}
          />
        </View>
      )}
      {teamSize > 2 && (
        <View style={styles.entryRow}>
          <Text style={styles.labelText}>Them Second</Text>
          <TextInput
            style={styles.inputTextThem}
            onChangeText={(t) => onChangeData(t, "themSecond")}
            maxLength={16}
            value={teamDetails.themSecond}
          />
        </View>
      )}
      {teamSize > 3 && (
        <View style={styles.entryRow}>
          <Text style={styles.labelText}>Them Third</Text>
          <TextInput
            style={styles.inputTextThem}
            onChangeText={(t) => onChangeData(t, "themThird")}
            maxLength={16}
            value={teamDetails.themThird}
          />
        </View>
      )}
      <View style={styles.entryRow}>
        <Text style={styles.labelText}>Them Skip</Text>
        <TextInput
          style={styles.inputTextThem}
          onChangeText={(t) => onChangeData(t, "themSkip")}
          maxLength={16}
          value={teamDetails.themSkip}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  column: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },

  entryRow: {
    height: 50,
    flexDirection: "row",
    justifyContent: "left",
    textAlign: "center"
  },

  inputView: {
    height: 40,
    width: 220,
    margin: 10
  },

  inputText: {
    fontSize: 18,
    height: 40,
    width: 220,
    margin: 10,
    padding: 5,
    borderWidth: 1,
    borderRadius: 5
  },

  inputTextUs: {
    fontSize: 18,
    height: 40,
    width: 220,
    margin: 10,
    padding: 5,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "rgb(33, 150, 243)"
  },

  inputTextThem: {
    fontSize: 18,
    height: 40,
    width: 220,
    margin: 10,
    padding: 5,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "rgb(243, 33, 33)"
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
    textAlign: "left"
  }
})
