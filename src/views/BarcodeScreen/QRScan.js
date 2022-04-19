import React, { useRef, useState } from 'react';
import { Alert, SafeAreaView, StyleSheet } from 'react-native';
import { RNCamera } from 'react-native-camera';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { COLORS, STYLES } from '../../styles';
import PrimaryButton from '../../components/CustomButton/PrimaryButton';
import { Icon } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { View } from 'react-native-animatable';
import ModalMess from '../../components/ModalMess';

const QRScan = ({ navigation, route }) => {
  const ref = useRef(null);
  const [flash, setFlash] = useState(false);
  const [alert, setAlert] = useState(null);
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
      <View style={styles.icon}>
        <TouchableOpacity
          onPress={() => {
            setFlash(!flash);
            console.log(1);
          }}>
          <Icon name="highlight" reverse reverseColor={COLORS.white} />
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
});
