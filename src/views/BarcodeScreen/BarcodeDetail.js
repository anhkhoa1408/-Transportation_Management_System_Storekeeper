import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Dimensions,
  KeyboardAvoidingView,
} from 'react-native';
import { Text, Icon } from 'react-native-elements';
import { container } from '../../styles/layoutStyle';
import Header from '../../components/Header';
import { COLORS, FONTS } from '../../styles';
import { InfoField } from '../../components/InfoField';
import TextField from '../../components/TextField/TextField';
import Barcode from 'react-native-barcode-builder';
import { convertPackageType } from '../../utils/convertPackageType';
import packageApi from '../../api/packageApi';
import storageApi from '../../api/storageApi';
import { useFormik } from 'formik';
import * as Bonk from 'yup';
import ModalMess from './../../components/ModalMess';
import Loading from './../../components/Loading';
import PrimaryButton from './../../components/CustomButton/PrimaryButton';

const width = Dimensions.get('screen').width;

const BarcodeDetail = ({ navigation, route }) => {
  const { barcode, type } = route?.params;
  const [data, setData] = useState([]);
  const [remainingPackage, setRemainingPackage] = useState(0);
  const [alert, setAlert] = useState(null);
  const [loading, setLoading] = useState(null);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      packages: 0,
    },
    validationSchema: Bonk.object({
      packages: Bonk.number()
        .required('Chưa thêm số lượng kiện hàng')
        .min(1, 'Số lượng phải lớn hơn 0')
        .test(
          'package-test',
          'Số lượng vượt quá số kiện hàng còn lại',
          function checkExceedQuantity(quantity) {
            return quantity > remainingPackage ? false : true;
          },
        ),
    }),
    onSubmit: values => handleUpdate(values),
  });

  const handleUpdate = values => {
    setLoading(<Loading />);
    if (type === 'import') {
      storageApi
        .updateImportQuantityByPackage({
          packageId: barcode,
          quantity:
            data.quantity - remainingPackage + Number.parseInt(values.packages),
        })
        .then(response => {
          setRemainingPackage(
            remainingPackage - Number.parseInt(values.packages),
          );
          setAlert({
            type: 'success',
            message: 'Nhập kiện hàng thành công',
          });
          setLoading(null);
        })
        .catch(error => {
          setAlert({
            type: 'danger',
            message: 'Nhập kiện hàng thất bại',
          });
          setLoading(null);
        });
    } else if (type === 'export') {
      storageApi
        .updateExportQuantityByPackage({
          packageId: barcode,
          quantity:
            data.quantity - remainingPackage + Number.parseInt(values.packages),
        })
        .then(response => {
          setRemainingPackage(
            remainingPackage - Number.parseInt(values.packages),
          );
          setAlert({
            type: 'success',
            message: 'Nhập kiện hàng thành công',
          });
          setLoading(null);
        })
        .catch(error => {
          setAlert({
            type: 'danger',
            message: 'Nhập kiện hàng thất bại',
          });
          setLoading(null);
        });
    }
  };

  useEffect(() => {
    if (barcode) {
      setLoading(<Loading />);
      packageApi
        .getScannedPackage(barcode, {
          type: type === 'import' ? 0 : 1,
        })
        .then(response => {
          setLoading(null);
          setData(response);
          setRemainingPackage(response.remainingPackage);
        })
        .catch(error => {
          setLoading(null);
          setAlert({
            type: 'danger',
            message: 'Có lỗi xảy ra, vui lòng thử lại sau',
          });
        });
    }
  }, []);

  return (
    <SafeAreaView style={style.container}>
      {alert && (
        <ModalMess
          alert={alert}
          setAlert={setAlert}
          type={alert.type}
          message={alert.message}
        />
      )}
      {loading}
      <Header
        leftElement={
          <Icon name="west" size={30} onPress={() => navigation.goBack()} />
        }
        headerText={'Thông tin barcode'}
      />
      <View
        style={[
          {
            alignSelf: 'center',
          },
        ]}>
        <Text
          style={{
            alignSelf: 'center',
          }}>
          <Barcode
            width={1}
            text={barcode}
            value={barcode}
            format="CODE128"
            onError={error => console.log(error)}
          />
        </Text>
      </View>
      <KeyboardAvoidingView
        enabled
        behavior="padding"
        keyboardVerticalOffset={0}
        style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={{ paddingHorizontal: 20 }}
          style={style.infoContainer}>
          <Text style={[{ fontSize: 20, marginBottom: 10 }]}>
            Thông tin kiện hàng
          </Text>
          <View style={[style.infoPackages]}>
            <View style={style.info}>
              <InfoField
                style={{ flex: 1 }}
                title="Tên"
                content={!data.name && 'Không có'}
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
                title="Số lượng còn lại"
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
          <View style={{ marginTop: 20 }}>
            <TextField
              title={`Số lượng ${type === 'import' ? 'nhập' : 'xuất'}`}
              value={formik.values.packages.toString()}
              onChangeText={text => formik.setFieldValue('packages', text)}
              onBlur={() => formik.setFieldTouched('packages')}
              keyboardType="numeric"
              afterText="kiện"
              error={formik.touched.packages && formik.errors.packages}
              errorMessage={formik.errors.packages}
            />
          </View>
          <PrimaryButton title="Thực hiện" onPress={formik.submitForm} />
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
  info: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 15,
  },
  infoContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    padding: 10,
    marginVertical: 20,
  },
  barcode: {
    transform: [
      {
        translateX: 0.15 * width,
      },
    ],
  },
  infoPackages: {
    backgroundColor: COLORS.gray,
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
});

export default BarcodeDetail;
