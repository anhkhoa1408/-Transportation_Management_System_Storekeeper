import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Text, Icon, Divider, ListItem, CheckBox } from 'react-native-elements';
import { container } from '../../styles/layoutStyle';
import Header from '../../components/Header';
import { FONTS, COLORS } from '../../styles';
import { InfoField } from '../../components/InfoField';
import ButtonSwitch from '../../components/ButtonSwitch';
import BarcodeScanner from 'react-native-scan-barcode';

const VehicleDetail = ({ navigation, route }) => {
  const [expand, setExpand] = useState(true);
  const [checked, setChecked] = useState(false);
  const [data, setData] = useState([
    {
      id: '#FOIJOJOF123',
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
        headerText={'Chi tiết chuyến xe'}
        rightElement={
          <Icon
            name="check"
            size={30}
            color={COLORS.primary}
            onPress={() => navigation.goBack()}
          />
        }
      />
      <View style={{ paddingHorizontal: 20 }}>
        <View style={style.vehicle}>
          <Icon
            containerStyle={{
              margin: 0,
              marginRight: 30,
              backgroundColor: '#FFF',
              padding: 15,
              elevation: 5,
              borderRadius: 20,
            }}
            name="truck"
            type="font-awesome"
            color="#f50"
          />
          <View style={{ flex: 1 }}>
            <Text style={[FONTS.BigBold]}>89C.121.12</Text>
            <Text style={[FONTS.Smol]}>Người lái: Uchiha Madara</Text>
            <Text style={[FONTS.Smol]}>Phụ xe: Uchiha Obito</Text>
          </View>
          <View
            style={{
              backgroundColor: COLORS.primary,
              padding: 10,
              borderRadius: 20,
            }}>
            <Icon
              name="camera"
              type="font-awesome"
              color="#FFF"
              onPress={() => navigation.navigate('BarcodeScan', route.params)}
            />
          </View>
        </View>
        <View style={style.vehicle}>
          <InfoField
            style={{ flex: 1 }}
            title="Đến"
            content="183/14 Bùi Viện"
          />
          <InfoField
            style={{ flex: 1 }}
            title="Tổng khối lượng"
            content="5000 kg"
          />
        </View>
        <Divider color={COLORS.primary} width={2} />
        <ListItem.Accordion
          bottomDivider
          containerStyle={{
            padding: 20,
          }}
          activeOpacity={0.95}
          content={
            <ListItem.Content>
              <Text style={{ ...FONTS.Big }}>Danh sách kiện hàng</Text>
            </ListItem.Content>
          }
          isExpanded={expand}
          onPress={() => {
            setExpand(!expand);
          }}>
          <ScrollView
            style={{ height: '50%' }}
            contentContainerStyle={{ padding: 10 }}>
            {data.map((item, index) => (
              <TouchableOpacity
                activeOpacity={0.9}
                key={item.id}
                onPress={() => navigation.navigate('EditPackage')}>
                <View
                  key={item.id}
                  style={{
                    paddingVertical: 15,
                    paddingHorizontal: 15,
                    marginVertical: 15,
                    borderRadius: 20,
                    backgroundColor: '#FFF',
                    elevation: 2,
                  }}>
                  <View style={{ ...style.vehicle }}>
                    <Icon
                      containerStyle={{
                        margin: 0,
                        marginRight: 5,
                        backgroundColor: '#FFF',
                        padding: 15,
                        elevation: 5,
                        borderRadius: 20,
                      }}
                      name="archive"
                      type="font-awesome"
                      color={COLORS.primary}
                    />
                    <View
                      style={{
                        flex: 1,
                        marginLeft: 10,
                        alignItems: 'flex-start',
                      }}>
                      <Text style={{ ...FONTS.BigBold }}>ID: {item.id}</Text>
                      <Text style={{ ...FONTS.Medium }}>
                        Số lượng:{' '}
                        <Text style={{ ...style.info }}>
                          {item.quantity}/100
                        </Text>
                      </Text>
                      <Text style={{ ...FONTS.Medium }}>
                        Địa điểm hiện tại:{' '}
                        <Text style={{ ...style.info }}>
                          {item.current_address}
                        </Text>
                      </Text>
                    </View>
                    <CheckBox
                      containerStyle={{ padding: 0 }}
                      checkedIcon="dot-circle-o"
                      uncheckedIcon="circle-o"
                      checked={true}
                    />
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </ListItem.Accordion>
        <ListItem
          containerStyle={{
            padding: 20,
          }}>
          <ListItem.Content
            style={{
              display: 'flex',
              flexDirection: 'row',
            }}>
            <ListItem.Title style={{ flex: 1, ...FONTS.Big }}>
              In kèm barcode
            </ListItem.Title>
            <ButtonSwitch
              checked={checked}
              onValueChange={() => setChecked(!checked)}
            />
          </ListItem.Content>
        </ListItem>

        <Divider color={COLORS.primary} width={2} />
      </View>
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
  vehicle: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 15,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3,
  },
  smolText: {
    fontSize: 12,
    marginVertical: 1,
  },
  bigText: {
    fontSize: 16,
    marginBottom: 5,
  },
});

export default VehicleDetail;
