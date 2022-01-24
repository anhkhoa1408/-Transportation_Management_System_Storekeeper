import React, { useCallback, useEffect, useState } from 'react';
import { View, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { Avatar, Text, Icon } from 'react-native-elements';
import { container } from '../../styles/layoutStyle';
import Header from '../../components/Header';
import TextField from '../../components/TextField';
import { DatePicker } from '../../components/DatePicker';
import CustomInput from '../../components/CustomInput/CustomInput';
import PillButton from '../../components/CustomButton/PillButton';
import { success } from '../../styles/color';

const EditReport = ({ navigation }) => {
  return (
    <SafeAreaView style={style.container}>
      <Header
        leftElement={
          <Icon name="west" size={30} onPress={() => navigation.goBack()} />
        }
        headerText={'Chi tiết'}
      />
      <ScrollView contentContainerStyle={style.form}>
        <TextField title="Kho" />
        <TextField title="Địa chỉ kho" />
        <TextField title="Người báo cáo" />
        <DatePicker title="Thời gian" />
        <TextField title="Tổng số lần nhập" keyboardType="numeric" />
        <TextField title="Tổng số lần xuất" keyboardType="numeric" />
        <CustomInput title="Ghi chú" />
        <PillButton
          title="Lưu"
          buttonStyle={{
            backgroundColor: success,
          }}
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

export default EditReport;
