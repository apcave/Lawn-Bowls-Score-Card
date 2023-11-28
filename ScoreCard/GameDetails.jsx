import React, { useState } from "react"
import { View, StyleSheet, Text, Button, TextInput } from "react-native"
import { Dropdown } from "react-native-element-dropdown"
import DateTimePickerModal from "react-native-modal-datetime-picker"

export default function GameDetails({
  navigation,
  saveScoreCard,
  gameDetails,
  changeGameDetails
}) {
  // Save on each update.
  saveScoreCard()

  function onChangeData(data, field) {
    const newGameDetails = { ...gameDetails }
    newGameDetails[field] = data
    changeGameDetails(newGameDetails)
  }

  return (
    <View style={styles.column}>
      <View style={styles.entryRow}>
        <Text style={styles.labelText}>Competition</Text>
        <TextInput
          style={styles.inputText}
          onChangeText={(t) => onChangeData(t, "Competition")}
          maxLength={16}
          value={gameDetails.Competition}
        />
      </View>

      <View style={styles.entryRow}>
        <Text style={styles.labelText}>Format</Text>
        <SelectBowlsFormat
          noBowls={gameDetails.numberBowls}
          noPlayers={gameDetails.teamSize}
          onChangeData={onChangeData}
        />
      </View>
      <DateSelector onChangeData={onChangeData} />
    </View>
  )
}

function DateSelector({ onChangeData }) {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false)
  const [gameDate, setGameDate] = useState(new Date())

  const showDatePicker = () => {
    setDatePickerVisibility(true)
  }

  const hideDatePicker = () => {
    setDatePickerVisibility(false)
  }

  const handleConfirm = (date) => {
    setGameDate(date)
    console.warn("A date has been picked: ", date)
    hideDatePicker()
    onChangeData(date, "cardDate")
  }

  return (
    <View style={styles.entryRow}>
      <Text style={styles.labelText}>Game Date</Text>
      <View style={styles.inputView}>
        <Button
          title={gameDate.toLocaleDateString()}
          onPress={showDatePicker}
        />
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
      </View>
    </View>
  )
}

const players = [
  { label: "Single", noPlayers: 1 },
  { label: "Pairs", noPlayers: 2 },
  { label: "Triples", noPlayers: 3 },
  { label: "Fours", noPlayers: 4 }
]

const bowls = [
  { label: "One Bowl", noBowls: 1 },
  { label: "Two Bowl", noBowls: 2 },
  { label: "Three Bowl", noBowls: 3 },
  { label: "Four Bowl", noBowls: 4 }
]

function SelectBowlsFormat({ noBowls, noPlayers, onChangeData }) {
  const renderItem = (item) => {
    return (
      <View style={styles.item}>
        <Text style={styles.dropText}>{item.label}</Text>
      </View>
    )
  }

  return (
    <>
      <Dropdown
        style={styles.dropBowlsText}
        data={bowls}
        labelField="label"
        valueField="noBowls"
        value={noBowls}
        onChange={(item) => {
          onChangeData(item.noBowls, "numberBowls")
        }}
        renderItem={renderItem}
      />
      <Dropdown
        style={styles.dropPlayersText}
        data={players}
        labelField="label"
        valueField="noPlayers"
        value={noPlayers}
        onChange={(item) => {
          onChangeData(item.noPlayers, "teamSize")
        }}
        renderItem={renderItem}
      />
    </>
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

  dropBowlsText: {
    height: 40,
    width: 120,
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 10,
    borderWidth: 1,
    borderRadius: 5,
    padding: 5
  },

  dropPlayersText: {
    height: 40,
    width: 90,
    margin: 10,
    borderWidth: 1,
    borderRadius: 5,
    padding: 5
  },

  dropText: {
    fontSize: 18,
    height: 30,
    justifyContent: "center",
    textAlign: "center"
  },

  labelText: {
    fontSize: 18,
    height: 40,
    marginLeft: 10,
    marginTop: 10,
    marginBottom: 10,
    marginRight: 5,
    padding: 5,
    width: 115,
    textAlign: "left"
  }
})
