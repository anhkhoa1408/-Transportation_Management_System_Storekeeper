import React, { useRef, useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  TouchableWithoutFeedback,
} from 'react-native';
import { Text, ListItem, Icon, CheckBox } from 'react-native-elements';
import CustomSearch from '../../components/CustomSearch/CustomSearch';
import { container } from '../../styles/layoutStyle';
import Header from '../../components/Header';
import { primary, danger } from '../../styles/color';
import { COLORS } from '../../styles';
import * as Animatable from 'react-native-animatable';

const VehicleList = ({ navigation }) => {
  const [data, setData] = useState([
    {
      id: '#afoqijfoasdada'.toLocaleUpperCase(),
      position: '51',
    },
    {
      id: '#bmiweopkrejgoi'.toLocaleUpperCase(),
      position: '51',
    },
    {
      id: '#opkopjqwoiasdd'.toLocaleUpperCase(),
      position: '51',
    },
    {
      id: '#fmppoekpokrope'.toLocaleUpperCase(),
      position: '51',
    },
  ]);

  const ref = useRef([]);

  const handlePress = async index => {
    await ref[index].animate({
      0: {
        scale: 1,
      },
      0.5: {
        scale: 0.9,
      },
      1: {
        scale: 1,
      },
    });
    navigation.navigate('VehicleDetail');
  };

  const renderItem = ({ item, index }) => (
    <Animatable.View
      ref={ele => (ref[index] = ele)}
      duration={500}
      easing="ease">
      <TouchableWithoutFeedback onPress={() => handlePress(index)}>
        <ListItem containerStyle={style.storeItem}>
          <View
            style={{
              backgroundColor: 'rgba(255,255,255,0.6)',
              padding: 10,
              borderRadius: 15,
            }}>
            <Icon
              size={30}
              name="local-shipping"
              iconStyle={{
                color: '#FFF',
              }}
              containerStyle={{
                backgroundColor: COLORS.primary,
                padding: 10,
                borderRadius: 25,
              }}
            />
          </View>
          <ListItem.Content>
            <ListItem.Title>{item.id}</ListItem.Title>
            <ListItem.Subtitle>Khu vực: {item.position}</ListItem.Subtitle>
          </ListItem.Content>
          <ListItem.Chevron size={30} />
        </ListItem>
      </TouchableWithoutFeedback>
    </Animatable.View>
  );

  return (
    <SafeAreaView style={style.container}>
      <Header headerText={'Danh sách phương tiện'} />

      <View style={{ width: '100%', paddingHorizontal: 10, display: 'flex' }}>
        <CustomSearch />
      </View>

      <FlatList
        style={{
          alignSelf: 'stretch',
        }}
        data={data}
        renderItem={renderItem}
        keyExtractor={item => `${item.id}`}
        ListEmptyComponent={
          <View
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              paddingTop: '50%',
            }}>
            <Text>Chưa có lịch sử nhập xuất</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  container: { ...container },
  storeItem: {
    padding: 20,
    marginHorizontal: 20,
    borderRadius: 12,
    borderColor: 'rgba(0,0,0,0.5)',
    backgroundColor: '#F0F1F5',
    marginVertical: 15,
  },
  chatList: {
    width: '100%',
    paddingHorizontal: 30,
    marginBottom: 20,
  },
  time: {
    alignSelf: 'flex-end',
    color: 'rgba(0,0,0,0.5)',
  },
});

export default VehicleList;
