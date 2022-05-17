import React, { useRef, useState } from 'react';
import { Alert, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native';
import { RNCamera } from 'react-native-camera';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { COLORS, STYLES } from '../../styles';
import PrimaryButton from '../../components/CustomButton/PrimaryButton';
import { Icon, Overlay, Text } from 'react-native-elements';
import { View } from 'react-native-animatable';
import ModalMess from '../../components/ModalMess';
import TextField from '../../components/TextField';
import { useFormik } from 'formik';
import * as Bonk from 'yup';

const QRScan = ({ navigation, route }) => {
  const ref = useRef(null);
  const [flash, setFlash] = useState(false);
  const [inputQr, setInput] = useState('');
  const [alert, setAlert] = useState(null);
  const [modal, setModal] = useState(false);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      inputQr,
    },
    validationSchema: Bonk.object({
      inputQr: Bonk.string().required('Bạn chưa nhập mã QR'),
    }),
    onSubmit: values => {
      handleSubmitBarcode(values);
    },
  });

  const handleScanBarcode = e => {
    if (route?.params?.shipmentData) {
      let { packages } = route.params.shipmentData;
      let isPackageExist =
        packages.findIndex(item => item.id === e.data) !== -1;

      if (isPackageExist) {
        navigation.navigate('QRDetail', {
          ...route.params,
          qr: e.data,
        });
      } else {
        setAlert({
          type: 'danger',
          message: 'Mã QR của kiện hàng không thuộc xe vận chuyển, xin thử lại',
        });
      }
    }
    ref.current.reactivate();
  };

  const handleSubmitBarcode = ({ inputQr }) => {
    setModal(false)
    if (route?.params?.shipmentData) {
      let { packages } = route.params.shipmentData;
      let isPackageExist = packages.findIndex(item => item.id === inputQr) !== -1;
      if (isPackageExist) {
        navigation.navigate('QRDetail', {
          ...route.params,
          qr: inputQr,
        });
      } else {
        setAlert({
          type: 'danger',
          message: 'Mã QR của kiện hàng không thuộc xe vận chuyển, xin thử lại',
        });
      }
    }
  };

  const ModalInput = () => {
    return (
      <Overlay
        backdropStyle={{
          width: '100%',
          height: '100%',
          backgroundColor: COLORS.backdropColor,
          opacity: 0.6,
        }}
        overlayStyle={{
          width: '80%',
          borderRadius: 12,
          paddingVertical: 22,
          paddingHorizontal: 15,
        }}
        visible={modal}>
        <TouchableOpacity style={{alignSelf: 'flex-end'}} onPress={() => setModal(false)}>
          <Icon
            name="close"
            size={14}
            color={COLORS.gray}
            reverseColor={COLORS.red}
            reverse
            containerStyle={styles.closeIcon}
          />
        </TouchableOpacity>
        <TextField
          title="Mã QR"
          value={formik.values.inputQr}
          onChangeText={(text) => formik.setFieldValue("inputQr", text)}
          error={formik.touched.inputQr && formik.errors.inputQr}
          errorMessage="Bạn chưa nhập mã QR"
        />
        <PrimaryButton title="Xác nhận" onPress={formik.submitForm} />
      </Overlay>
    );
  };

  return (
    <SafeAreaView style={[STYLES.container, { alignItems: 'stretch' }]}>
      {alert && (
        <ModalMess
          type={alert.type}
          message={alert.message}
          alert={alert}
          setAlert={setAlert}
        />
      )}
      <ModalInput />
      <View style={styles.icon}>
        <TouchableOpacity
          onPress={() => {
            setFlash(!flash);
            console.log(1);
          }}>
          <Icon name="highlight" reverse reverseColor={COLORS.white} />
        </TouchableOpacity>
      </View>
      <View style={[styles.icon, { top: 90 }]}>
        <TouchableOpacity
          onPress={() => {
            setModal(!modal);
            // console.log(1);
          }}>
          <Icon name="edit" reverse reverseColor={COLORS.white} />
        </TouchableOpacity>
      </View>
      <QRCodeScanner
        ref={ref}
        onRead={handleScanBarcode}
        flashMode={
          flash
            ? RNCamera.Constants.FlashMode.torch
            : RNCamera.Constants.FlashMode.off
        }
        showMarker
        markerStyle={{
          borderColor: COLORS.primary,
          borderWidth: 2,
          borderStyle: 'dashed',
        }}
        cameraStyle={{
          height: '100%',
        }}
      />
      {/* <PrimaryButton
        onPress={() =>
          navigation.navigate('QRDetail', {
            ...route.params,
            qr: '62584c937f4eb710c0879c5e',
          })
        }
        title="tiếp tục"
        containerStyle={{
          width: '50%',
          alignSelf: 'center',
        }}
      /> */}
    </SafeAreaView>
  );
};

export default QRScan;

const styles = StyleSheet.create({
  icon: {
    position: 'absolute',
    top: 10,
    right: 0,
    elevation: 10,
    zIndex: 99999,
  },
  closeIcon: {
    padding: 0,
    margin: 0
  },
  
  // title: {
  //   fontSize: 20,
  //   marginBottom: 10,
  //   fontWeight:
  // }
});
