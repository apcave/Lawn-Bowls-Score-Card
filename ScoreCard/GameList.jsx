import React, {useState} from 'react';
import {StyleSheet, View, Text, Pressable, Dimensions} from 'react-native';
import {SwipeListView} from 'react-native-swipe-list-view';
import {MaterialCommunityIcons, Ionicons} from '@expo/vector-icons';
import {colors} from '../Colors';

export default function GameList({navigation}) {
  const [listData, setListData] = useState(
    Array(4)
      .fill('')
      .map((_, i) => ({
        key: `${i}`,
        text: `Game #${i}`,
      })),
  );

  const closeRow = (rowMap, rowKey) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  };

  const deleteRow = (rowMap, rowKey) => {
    closeRow(rowMap, rowKey);
    const newData = [...listData];
    const prevIndex = listData.findIndex(item => item.key === rowKey);
    newData.splice(prevIndex, 1);
    setListData(newData);
  };

  const onRowDidOpen = rowKey => {
    console.log('This row opened', rowKey);
  };

  function renderItem({item, index}) {
    const options = {
      weekday: 'long',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    };
    let tmpDate = new Date().toLocaleDateString('en-aus', options);
    rateColor = 'red';
    cardColor = 'green';

    return (
      <Pressable
        onPress={() => {
          console.log('You touched me');
          navigation.navigate('Match Card');
        }}
        alignItems="center"
        bg="white"
        borderBottomColor="grey"
        borderBottomWidth={1}
        justifyContent="center"
        underlayColor={'white'}
        py={8}>
        <View style={styles.entryRow}>
          <View style={styles.columnIcon}>
            <View style={styles.viewIcon}>
              <Ionicons name="ios-star-outline" color={rateColor} size={20} />
            </View>
            <View style={styles.viewIcon}>
              <MaterialCommunityIcons
                name="strategy"
                color={cardColor}
                size={20}
              />
            </View>
          </View>
          <View style={styles.column}>
            <Text>Metro Midweek 7-A-Side</Text>
            <Text>{tmpDate}, Division 2, Section 1</Text>
            <Text>Fitzroy Victoria 1 vs Murrumbeena Park 1</Text>
          </View>
        </View>
      </Pressable>
    );
  }

  function renderHiddenItem(data, rowMap) {
    return (
      <View style={styles.rowBack}>
        <View style={[styles.backRightBtn, styles.backRightBtnRight]}>
          <Pressable onPress={() => deleteRow(rowMap, data.key)}>
            <Text style={styles.backTextWhite}>Delete</Text>
          </Pressable>
        </View>
      </View>
    );
  }

  return (
    <View>
      <SwipeListView
        disableRightSwipe
        data={listData}
        renderItem={renderItem}
        renderHiddenItem={renderHiddenItem}
        rightOpenValue={-Dimensions.get('window').width}
        previewRowKey={'0'}
        previewOpenValue={-100}
        previewOpenDelay={3000}
        onRowDidOpen={onRowDidOpen}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  entryRow: {
    height: 60,
    flexDirection: 'row',
    justifyContent: 'left',
    textAlign: 'center',
    flexDirection: 'row',
    justifyContent: 'left',
    textAlign: 'center',
    backgroundColor: 'white',
  },

  deleteView: {
    flex: 1,
  },

  viewIcon: {
    padding: 2,
  },

  column: {
    flex: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },

  rowBack: {
    alignItems: 'center',
    backgroundColor: 'red',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15,
  },

  columnIcon: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backTextWhite: {
    fontSize: 24,
    color: '#FFF',
  },
  rowBack: {
    alignItems: 'center',
    backgroundColor: 'red',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15,
  },
  backRightBtn: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 90,
  },
  backRightBtnRight: {
    backgroundColor: 'red',
    right: 0,
  },
});
