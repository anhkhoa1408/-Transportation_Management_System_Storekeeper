import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
} from 'react-native';
import { Text, ListItem, Icon, CheckBox } from 'react-native-elements';
import CustomSearch from '../../components/CustomSearch/CustomSearch';
import { container } from '../../styles/layoutStyle';
import Header from '../../components/Header';
import { primary, danger } from '../../styles/color';
import PillButton from '../../components/CustomButton/PillButton';
import { COLORS } from '../../styles';

const ReportList = ({ navigation }) => {
  const [data, setData] = useState([
    {
      id: '#afoqijfoasdada'.toLocaleUpperCase(),
      dateTime: '12/20/2019 3:36 PM',
    },
    {
      id: '#bmiweopkrejgoi'.toLocaleUpperCase(),
      dateTime: '12/20/2019 3:36 PM',
    },
    {
      id: '#opkopjqwoiasdd'.toLocaleUpperCase(),
      dateTime: '12/20/2019 3:36 PM',
    },
    {
      id: '#fmppoekpokrope'.toLocaleUpperCase(),
      dateTime: '12/20/2019 3:36 PM',
    },
  ]);

  const [check, setCheck] = useState(
    Array.from({ length: data.length }, (_, index) => false),
  );

  const handleCheck = index => {
    check[index] = !check[index];
    setCheck([...check]);
  };

  const renderItem = ({ item, index }) => (
    <TouchableOpacity
      onLongPress={() => handleCheck(index)}
      onPress={() =>
        check.some(item => item === true)
          ? handleCheck(index)
          : navigation.navigate('EditReport')
      }>
      <ListItem containerStyle={style.reportItem}>
        <View
          style={{
            backgroundColor: 'rgba(255,255,255,0.6)',
            padding: 10,
            borderRadius: 15,
          }}>
          <Icon
            size={30}
            name="description"
            iconStyle={{
              color: '#FFF',
            }}
            containerStyle={{
              backgroundColor: COLORS.header,
              padding: 10,
              borderRadius: 25,
            }}
          />
        </View>
        <ListItem.Content>
          <ListItem.Title>{item.id}</ListItem.Title>
          <ListItem.Subtitle>{item.dateTime}</ListItem.Subtitle>
        </ListItem.Content>
        {check.some(item => item === true) ? (
          <ListItem.CheckBox
            checkedIcon="dot-circle-o"
            uncheckedIcon="circle-o"
            checked={check[index]}
            checkedColor={primary}
          />
        ) : (
          <ListItem.Chevron size={30} />
        )}
      </ListItem>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={style.container}>
      <Header headerText={'Danh sách báo cáo'} />

      <View style={{ width: '100%', paddingHorizontal: 10, display: 'flex' }}>
        {check.some(item => item === true) ? (
          <TouchableOpacity
            onPress={() =>
              setCheck(Array.from({ length: data.length }, (_, index) => false))
            }>
            <Text
              style={{
                alignSelf: 'flex-end',
                color: danger,
                marginRight: 10,
                fontSize: 17,
              }}>
              Huỷ
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() =>
              setCheck(Array.from({ length: data.length }, (_, index) => true))
            }>
            <Text
              style={{
                alignSelf: 'flex-end',
                color: primary,
                marginRight: 10,
                fontSize: 17,
              }}>
              Chọn tất cả
            </Text>
          </TouchableOpacity>
        )}

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
      {check.some(item => item === true) && (
        <PillButton
          title="In báo cáo"
          buttonStyle={{ backgroundColor: primary, paddingHorizontal: 50 }}
        />
      )}
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  container: { ...container },
  reportItem: {
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

export default ReportList;
