import React, { memo } from 'react';
import {
  KeyboardAvoidingView,
  ScrollView,
  View,
  StyleSheet,
} from 'react-native';
import { Text } from 'react-native-elements';
import PrimaryButton from '../../../components/CustomButton/PrimaryButton';
import { convertPackageType } from '../../../utils/convertPackageType';
import { InfoField } from '../../../components/InfoField';
import TextField from '../../../components/TextField/TextField';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { COLORS } from '../../../styles';

const PackageInfo = ({ data, formik, remainingPackage, type }) => {
  return (
    <View style={{paddingHorizontal: 20, paddingVertical: 10}}>
      <Text style={[{ fontSize: 15, marginBottom: 10 }]}>
        Thông tin kiện hàng
      </Text>
      <View style={[style.infoPackages]}>
        <View style={style.info}>
          <InfoField
            style={{ flex: 1 }}
            title="Tên"
            content={data.name || 'Chưa đặt tên'}
          />
          <InfoField
            style={{ flex: 1 }}
            title="Trọng lượng"
            content={data.weight + ' kg'}
          />
        </View>
        <View style={style.info}>
          <InfoField
            style={{ flex: 1 }}
            title="Số lượng cần nhập"
            content={remainingPackage + ' kiện'}
          />
          <InfoField
            style={{ flex: 1 }}
            title="Thể tích"
            content={`${data?.size?.len}m x ${data?.size?.width}m x ${data?.size?.height}m`}
          />
        </View>
        <View style={style.info}>
          <InfoField
            style={{ flex: 1 }}
            title="Loại"
            content={convertPackageType(data?.package_type?.package_type)}
          />
        </View>
      </View>
    </View>
  );
};

export default memo(PackageInfo);

const style = StyleSheet.create({
  info: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginVertical: 15,
  },
  infoContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    paddingHorizontal: 10,
    paddingTop: 20,
  },
  infoPackages: {
    backgroundColor: COLORS.gray,
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
});
