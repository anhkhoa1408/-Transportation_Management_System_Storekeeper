import React from 'react';
import { Alert, SafeAreaView, StyleSheet } from 'react-native';
import { RNCamera } from 'react-native-camera';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { COLORS, STYLES } from '../../styles';
import PrimaryButton from '../../components/CustomButton/PrimaryButton';

const QRScan = ({ navigation, route }) => {
  const handleScanBarcode = e => {
    navigation.navigate('QRDetail', {
      ...route.params,
      qr: e.data,
    });
  };

  return (
    <SafeAreaView style={[STYLES.container, { alignItems: 'stretch' }]}>
      <QRCodeScanner
        onRead={handleScanBarcode}
        // flashMode={RNCamera.Constants.FlashMode.torch}
        showMarker
        markerStyle={{
          borderColor: COLORS.primary,
          borderWidth: 4,
          borderStyle: 'dashed',
        }}
        cameraStyle={{
          height: '100%',
        }}
      />
      {/* <PrimaryButton
        onPress={() =>
          navigation.navigate('QRDetail', {
            qr: '622b6b1e7c7ace0016d96353',
            ...route.params,
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

const styles = StyleSheet.create({});
