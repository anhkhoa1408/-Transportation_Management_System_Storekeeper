import React, { memo } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-elements';
import { InfoField } from '../../../components/InfoField';
import { COLORS } from '../../../styles';
import { convertPackageType } from '../../../utils/convertPackageType';

const PackageInfo = ({ data, remainingPackage, type }) => {
  return (
    <View style={{ paddingHorizontal: 20, paddingVertical: 10 }}>
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
          <InfoField style={{ flex: 1 }} title="Mã QR" content={data.id} />
        </View>
        <View style={style.info}>
          <InfoField
            style={{ flex: 1 }}
            title={`Số lượng cần ${type === 'import' ? 'nhập' : 'xuất'}`}
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
          <InfoField
            style={{ flex: 1 }}
            title="Trọng lượng"
            content={data.weight + ' kg'}
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
