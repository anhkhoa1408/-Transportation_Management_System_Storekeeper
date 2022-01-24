import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {
  Text,
  Icon,
  Divider,
  ListItem,
  CheckBox,
  Switch,
  Image,
} from 'react-native-elements';
import { container } from '../../styles/layoutStyle';
import Header from '../../components/Header';
import { primary, success } from '../../styles/color';
import { FONTS } from '../../styles';
import { InfoField } from '../../components/InfoField';
import ButtonSwitch from '../../components/ButtonSwitch';
import TextField from '../../components/TextField/TextField';
import img from '../../assets/images/barcode.png';

const BarcodeDetail = ({ navigation }) => {
  const [expand, setExpand] = useState(false);
  const [checked, setChecked] = useState(false);
  const [data, setData] = useState([
    {
      id: '#FOIJOJOF123',
      quantity: 10,
      current_address: 'kho Hà Nội',
    },
    {
      id: '#FOIJOJOF121',
      quantity: 10,
      current_address: 'kho Hà Nội',
    },
    {
      id: '#FOIJOJOF12f',
      quantity: 10,
      current_address: 'kho Hà Nội',
    },
    {
      id: '#FOIJOJOF12zxz',
      quantity: 10,
      current_address: 'kho Hà Nội',
    },
    {
      id: '#FOIJOJOF12aa',
      quantity: 10,
      current_address: 'kho Hà Nội',
    },
    {
      id: '#FOIJOJOF12qqe',
      quantity: 10,
      current_address: 'kho Hà Nội',
    },
  ]);
  return (
    <SafeAreaView style={style.container}>
      <Header
        leftElement={
          <Icon name="west" size={30} onPress={() => navigation.goBack()} />
        }
        headerText={'Quét mã barcode'}
        rightElement={
          <Icon
            name="check"
            size={30}
            color={primary}
            onPress={() => navigation.goBack()}
          />
        }
      />
      <View>
        <Image
          resizeMode="contain"
          source={img}
          style={{ width: '100%', height: 100 }}
        />
      </View>
      <ScrollView
        contentContainerStyle={{ padding: 20 }}
        style={style.infoContainer}>
        <Text style={FONTS.BigBold}>Thông tin gói hàng</Text>
        <View style={style.info}>
          <InfoField style={{ flex: 1 }} title="Tên" content="#CSGO112200" />
          <InfoField
            style={{ flex: 1 }}
            title="Trọng lượng"
            content="1000 kg"
          />
        </View>
        <View style={style.info}>
          <InfoField style={{ flex: 1 }} title="Còn lại" content="12" />
          <InfoField
            style={{ flex: 1 }}
            title="Thể tích"
            content="5m x 5m x 5m"
          />
        </View>
        <View style={style.info}>
          <InfoField style={{ flex: 1 }} title="Loại" content="Dễ vỡ" />
          <InfoField style={{ flex: 1 }} title="Ghi chú" content="Không có" />
        </View>
        <View style={{ marginTop: 20 }}>
          <TextField title="Số lượng" keyboardType="numeric" />
        </View>
      </ScrollView>
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
  form: {
    paddingHorizontal: 30,
    paddingVertical: 15,
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
});

export default BarcodeDetail;
