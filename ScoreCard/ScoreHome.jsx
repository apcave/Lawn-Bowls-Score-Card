import AsyncStorage from '@react-native-async-storage/async-storage';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React, {useState} from 'react';

//https://github.com/expo/vector-icons
import {
  Ionicons,
  FontAwesome,
  MaterialCommunityIcons,
} from '@expo/vector-icons';

import {
  View,
  Button,
  StyleSheet,
  ScrollView,
  Image,
  Text,
  TextInput,
  Pressable,
  TouchableOpacity,
} from 'react-native';

import EndScoreTable from './EndScoreTable';
import GameDetails from './GameDetails';
import TeamDetails from './TeamDetails';
import YesNoPrompt from '../YesNoPrompt';
import GameList from './GameList';
import UserSettings from './UserSettings';
import TeamFeedback from './TeamFeedback';
import {colors} from '../Colors';
import {ItemListView} from '../ToDoList/ItemListView';
const BowlsNavTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: colors.background,
  },
};

const Stack = createStackNavigator();
const AppStartTime = new Date();

const initGameDetails = {
  fileName: 'Default Game',
  competition: 'Metro Pennant Midweek 7-A-Side',
  division: 'Division 2',
  section: 'Section 1',
  round: '5',
  rink: '-',
  numberBowls: 2,
  teamSize: 4,
  cardDate: AppStartTime,
  stopOnEnds: true,
  maxNumberEnds: 21,
  maxStopScore: 25,
};

const initTeamDetails = {
  homeTeam: 'Team Name',
  awayTeam: 'Team Name',
  hostClub: 'Host Club',
  usLead: 'Lead Name',
  ratingLead: 0,
  usSecond: 'Second Name',
  ratingSecond: 0,
  usThird: 'Third Name',
  ratingThird: 0,
  usSkip: 'Skip Name',
  ratingSkip: 0,
  themLead: 'Lead Name',
  themSecond: 'Second Name',
  themThird: 'Third Name',
  themSkip: 'Skip Name',
  teamComments: 'Leave comment for selectors...',
};

const initScoreCard = [
  {
    endNumber: 1,
    usTotal: 0,
    usValue: '-',
    themTotal: 0,
    themValue: '-',
  },
];

export default function ScoreStack() {
  const [gameDetails, changeGameDetails] = useState(initGameDetails);
  const [teamDetails, changeTeamDetails] = useState(initTeamDetails);
  const [scoreCard, changeScoreCard] = useState(initScoreCard);

  // Used for automatically saving the currrent score card.
  async function saveScoreCard() {
    try {
      const dataFile = {};
      dataFile['gameDetails'] = gameDetails;
      dataFile['teamDetails'] = teamDetails;
      dataFile['scoreCard'] = scoreCard;
      const jsonDataFile = JSON.stringify(dataFile);
      await AsyncStorage.setItem(gameDetails.fileName, jsonDataFile);
    } catch (e) {
      console.error('Error saving score card :' + e.message);
    }
  }

  return (
    <NavigationContainer theme={BowlsNavTheme}>
      <Stack.Navigator
        screenOptions={({navigation}) => ({
          headerRight: () => (
            <Pressable
              style={styles.settings}
              onPress={() => {
                console.log('Setting Icon');
                navigation.navigate('Settings');
              }}>
              <Ionicons name="ios-settings-outline" color={'grey'} size={26} />
            </Pressable>
          ),
        })}>
        <Stack.Screen name="Current Matches">
          {props => <GameList {...props} />}
        </Stack.Screen>
        <Stack.Screen name="Match Card">
          {props => (
            <MatchCardTabs
              {...props}
              saveScoreCard={saveScoreCard}
              gameDetails={gameDetails}
              changeGameDetails={changeGameDetails}
              teamDetails={teamDetails}
              changeTeamDetails={changeTeamDetails}
              scoreCard={scoreCard}
              changeScoreCard={changeScoreCard}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="Settings">
          {props => <UserSettings {...props} />}
        </Stack.Screen>

        <Stack.Screen name="Home">
          {props => (
            <SavedGames
              {...props}
              saveScoreCard={saveScoreCard}
              gameDetails={gameDetails}
              changeGameDetails={changeGameDetails}
              teamDetails={teamDetails}
              changeTeamDetails={changeTeamDetails}
              scoreCard={scoreCard}
              changeScoreCard={changeScoreCard}
            />
          )}
        </Stack.Screen>

        <Stack.Screen name="DoDoList" component={ItemListView} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function SendMatchCard() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Saves the information and sends it to the team manager!</Text>
    </View>
  );
}

function MatchCardTabs({
  navigation,
  saveScoreCard,
  gameDetails,
  changeGameDetails,
  teamDetails,
  changeTeamDetails,
  scoreCard,
  changeScoreCard,
}) {
  const Tab = createBottomTabNavigator();
  const [detailsColor, changeDetailsColor] = useState('lime');
  const [teamColor, changeTeamColor] = useState('red');
  const [rateColor, changeRateColor] = useState('lime');
  const [cardColor, changeCardColor] = useState('lime');
  const [sendColor, changeSendColor] = useState('grey');

  function ShowTeamDetails() {
    return (
      <TeamDetails
        saveScoreCard={saveScoreCard}
        teamSize={gameDetails.teamSize}
        teamDetails={teamDetails}
        changeTeamDetails={changeTeamDetails}
      />
    );
  }

  function ShowGameDetails() {
    return (
      <GameDetails
        saveScoreCard={saveScoreCard}
        gameDetails={gameDetails}
        changeGameDetails={changeGameDetails}
      />
    );
  }

  function ShowEndScoreTable() {
    return (
      <EndScoreTable
        saveScoreCard={saveScoreCard}
        scoreCard={scoreCard}
        gameDetails={gameDetails}
        changeScoreCard={changeScoreCard}
      />
    );
  }

  function ShowTeamFeedback() {
    return (
      <TeamFeedback
        gameDetails={gameDetails}
        scoreCard={scoreCard}
        teamDetails={teamDetails}
        changeTeamDetails={changeTeamDetails}
      />
    );
  }

  return (
    <Tab.Navigator screenOptions={{headerShown: false}}>
      <Tab.Screen
        name="Details"
        component={ShowGameDetails}
        options={{
          tabBarLabel: 'Details',
          tabBarIcon: () => (
            <FontAwesome name="paperclip" color={detailsColor} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Team"
        component={ShowTeamDetails}
        options={{
          tabBarLabel: 'Team',
          tabBarIcon: () => (
            <Ionicons name="people-outline" color={teamColor} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Rate"
        component={ShowTeamFeedback}
        options={{
          tabBarLabel: 'Rate',
          tabBarIcon: () => (
            <Ionicons name="ios-star-outline" color={rateColor} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Score"
        component={ShowEndScoreTable}
        options={{
          tabBarLabel: 'Score',
          tabBarIcon: () => (
            <MaterialCommunityIcons
              name="strategy"
              color={cardColor}
              size={26}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Send"
        component={SendMatchCard}
        options={{
          tabBarLabel: 'Send',
          tabBarIcon: () => (
            <FontAwesome name="paper-plane-o" color={sendColor} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

function SavedGames({
  navigation,
  saveScoreCard,
  gameDetails,
  changeGameDetails,
  teamDetails,
  changeTeamDetails,
  scoreCard,
  changeScoreCard,
}) {
  const [savedCards, changeSavedCards] = useState([]);

  // Check on each refresh the list of saved cards should be short.
  getStoredCards();

  function onChangeData(data, field) {
    const newGameDetails = {...gameDetails};
    newGameDetails[field] = data;
    changeGameDetails(newGameDetails);
  }

  async function loadCard(fileName, index) {
    console.log('loadCard : ' + fileName);

    let dataFile = {};
    try {
      const jsonValue = await AsyncStorage.getItem(fileName);
      if (jsonValue != null) {
        dataFile = JSON.parse(jsonValue);
      } else {
        deleteCard(fileName, index);
      }
    } catch (e) {
      console.error('Error loading score card :' + e.message);
    }

    changeScoreCard(dataFile['scoreCard']);
    changeTeamDetails(dataFile['teamDetails']);
    const loadedGame = dataFile['gameDetails'];
    loadedGame.cardDate = new Date(loadedGame.cardDate);
    changeGameDetails(loadedGame);
  }

  async function deleteCard(fileName, index) {
    console.log('deleteCard : ' + fileName);

    const doDelete = await YesNoPrompt('Are you sure?', 'Delete :' + fileName);
    if (doDelete === true) {
      try {
        await AsyncStorage.removeItem(fileName);
      } catch (e) {
        console.error('Error deleting score card :' + e.message);
      }
      const newSavedCard = savedCards.slice(index);
      changeSavedCards(newSavedCard);
    }
  }

  async function getStoredCards() {
    let fileNames = [];
    try {
      fileNames = await AsyncStorage.getAllKeys();
    } catch (e) {
      console.error('Error getting stored cards :' + e.message);
    }

    if (JSON.stringify(savedCards) !== JSON.stringify(fileNames))
      changeSavedCards(fileNames);
  }

  return (
    <>
      <View style={styles.column}>
        <View style={styles.button}>
          <Button
            title="Edit Game Details."
            onPress={() => navigation.navigate('Game')}
          />
        </View>
        <View style={styles.button}>
          <Button
            title="Edit Team Details."
            onPress={() => navigation.navigate('Team')}
          />
        </View>
        <View style={styles.button}>
          <Button
            title="Edit Score Card."
            onPress={() => navigation.navigate('Card')}
          />
        </View>
        <View style={styles.dividerTop} />
        <View style={styles.button}>
          <Button
            title="Reset to Default Game"
            onPress={() => {
              changeGameDetails(initGameDetails);
              changeTeamDetails(initTeamDetails);
              changeScoreCard(initScoreCard);
              saveScoreCard();
              getStoredCards();
            }}
          />
        </View>

        <View style={styles.entryRow}>
          <Text style={styles.labelText}>Game Name</Text>
          <TextInput
            style={styles.inputText}
            onChangeText={t => onChangeData(t, 'fileName')}
            onSubmitEditing={t => {
              saveScoreCard();
              getStoredCards();
            }}
            maxLength={24}
            value={gameDetails.fileName}
          />
        </View>
        <View style={styles.entryRow}>
          <View style={styles.divider}>
            <Text style={styles.fileNameTitle}>Saved Score Cards</Text>
          </View>
        </View>
        <ScrollView>
          {savedCards.map((item, i) => {
            if (item !== 'EXPO_CONSTANTS_INSTALLATION_ID')
              return (
                <SavedCardRow
                  key={i}
                  index={i}
                  fileName={item}
                  openFile={loadCard}
                  deleteFile={deleteCard}
                />
              );
          })}
        </ScrollView>
      </View>
    </>
  );
}

function SavedCardRow({index, fileName, openFile, deleteFile}) {
  return (
    <View style={styles.fileRow}>
      <TouchableOpacity onPress={() => openFile(fileName, index)}>
        <Text style={styles.fileName}>{fileName}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => deleteFile(fileName, index)}>
        <Image
          style={styles.tinyLogo}
          source={require('../assets/delete.png')}
        />
      </TouchableOpacity>
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

  button: {
    height: 40,
    width: 200,
    margin: 2,
  },

  fileRow: {
    height: 25,
    flexDirection: 'row',
    justifyContent: 'center',
    textAlign: 'center',
  },

  inputView: {
    height: 40,
    width: 220,
    margin: 10,
  },

  fileNameTitle: {
    height: 25,
    fontSize: 18,
    textAlign: 'center',
  },

  divider: {
    width: 260,
    paddingBottom: 1,
    borderBottomWidth: 1,
    marginTop: 15,
    marginBottom: 5,
  },

  dividerTop: {
    width: 260,
    paddingTop: 1,
    borderTopWidth: 1,
    marginTop: 5,
    marginBottom: 5,
  },
  fileName: {
    color: 'rgb(33, 150, 243)',
    fontSize: 18,
    height: 25,
    width: 210,
    textDecorationLine: 'underline',
    justifyContent: 'center',
    textAlign: 'center',
  },

  tinyLogo: {
    width: 24,
    height: 24,
    marginLeft: 5,
  },

  inputText: {
    fontSize: 18,
    height: 40,
    width: 220,
    margin: 10,
    padding: 5,
    borderWidth: 1,
    borderRadius: 5,
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

  settings: {
    margin: 8,
  },
});
