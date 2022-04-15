import React, { useRef, useState } from 'react';
import { Alert, SafeAreaView, StyleSheet } from 'react-native';
import { RNCamera } from 'react-native-camera';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { COLORS, STYLES } from '../../styles';
import PrimaryButton from '../../components/CustomButton/PrimaryButton';
import { Icon } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { View } from 'react-native-animatable';

const QRScan = ({ navigation, route }) => {
  const ref = useRef(null);
  const [flash, setFlash] = useState(false);
  const handleScanBarcode = e => {
    ref.current.reactivate()
    console.log(e.data)
    navigation.navigate('QRDetail', {
      ...route.params,
      qr: e.data,
    });
  };

  return (
    <SafeAreaView style={[STYLES.container, { alignItems: 'stretch' }]}>
      <View style={styles.icon}>
        <TouchableOpacity
          onPress={() => {
            setFlash(!flash);
            console.log(1);
          }}>
          <Icon
            name="highlight"
            reverse
            reverseColor={COLORS.white}
            // containerStyle={styles.icon}
          />
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
      <PrimaryButton
        onPress={() =>
          navigation.navigate('QRDetail', {
            ...route.params,
            qr: '624bbb47e68d1a14e46f7809',
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

export default QRScan;

const styles = StyleSheet.create({
  icon: {
    position: 'absolute',
    top: 10,
    right: 0,
    elevation: 10,
    zIndex: 99999
  },
});
