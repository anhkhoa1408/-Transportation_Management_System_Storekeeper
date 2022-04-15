import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { Icon, Text } from 'react-native-elements';
import { container } from '../../styles/layoutStyle';
import Header from '../../components/Header';
import TextField from '../../components/TextField';
import { DatePicker } from '../../components/DatePicker';
import { COLORS } from '../../styles/index';
import ModalMess from './../../components/ModalMess';

const HistoryDetail = ({ navigation, route }) => {
  const { item } = route?.params;

  return (
    <SafeAreaView style={style.container}>
      <Header
        leftElement={
          <Icon name="west" size={30} onPress={() => navigation.goBack()} />
        }
        headerText={'Chi tiết'}
      />
      <ScrollView contentContainerStyle={style.form}>
        <TextField
          disabled
          editable={false}
          title="Mã nhập xuất"
          value={item.id}
        />
        <TextField
          disabled
          editable={false}
          title="Người thực hiện"
          value={item.store_manager?.name || ""}
        />
        <TextField
          disabled
          editable={false}
          keyboardType="numeric"
          title="Số lượng"
          afterText="kiện"
          value={item.quantity.toString()}
        />
        <DatePicker disabled title="Ngày thực hiện" date={item.createdAt} />
        <TextField
          disabled
          editable={false}
          keyboardType="numeric"
          title="Mã kiện hàng"
          value={item.package.id}
        />
        <TextField
          disabled
          editable={false}
          keyboardType="numeric"
          title="Tên kiện hàng"
          value={item.package.name}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  container: {
    ...container,
    alignItems: 'stretch',
  },
  input: {
    padding: 15,
    backgroundColor: '#FFF',
  },
  form: {
    paddingHorizontal: 30,
    paddingVertical: 15,
  },
});

export default HistoryDetail;
