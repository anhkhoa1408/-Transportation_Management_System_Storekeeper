import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { Icon, Text } from 'react-native-elements';
import QRCode from 'react-native-qrcode-svg';
import * as Bonk from 'yup';
import packageApi from '../../api/packageApi';
import storageApi from '../../api/storageApi';
import Header from '../../components/Header';
import { InfoField } from '../../components/InfoField';
import TextField from '../../components/TextField/TextField';
import { COLORS } from '../../styles';
import { container } from '../../styles/layoutStyle';
import { convertPackageType } from '../../utils/convertPackageType';
import PrimaryButton from '../../components/CustomButton/PrimaryButton';
import Loading from '../../components/Loading';
import ModalMess from '../../components/ModalMess';
import { Tab, TabView } from 'react-native-elements';
import PackageInfo from './PackageInfo/PackageInfo';

const QRDetail = ({ navigation, route }) => {
  const { qr, type } = route?.params;
  const [data, setData] = useState([]);
  const [remainingPackage, setRemainingPackage] = useState(0);
  const [alert, setAlert] = useState(null);
  const [loading, setLoading] = useState(null);
  const [index, setIndex] = useState(0);

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
    console.log(
      values,
      qr,
      data.quantity - remainingPackage + Number.parseInt(values.packages),
    );

    setLoading(<Loading />);
    if (type === 'import') {
      storageApi
        .updateImportQuantityByPackage({
          packageId: qr,
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
          packageId: qr,
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
    if (qr) {
      setLoading(<Loading />);
      packageApi
        .getScannedPackage(qr, {
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
        headerText={'Thông tin mã QR'}
      />

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
        <TabView.Item style={{ width: '100%' }}>
          <View
            style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
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
});

export default QRDetail;
