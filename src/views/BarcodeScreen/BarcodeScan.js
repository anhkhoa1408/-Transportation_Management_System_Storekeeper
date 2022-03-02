import React, { useState } from 'react';
import BarcodeScanner from 'react-native-scan-barcode';
import { StyleSheet, Text, View, SafeAreaView, Alert } from 'react-native';
import { STYLES } from '../../styles';
import PrimaryButton from './../../components/CustomButton/PrimaryButton';

const BarcodeScan = ({ navigation }) => {
  const handleScanBarcode = e => {
    Alert.alert('aaaa', e.data);
  };

  return (
    <SafeAreaView style={[STYLES.container, { alignItems: 'stretch' }]}>
      <BarcodeScanner
        onBarCodeRead={handleScanBarcode}
        style={{ flex: 1 }}
        torchMode="off"
        cameraType="back"
      />
      {/* Temporary use to navigate */}
      <PrimaryButton
        onPress={() =>
          navigation.navigate('BarcodeDetail', {
            barcode: '61a983c312c1a70016415259',
          })
        }
        title="tiếp tục"
        containerStyle={{
          width: '50%',
          alignSelf: 'center',
        }}
      />
    </SafeAreaView>
  );
};

export default BarcodeScan;

const styles = StyleSheet.create({});
