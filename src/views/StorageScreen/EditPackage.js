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

const EditPackage = ({ navigation }) => {
  return (
    <SafeAreaView style={style.container}>
      <Header
        leftElement={
          <Icon name="west" size={30} onPress={() => navigation.goBack()} />
        }
        headerText={'Chi tiết kiện hàng'}
      />
      <ScrollView contentContainerStyle={style.form}>
        <TextField title="Tên kiện hàng (tuỳ chọn)" />
        <TextField title="Vị trí đặt hàng" />
        <TextField title="Chiều dài" keyboardType="numeric" />
        <TextField title="Chiều rộng" keyboardType="numeric" />
        <TextField title="Chiều cao" keyboardType="numeric" />
        <TextField title="Cân nặng" keyboardType="numeric" />
        <TextField title="Số lượng" keyboardType="numeric" />
        <TextField title="Loại" />
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

export default EditPackage;
