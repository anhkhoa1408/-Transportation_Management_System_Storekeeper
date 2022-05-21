import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { Icon, Tab, TabView } from 'react-native-elements';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import QRCode from 'react-native-qrcode-svg';
import * as Bonk from 'yup';
import storageApi from '../../api/storageApi';
import PrimaryButton from '../../components/CustomButton/PrimaryButton';
import Header from '../../components/Header';
import Loading from '../../components/Loading';
import ModalMess from '../../components/ModalMess';
import TextField from '../../components/TextField/TextField';
import { COLORS } from '../../styles';
import { container } from '../../styles/layoutStyle';
import PackageInfo from './PackageInfo/PackageInfo';

const QRDetail = ({ navigation, route }) => {
  const { qr, type, shipmentData } = route?.params;
  const [data, setData] = useState([]);
  const [remainingPackage, setRemainingPackage] = useState(0);
  const [alert, setAlert] = useState(null);
  const [loading, setLoading] = useState(null);
  const [index, setIndex] = useState(0);
  const _text = type === 'import' ? 'nhập' : 'xuất';

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
          `Số lượng ${_text} vượt quá số kiện hàng cần ${_text}`,
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
          packageId: qr,
          quantity: values.packages,
          shipment: shipmentData.id,
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
          packageId: qr,
          quantity: values.packages,
          shipment: shipmentData.id,
        })
        .then(response => {
          setRemainingPackage(
            remainingPackage - Number.parseInt(values.packages),
          );
          setAlert({
            type: 'success',
            message: 'Xuất kiện hàng thành công',
          });
          setLoading(null);
        })
        .catch(error => {
          setAlert({
            type: 'danger',
            message: 'Xuất kiện hàng thất bại',
          });
          setLoading(null);
        });
    }
  };

  useEffect(() => {
    if (shipmentData && qr) {
      let data = shipmentData.packages.find(item => item.id === qr);
      setData(data);
      const _received = data.received ? data.received : 0;
      if (type === 'import') setRemainingPackage(_received);
      else setRemainingPackage(data.quantity - _received);
      // shipmentApi
      //   .shipmentItemDetail(shipPack.id)
      //   .then(response => {
      //     setShipmentItem(response);
      //     if (type === 'import')
      //       setRemainingPackage(response.quantity - response.received);
      //     else if (type === 'export')
      //       setRemainingPackage(response.quantity - response.export_received);
      //   })
      //   .catch(err => {
      //     setAlert({
      //       type: 'danger',
      //       message: 'Lấy thông tin kiện hàng thất bại',
      //     });
      //   });
    }
  }, []);

  return (
    <SafeAreaView style={style.container}>
      {alert && (
        <ModalMess
          alert={alert}
          setAlert={_alert => {
            setAlert(_alert);
            if (alert.type === 'success')
              navigation.navigate({
                name: 'VehicleDetail',
                merge: true,
              });
          }}
          type={alert.type}
          message={alert.message}
        />
      )}
      {loading}
      <Header
        leftElement={
          <Icon name="west" size={30} onPress={() => navigation.goBack()} />
        }
        headerText={'Thông tin mã QR'}
      />
      <KeyboardAwareScrollView enableAutomaticScroll enableOnAndroid>
        <View style={{ paddingHorizontal: 15, height: 62 }}>
          <Tab
            value={index}
            onChange={e => setIndex(e)}
            indicatorStyle={{
              height: 0,
            }}>
            <Tab.Item
              title="QR code"
              titleStyle={{ fontSize: 12, color: COLORS.primary }}
              containerStyle={{
                backgroundColor: COLORS.gray,
                borderTopLeftRadius: 20,
                borderBottomLeftRadius: 20,
              }}
              buttonStyle={[
                { padding: 3 },
                index === 0 ? [style.activeTab] : [style.inactiveTab],
              ]}
            />
            <Tab.Item
              title="Kiện hàng"
              titleStyle={{ fontSize: 12, color: COLORS.primary }}
              containerStyle={[
                {
                  backgroundColor: COLORS.gray,
                  borderTopRightRadius: 20,
                  borderBottomRightRadius: 20,
                },
              ]}
              buttonStyle={[
                { padding: 3 },
                index === 1 ? [style.activeTab] : [style.inactiveTab],
              ]}
            />
          </Tab>
        </View>

        <TabView value={index} onChange={setIndex} animationType="spring">
          <TabView.Item style={{ width: '100%', paddingVertical: 30 }}>
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <QRCode size={250} value={qr} />
            </View>
          </TabView.Item>
          <TabView.Item style={{ width: '100%' }}>
            <PackageInfo
              data={data}
              formik={formik}
              remainingPackage={remainingPackage}
              type={type}
            />
          </TabView.Item>
        </TabView>
        <View style={style.inputContainer}>
          <TextField
            title={`Số lượng ${type === 'import' ? 'nhập' : 'xuất'}`}
            afterText="kiện"
            value={formik.values.packages.toString()}
            error={formik.touched.packages && formik.errors.packages}
            errorMessage={formik.errors.packages}
            onChangeText={text => formik.setFieldValue('packages', text)}
            onBlur={() => formik.setFieldTouched('packages')}
            keyboardType="numeric"
          />
          <PrimaryButton title="Thực hiện" onPress={formik.submitForm} />
        </View>
      </KeyboardAwareScrollView>
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
  infoPackages: {
    backgroundColor: COLORS.gray,
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  activeTab: {
    backgroundColor: COLORS.white,
    margin: 8,
    marginHorizontal: 5,
    borderRadius: 16,
  },
  inactiveTab: {
    backgroundColor: '#F1F1FA',
    margin: 8,
    marginHorizontal: 5,
  },
  inputContainer: {
    paddingHorizontal: 20,
  },
});

export default QRDetail;
