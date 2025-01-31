import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { CheckBox, Divider, Icon, ListItem, Text } from 'react-native-elements';
import shipmentApi from '../../api/shipmentAPI';
import ButtonSwitch from '../../components/ButtonSwitch';
import Header from '../../components/Header';
import { InfoField } from '../../components/InfoField';
import { COLORS, FONTS } from '../../styles';
import { container } from '../../styles/layoutStyle';

const VehicleDetail = ({ navigation, route }) => {
  const { shipmentId, licence, type } = route.params;
  const [expand, setExpand] = useState(true);
  const [checked, setChecked] = useState(false);
  const [data, setData] = useState({ packages: [] });

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      shipmentApi
        .shipmentDetail(shipmentId)
        .then(data => {
          data.shipment_items.forEach(item => {
            let pkg = data.packages.find(
              _package => _package.id === item.package,
            );
            if (type === 'import')
              if (item.assmin) {
                pkg.received =
                  item.export_received - (item.received ? item.received : 0);
              } else {
                pkg.received =
                  item.quantity - (item?.received ? item.received : 0);
              }
            if (type === 'export') {
              if (item.assmin) {
                pkg.received = item.export_received;
                if (item.quantity > 0) pkg.needToExport = item.quantity;
              } else {
                pkg.throw = item.quantity;
              }
            }
          });
          data.packages.filter(item => item.received);
          setData(data);
        })
        .catch(err => console.log(err));
    });
    return unsubscribe;
  }, [navigation]);

  const finishShipment = () => {
    shipmentApi
      .finishShipment(shipmentId)
      .then(data => navigation.goBack())
      .catch(err => console.log(err));
  };

  return (
    <SafeAreaView style={style.container}>
      <Header
        leftElement={
          <Icon name="west" size={30} onPress={() => navigation.goBack()} />
        }
        headerText={'Chi tiết chuyến xe'}
        rightElement={
          type === 'import' && (
            <Icon
              name="check"
              size={30}
              color={COLORS.primary}
              onPress={() => finishShipment()}
            />
          )
        }
      />
      <View style={{ paddingHorizontal: 20 }}>
        <View style={style.vehicle}>
          <Icon
            containerStyle={{
              margin: 0,
              marginRight: 20,
              backgroundColor: '#FFF',
              padding: 15,
              elevation: 8,
              borderRadius: 20,
              shadowColor: COLORS.primary,
            }}
            name="truck"
            type="font-awesome"
            color="#f50"
          />
          <View style={{ flex: 1 }}>
            <Text style={[FONTS.BigBold]}>{licence}</Text>
            <Text style={[FONTS.Smol]}>Người lái: {data?.driver?.name}</Text>
            <Text style={[FONTS.Smol]}>Phụ xe: {data?.assistance?.name}</Text>
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
              onPress={() =>
                navigation.navigate('QRScan', {
                  ...route.params,
                  shipmentData: data,
                })
              }
            />
          </View>
        </View>
        <View style={[style.vehicle, { alignItems: 'flex-start' }]}>
          <InfoField
            style={{ flex: 1 }}
            title="Đến"
            content={`${data?.to_address?.ward}, ${data?.to_address?.city}`}
          />
          <InfoField
            style={{ flex: 1 }}
            title="Tổng khối lượng"
            content={data.total_weight + ' kg'}
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
          {/* Package list */}
          <ScrollView
            style={{ height: '50%' }}
            contentContainerStyle={{ padding: 10 }}>
            {data.packages.map((item, index) => (
              <TouchableOpacity
                activeOpacity={0.9}
                key={item.id}
                onPress={() =>
                  navigation.navigate('EditPackage', {
                    ...route.params,
                    shipmentData: data,
                    item,
                  })
                }>
                <View key={item.id} style={style.package}>
                  <View style={{ ...style.vehicle }}>
                    <Icon
                      containerStyle={{
                        margin: 0,
                        marginRight: 5,
                        backgroundColor: '#FFF',
                        shadowColor: COLORS.primary,
                        padding: 15,
                        elevation: 5,
                        borderRadius: 20,
                        alignSelf: 'flex-start',
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
                      <Text style={{ ...FONTS.BigBold }}>
                        {item.name ? item.name : item.id}
                      </Text>
                      {/* <Text style={{ ...FONTS.Medium }}>
                        Số lượng:{' '}
                        <Text style={{ ...style.info }}>{item.quantity}</Text>
                      </Text> */}
                      {item.needToExport >= 0 && (
                        <Text style={{ ...FONTS.Medium }}>
                          Cần xuất:{' '}
                          <Text style={{ ...style.info }}>
                            {item.needToExport -
                              (item.received ? item.received : 0)}
                          </Text>
                        </Text>
                      )}
                      {item.received >= 0 && (
                        <Text style={{ ...FONTS.Medium }}>
                          Trong xe:{' '}
                          <Text style={{ ...style.info }}>
                            {item.received - (item.throw ? item.throw : 0)}
                          </Text>
                        </Text>
                      )}
                      {item.throw >= 0 && (
                        <Text style={{ ...FONTS.Medium }}>
                          Đã giao:{' '}
                          <Text style={{ ...style.info }}>{item.throw}</Text>
                        </Text>
                      )}
                      {/* <Text style={{ ...FONTS.Medium }}>
                        Địa điểm hiện tại:{' '}
                        <Text style={{ ...style.info }}>{item.position}</Text>
                      </Text> */}
                    </View>
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
              In kèm QR
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
  package: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    marginVertical: 8,
    borderRadius: 8,
    backgroundColor: COLORS.white,
    shadowColor: COLORS.primary,
    elevation: 10,
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
