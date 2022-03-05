import React, { useEffect, useState } from 'react';
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
import storageApi from '../../api/storageApi';
import moment from 'moment';
import { simplifyString } from './../../utils/simplifyString';

const ReportList = ({ navigation }) => {
  const [page, setPage] = useState(0);
  const [data, setData] = useState([]);

  const [check, setCheck] = useState(
    Array.from({ length: data.length }, (_, index) => false),
  );

  const handleCheck = index => {
    check[index] = !check[index];
    setCheck([...check]);
  };

  const renderItem = ({ item, index }) => (
    <TouchableOpacity
      key={item.id + index}
      onLongPress={() => handleCheck(index)}
      onPress={() =>
        check.some(item => item === true)
          ? handleCheck(index)
          : navigation.navigate('EditReport', item)
      }>
      <ListItem containerStyle={style.reportItem}>
        <View style={style.item}>
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
          <ListItem.Title>ID: {simplifyString(item.id, 20)}</ListItem.Title>
          <ListItem.Subtitle>
            Cập nhật: {moment(item.updatedAt).format('DD/MM/YYYY HH:mm')}
          </ListItem.Subtitle>
        </ListItem.Content>
        {check.some(item => item === true) ? (
          <ListItem.CheckBox
            checkedIcon="dot-circle-o"
            uncheckedIcon="circle-o"
            checked={check[index]}
            checkedColor={primary}
          />
        ) : (
          <ListItem.Chevron size={20} />
        )}
      </ListItem>
    </TouchableOpacity>
  );

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      storageApi
        .reportList({ page: 0 })
        .then(response => {
          setData(response);
        })
        .catch(error => console.log(error));
    });

    if (page) {
      storageApi
        .reportList({ page: page })
        .then(response => {
          setData([...data, ...response]);
        })
        .catch(error => console.log(error));
    }

    return unsubscribe;
  }, [page]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('blur', () => {
      setPage(0);
    });

    return unsubscribe;
  }, []);

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
          <View style={style.noData}>
            <Text>Chưa có lịch sử báo cáo</Text>
          </View>
        }
        ListFooterComponent={
          data.length > 5 && (
            <View style={{ padding: 20 }}>
              <PillButton onPress={() => setPage(page + 1)} title="Xem thêm" />
            </View>
          )
        }
      />
      {check.some(item => item === true) && (
        <View style={{ padding: 20, paddingBottom: 30 }}>
          <PillButton
            title="In báo cáo"
            buttonStyle={{
              backgroundColor: primary,
            }}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  container: { ...container, alignItems: 'stretch' },
  reportItem: {
    padding: 20,
    marginHorizontal: 20,
    borderRadius: 12,
    borderColor: 'rgba(0,0,0,0.5)',
    backgroundColor: COLORS.gray,
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
  noData: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: '50%',
  },
  item: {
    backgroundColor: 'rgba(255,255,255,0.6)',
    padding: 10,
    borderRadius: 15,
  },
});

export default ReportList;
