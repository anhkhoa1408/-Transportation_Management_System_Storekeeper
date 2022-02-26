import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { Icon, Text } from 'react-native-elements';
import { container } from '../../styles/layoutStyle';
import Header from '../../components/Header';
import TextField from '../../components/TextField';
import { DatePicker } from '../../components/DatePicker';
import CustomInput from '../../components/CustomInput/CustomInput';
import { COLORS } from '../../styles/index';
import * as Bonk from 'yup';
import { useFormik } from 'formik';
import storageApi from '../../api/storageApi';

const EditReport = ({ navigation, route }) => {
  const [item, setItem] = useState(route?.params);
  console.log(item.note);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: item,
    validationSchema: Bonk.object({
      total_import: Bonk.string().required('Số lần nhập không thể trống'),
      total_export: Bonk.string().required('Số lần xuất không thể trống'),
    }),
    onSubmit: values => {
      handleUpdate(values);
    },
  });

  const handleUpdate = values => {
    storageApi
      .editReport(item.id, values)
      .then(response => setItem({ ...item, ...response }))
      .catch(errors => console.log(errors));
  };

  return (
    <SafeAreaView style={style.container}>
      <Header
        leftElement={
          <Icon name="west" size={30} onPress={() => navigation.goBack()} />
        }
        headerText={'Chi tiết'}
        rightElement={
          <Icon
            name="check"
            size={30}
            color={COLORS.primary}
            onPress={formik.submitForm}
          />
        }
      />
      <ScrollView contentContainerStyle={style.form}>
        <TextField editable={false} title="Kho" value={item.storage.name} />
        <TextField
          editable={false}
          title="Địa chỉ kho"
          value={Object.values(item.storage.address).slice(1, 5).join(', ')}
        />
        <TextField
          editable={false}
          disabled
          title="Người báo cáo"
          value={item.stocker.name}
        />
        <DatePicker disabled title="Ngày cập nhật" date={item.updatedAt} />
        <TextField
          title="Tổng số lần nhập"
          keyboardType="numeric"
          onChangeText={text => formik.setFieldValue('total_import', text)}
          value={formik.values.total_import.toString()}
        />
        {formik.touched.total_import && formik.errors.total_import ? (
          <Text
            style={{
              color: COLORS.danger,
              marginBottom: 15,
              fontWeight: 'bold',
            }}>
            {formik.errors.total_import}
          </Text>
        ) : null}
        <TextField
          title="Tổng số lần xuất"
          keyboardType="numeric"
          onChangeText={text => formik.setFieldValue('total_export', text)}
          value={formik.values.total_export.toString()}
        />
        {formik.touched.total_export && formik.errors.total_export ? (
          <Text
            style={{
              color: COLORS.danger,
              marginBottom: 15,
              fontWeight: 'bold',
            }}>
            {formik.errors.total_export}
          </Text>
        ) : null}
        <CustomInput
          title="Ghi chú"
          onChangeText={text => formik.setFieldValue('note', text)}
          value={formik.values.note}
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
