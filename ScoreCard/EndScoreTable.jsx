import { Picker } from "@react-native-picker/picker"
import React, { useState, useRef } from "react"
import {
  ScrollView,
  View,
  StyleSheet,
  Text,
  Platform,
  Modal
} from "react-native"
import { Dropdown } from "react-native-element-dropdown"

import YesNoPrompt from "../YesNoPrompt"

export default function EndScoreTable({
  saveScoreCard,
  scoreCard,
  gameDetails,
  changeScoreCard
}) {
  // Save on each update.
  saveScoreCard()

  async function addEditNewRow(value, isUseScore, index) {
    //console.log("addEditNewRow()", value, isUseScore, index)
    let newTable = scoreCard.map((item) => {
      return { ...item }
    })

    if (value === "Delete") {
      newTable.splice(index, 1)
    } else {
      if (typeof value === "number") {
        if (isUseScore) {
          newTable[index].usValue = value
          newTable[index].themValue = "Lost"
        } else {
          newTable[index].usValue = "Lost"
          newTable[index].themValue = value
        }
      } else {
        // Value must be killed.
        newTable[index].usValue = "Killed"
        newTable[index].themValue = "Killed"
      }
    }

    // Since the table is small update the entire contents after each edit.
    let endNumber = 0
    let usTotal = 0
    let themTotal = 0
    for (let i = 0; i < newTable.length; i++) {
      if (typeof newTable[i].usValue === "number") {
        usTotal += newTable[i].usValue
      }

      if (typeof newTable[i].themValue === "number") {
        themTotal += newTable[i].themValue
      }

      if (i === 0 || newTable[i - 1].usValue !== "Killed") endNumber += 1

      newTable[i].endNumber = endNumber
      newTable[i].usTotal = usTotal
      newTable[i].themTotal = themTotal
    }

    if (newTable.at(-1).usValue !== "-" && newTable.at(-1).themValue !== "-") {
      endNumber = newTable.at(-1).endNumber
      if (newTable.at(-1).usValue !== "Killed") {
        endNumber += 1
      }

      newTable = [
        ...newTable,
        {
          endNumber,
          usTotal: newTable.at(-1).usTotal,
          usValue: "-",
          themTotal: newTable.at(-1).themTotal,
          themValue: "-",
          changeTotals: null
        }
      ]
    }
    //console.log(newTable)
    changeScoreCard(newTable)
  }

  return (
    <View style={{ padding: 10, flex: 1 }}>
      <View style={styles.titleRow}>
        <Text style={[styles.titleText, { flex: 1 }]}>End</Text>
        <Text style={[styles.titleText, { flex: 2 }]}>Shots</Text>
        <Text style={[styles.titleText, { flex: 1 }]}>Total</Text>
        <Text style={[styles.titleText, { flex: 2 }]}>Shots</Text>
        <Text style={[styles.titleText, { flex: 1 }]}>Total</Text>
      </View>
      <ScrollView>
        {scoreCard.map((item, i) => (
          <EndScoreRow
            key={i}
            index={i}
            endNumber={item.endNumber}
            usTotal={item.usTotal}
            usValue={item.usValue}
            themTotal={item.themTotal}
            themValue={item.themValue}
            addEditNewRow={addEditNewRow}
            gameDetails={gameDetails}
          />
        ))}
      </ScrollView>
    </View>
  )
}

function EndScoreRow({
  index,
  endNumber,
  usValue,
  usTotal,
  themValue,
  themTotal,
  addEditNewRow,
  gameDetails
}) {
  //console.log('EndScoreRow(props)')
  //console.log(props)

  return (
    <View style={styles.dataRow}>
      <Text style={[styles.dataText, { flex: 1 }]}>{endNumber}</Text>
      <View style={[styles.dataText, { flex: 2 }]}>
        {Platform.OS === "web" ? (
          <SelectEndScoreDropdown
            gameDetails={gameDetails}
            changeCallback={addEditNewRow}
            curValue={usValue}
            isUseScore
            rowIndex={index}
          />
        ) : (
          <SelectEndScoreWheel
            gameDetails={gameDetails}
            changeCallback={addEditNewRow}
            curValue={usValue}
            isUseScore
            rowIndex={index}
          />
        )}
      </View>
      <Text style={[styles.dataText, { flex: 1 }]}>{usTotal}</Text>
      <View style={[styles.dataText, { flex: 2 }]}>
        {Platform.OS === "web" ? (
          <SelectEndScoreDropdown
            gameDetails={gameDetails}
            changeCallback={addEditNewRow}
            curValue={themValue}
            isUseScore={false}
            rowIndex={index}
          />
        ) : (
          <SelectEndScoreWheel
            gameDetails={gameDetails}
            changeCallback={addEditNewRow}
            curValue={themValue}
            isUseScore={false}
            rowIndex={index}
          />
        )}
      </View>
      <Text style={[styles.dataText, { flex: 1 }]}>{themTotal}</Text>
    </View>
  )
}

function SelectEndScoreWheel({
  gameDetails,
  curValue,
  changeCallback,
  isUseScore,
  rowIndex
}) {
  const pickerRef = useRef()
  const maxScore = gameDetails.numberBowls * gameDetails.teamSize
  const [scoreText, changeScoreText] = useState("-")
  const [scoreValue, changeScoreValue] = useState(1)
  const [showPicker, changeShowPicker] = useState(false)

  let value = curValue
  if (typeof value === "number") {
    value = value + " Up"
  }
  if (scoreText !== value) {
    changeScoreText(value)
  }

  const wheelValues = []
  for (let i = 1; i <= maxScore; i++) {
    wheelValues.push({ label: i + " Up", value: i })
  }
  wheelValues.push({ label: "Killed", value: "Killed" })
  wheelValues.push({ label: "Delete", value: "Delete" })

  async function selectedValue(itemValue, itemIndex) {
    console.log("selectedValue from picker")
    if (itemValue === "Delete") {
      const doDelete = await YesNoPrompt(
        "Are you sure?",
        "Delete Score Card Row"
      )
      if (doDelete === false) {
        changeShowPicker(false)
        return
      }
    }
    changeCallback(itemValue, isUseScore, rowIndex)
    changeShowPicker(false)
  }

  function showWheel() {
    console.log("showWheel")
    let tmp = curValue
    if (!(curValue === "-" || curValue === "Delete" || curValue === "Lost")) {
      tmp = 1
    }
    changeScoreValue(tmp)

    changeShowPicker(true)
    pickerRef.current.focus()
  }

  return (
    <>
      <Modal transparent visible={showPicker}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text>Hello</Text>
            <Picker
              ref={pickerRef}
              enabled
              selectedValue={scoreValue}
              onValueChange={selectedValue}
            >
              {wheelValues.map((item, i) => (
                <Picker.Item key={i} label={item.label} value={item.value} />
              ))}
            </Picker>
          </View>
        </View>
      </Modal>

      <Text style={styles.dataText} onPress={showWheel}>
        {scoreText}
      </Text>
    </>
  )
}

// This is limited for the example valid score per end is 0 to 4, 6, 8 depending on the format of the game.

/*  There is some complicated flow in this function as the Dropdown selection
    can be cancelled. The Dropdown element needs to change the selection value
    and then change it back to the original value on cancel. If it doesn't change
    twice the selection label of the Dropdown box becomes out of sync with the
    state object that controls the table. Perhaps the community Dropdown project
    could be amended in the future. */

function SelectEndScoreDropdown({
  gameDetails,
  curValue,
  changeCallback,
  isUseScore,
  rowIndex
}) {
  const [scoreValue, changeScoreValue] = useState()
  const maxScore = gameDetails.numberBowls * gameDetails.teamSize

  //console.log("SelectEndScore", gameDetails, maxScore)
  const endScore = []
  for (let i = 1; i <= maxScore; i++) {
    endScore.push({ label: i + " Up", shots: i })
  }
  endScore.push({ label: "-", shots: "-" })
  endScore.push({ label: "Lost", shots: "Lost" })
  endScore.push({ label: "Killed", shots: "Killed" })
  endScore.push({ label: "Delete", shots: "Delete" })

  if ((scoreValue !== "Delete") & (scoreValue !== curValue)) {
    changeScoreValue(curValue)
    return
  }

  function renderItem(item) {
    if ((item.label !== "-") & (item.label !== "Lost")) {
      return (
        <View style={styles.item}>
          <Text style={styles.textItem}>{item.label}</Text>
        </View>
      )
    }
  }

  function correctDropDown() {
    changeScoreValue(curValue)
  }
  return (
    <Dropdown
      style={styles.dropdown}
      placeholderStyle={styles.placeholderStyle}
      selectedTextStyle={styles.selectedTextStyle}
      inputSearchStyle={styles.inputSearchStyle}
      onChange={async (item) => {
        console.log("item :", item)
        if (item.shots === "Delete") {
          const doDelete = await YesNoPrompt(
            "Are you sure?",
            "Delete Score Card Row"
          )
          console.log("YesNoPrompt Exit :" + doDelete)
          if (doDelete === false) {
            changeScoreValue("Delete")
            setTimeout(correctDropDown, 1)
            return
          }
        }
        changeCallback(item.shots, isUseScore, rowIndex)
      }}
      data={endScore}
      labelField="label"
      valueField="shots"
      value={scoreValue}
      renderItem={renderItem}
    />
  )
}

const styles = StyleSheet.create({
  titleRow: {
    flexDirection: "row",
    height: 30
  },

  titleText: {
    fontSize: 18,
    borderWidth: 2,
    borderColor: "#000",
    textAlign: "center"
  },

  dataRow: {
    flexDirection: "row",
    height: 30
  },

  dataText: {
    fontSize: 18,
    borderWidth: 1,
    borderColor: "#ddd",
    justifyContent: "center",
    textAlign: "center"
  },

  dropdown: {
    justifyContent: "center",
    alignItems: "center"
  },

  placeholderStyle: {
    fontSize: 18,
    justifyContent: "center",
    textAlign: "center"
  },

  selectedTextStyle: {
    fontSize: 18,
    justifyContent: "center",
    textAlign: "center"
  },

  textItem: {
    fontSize: 18,
    justifyContent: "center",
    textAlign: "center"
  },

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },

  modalView: {
    height: 200,
    width: 200,
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  }
})
