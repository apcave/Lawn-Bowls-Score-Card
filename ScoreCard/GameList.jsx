import React, {useState} from 'react';
import {
  Dimensions,
  TouchableOpacity,
  Pressable,
  View,
  Text,
} from 'react-native';
import {SwipeListView} from 'react-native-swipe-list-view';
import {MaterialIcons, Ionicons} from '@expo/vector-icons';

export default function GameList({navigation}) {
  const [listData, setListData] = useState(
    Array(20)
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

  const renderItem = ({item, index}) => (
    <View>
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
        height={50}
        underlayColor={'#AAA'}
        _pressed={{
          bg: 'trueGray.200',
        }}
        py={8}>
        <Text>{item.text}</Text>
      </Pressable>
    </View>
  );

  const renderHiddenItem = (data, rowMap) => (
    <View flex={1} pl={2}>
      <Pressable
        px={4}
        ml="auto"
        cursor="pointer"
        bg="dark.500"
        justifyContent="center"
        onPress={() => closeRow(rowMap, data.item.key)}
        _pressed={{
          opacity: 0.5,
        }}>
        <Ionicons name="close" color="white" />
      </Pressable>
      <Pressable
        px={4}
        cursor="pointer"
        bg="red.500"
        justifyContent="center"
        onPress={() => deleteRow(rowMap, data.item.key)}
        _pressed={{
          opacity: 0.5,
        }}>
        <MaterialIcons name="delete" color="white" />
      </Pressable>
    </View>
  );

  return (
    <View>
      <SwipeListView
        data={listData}
        renderItem={renderItem}
        renderHiddenItem={renderHiddenItem}
        rightOpenValue={-130}
        previewRowKey={'0'}
        previewOpenValue={-40}
        previewOpenDelay={3000}
        onRowDidOpen={onRowDidOpen}
      />
    </View>
  );
}
