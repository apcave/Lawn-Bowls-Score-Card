import {Picker} from '@react-native-picker/picker';
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
import {Dropdown} from 'react-native-element-dropdown';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

export default function GameDetails({
  navigation,
  saveScoreCard,
  gameDetails,
  changeGameDetails,
}) {
  // Save on each update.
  saveScoreCard();

  function onChangeData(data, field) {
    const newGameDetails = {...gameDetails};
    newGameDetails[field] = data;
    changeGameDetails(newGameDetails);
  }

  return (
    <View style={styles.column}>
      <View style={styles.entryRow}>
        <Text style={styles.labelText}>Competition</Text>
        <TextInput
          style={styles.inputText}
          onChangeText={t => onChangeData(t, 'competition')}
          maxLength={16}
          value={gameDetails.competition}
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
      <DateSelector
        onChangeData={onChangeData}
        gameDate={gameDetails.cardDate}
      />
      <View style={styles.entryRow}>
        <Text style={styles.labelText}>Division</Text>
        <TextInput
          style={styles.inputText}
          onChangeText={t => onChangeData(t, 'division')}
          maxLength={16}
          value={gameDetails.division}
        />
      </View>
      <View style={styles.entryRow}>
        <Text style={styles.labelText}>Section</Text>
        <TextInput
          style={styles.inputText}
          onChangeText={t => onChangeData(t, 'section')}
          maxLength={16}
          value={gameDetails.section}
        />
      </View>
      <View style={styles.entryRow}>
        <Text style={styles.labelText}>Round</Text>
        <TextInput
          style={styles.inputText}
          onChangeText={t => onChangeData(t, 'round')}
          maxLength={16}
          value={gameDetails.round}
        />
      </View>
      <View style={styles.entryRow}>
        <Text style={styles.labelText}>Rink</Text>
        <TextInput
          style={styles.inputText}
          onChangeText={t => onChangeData(t, 'rink')}
          maxLength={16}
          value={gameDetails.rink}
        />
      </View>
      <View style={styles.entryRow}>
        <Text style={styles.labelText}>Max Ends</Text>
        <View style={styles.toggle}>
          <Switch
            onValueChange={() =>
              onChangeData(!gameDetails.stopOnEnds, 'stopOnEnds')
            }
            value={gameDetails.stopOnEnds}
          />
        </View>
      </View>
      {gameDetails.stopOnEnds && (
        <View style={styles.entryRow}>
          <Text style={styles.labelText}>Max Ends</Text>
          <TextInput
            style={styles.inputText}
            onChangeText={t => onChangeData(t, 'maxNumberEnds')}
            maxLength={16}
            value={gameDetails.maxNumberEnds.toString()}
          />
        </View>
      )}
      {!gameDetails.stopOnEnds && (
        <View style={styles.entryRow}>
          <Text style={styles.labelText}>Max Score</Text>
          <TextInput
            style={styles.inputText}
            onChangeText={t => onChangeData(t, 'maxStopScore')}
            maxLength={16}
            value={gameDetails.maxStopScore.toString()}
          />
        </View>
      )}
    </View>
  );
}

function DateSelector({onChangeData, gameDate}) {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = date => {
    console.warn('A date has been picked: ', date);
    hideDatePicker();
    onChangeData(date, 'cardDate');
  };

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
          date={gameDate}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
      </View>
    </View>
  );
}

const players = [
  {label: 'Single', noPlayers: 1},
  {label: 'Pairs', noPlayers: 2},
  {label: 'Triples', noPlayers: 3},
  {label: 'Fours', noPlayers: 4},
];

const bowls = [
  {label: 'One Bowl', noBowls: 1},
  {label: 'Two Bowl', noBowls: 2},
  {label: 'Three Bowl', noBowls: 3},
  {label: 'Four Bowl', noBowls: 4},
];

function SelectBowlsFormat({noBowls, noPlayers, onChangeData}) {
  const renderItem = item => {
    return (
      <View style={styles.item}>
        <Text style={styles.dropText}>{item.label}</Text>
      </View>
    );
  };

  return (
    <>
      <Dropdown
        style={styles.dropBowlsText}
        data={bowls}
        labelField="label"
        valueField="noBowls"
        value={noBowls}
        onChange={item => {
          onChangeData(item.noBowls, 'numberBowls');
        }}
        renderItem={renderItem}
      />
      <Dropdown
        style={styles.dropPlayersText}
        data={players}
        labelField="label"
        valueField="noPlayers"
        value={noPlayers}
        onChange={item => {
          onChangeData(item.noPlayers, 'teamSize');
        }}
        renderItem={renderItem}
      />
    </>
  );
}

function ModelWheelPicker({wheelValues, changeCallback, selectedIndex}) {
  const [showPicker, changeShowPicker] = useState(false);

  function wheelSelected(itemValue, itemIndex) {
    changeShowPicker(false);
    changeCallback(itemValue);
  }

  return (
    <>
      <Modal transparent visible={showPicker}>
        <View style={styles.centeredView}>
          <Picker
            style={styles.pickerWheel}
            enabled
            selectedValue={wheelValues[selectedIndex].value}
            onValueChange={wheelSelected}>
            {wheelValues.map((item, i) => (
              <Picker.Item key={i} label={item.label} value={item.value} />
            ))}
          </Picker>
        </View>
      </Modal>

      <Text style={styles.textItem} onPress={() => changeShowPicker(true)}>
        {wheelValues[selectedIndex].label}
      </Text>
    </>
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
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: 'white',
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

  dropBowlsText: {
    height: 40,
    width: 120,
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 10,
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: 'white',
    padding: 5,
  },

  dropPlayersText: {
    height: 40,
    width: 90,
    margin: 10,
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: 'white',
    padding: 5,
  },

  dropText: {
    fontSize: 18,
    height: 30,
    justifyContent: 'center',
    textAlign: 'center',
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

  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },

  pickerWheel: {
    width: 300,
    backgroundColor: 'white',
    borderRadius: 20,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
