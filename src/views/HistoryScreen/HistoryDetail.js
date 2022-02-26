import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { Icon, Text } from 'react-native-elements';
import { container } from '../../styles/layoutStyle';
import Header from '../../components/Header';
import TextField from '../../components/TextField';
import { DatePicker } from '../../components/DatePicker';
import { COLORS } from '../../styles/index';

const HistoryDetail = ({ navigation, route }) => {
  const { item } = route?.params;
  console.log(item.package);

  return (
    <SafeAreaView style={style.container}>
      <Header
        leftElement={
          <Icon name="west" size={30} onPress={() => navigation.goBack()} />
        }
        headerText={'Chi tiết'}
      />
      <ScrollView contentContainerStyle={style.form}>
        <TextField editable={false} title="Mã nhập xuất" value={item.code} />
        <TextField
          editable={false}
          title="Người thực hiện"
          value={item.store_manager.name}
        />
        <TextField
          editable={false}
          keyboardType="numeric"
          title="Số lượng nhập xuất"
          keyboardType="numeric"
          value={item.quantity.toString()}
        />
        <DatePicker disabled title="Ngày thực hiện" date={item.createdAt} />
        <TextField
          editable={false}
          keyboardType="numeric"
          title="Mã kiện hàng"
          keyboardType="numeric"
          value={item.package.id}
        />
        <TextField
          editable={false}
          keyboardType="numeric"
          title="Tên kiện hàng"
          keyboardType="numeric"
          value={item.package.name}
        />
        <TextField
          editable={false}
          keyboardType="numeric"
          title="Số lượng còn lại"
          keyboardType="numeric"
          value={(item.package.quantity - item.quantity).toString()}
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
