import React, { useState } from 'react';
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
import Loading from './../../components/Loading';
import ModalMess from './../../components/ModalMess';
import { KeyboardAvoidingView } from 'react-native';

const EditReport = ({ navigation, route }) => {
  const [item, setItem] = useState(route?.params);
  const [loading, setLoading] = useState(null);
  const [alert, setAlert] = useState(null);

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
    setLoading(<Loading />);
    storageApi
      .editReport(item.id, values)
      .then(response => {
        setLoading(null);
        setAlert(
          <ModalMess
            type="success"
            message="Cập nhật thành công"
            alert={alert}
            setAlert={setAlert}
          />,
        );
        setItem({ ...item, ...response });
      })
      .catch(errors => {
        setLoading(null);
        setAlert(
          <ModalMess
            type="danger"
            message="Cập nhật thất bại"
            alert={alert}
            setAlert={setAlert}
          />,
        );
      });
  };

  return (
    <SafeAreaView style={style.container}>
      {loading}
      {alert}
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
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior="padding"
        keyboardVerticalOffset={0}>
        <ScrollView contentContainerStyle={style.form}>
          <TextField
            disabled
            editable={false}
            title="Kho"
            value={item.storage.name}
          />
          <TextField
            disabled
            editable={false}
            title="Đường"
            textAlign="left"
            value={item.storage.address.street}
          />
          <TextField
            disabled
            editable={false}
            title="Quận"
            textAlign="left"
            value={item.storage.address.province}
          />
          <TextField
            disabled
            editable={false}
            title="Huyện"
            textAlign="left"
            value={item.storage.address.ward}
          />
          <TextField
            disabled
            editable={false}
            title="Thành phố"
            textAlign="left"
            value={item.storage.address.city}
          />
          <TextField
            disabled
            editable={false}
            disabled
            title="Người báo cáo"
            value={item.stocker.name}
          />
          <DatePicker disabled title="Ngày cập nhật" date={item.updatedAt} />
          <TextField
            title="Tổng số lần nhập"
            afterText="lần"
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
            afterText="lần"
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
      </KeyboardAvoidingView>
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
