import React, { useRef, useState } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  SafeAreaView,
  TouchableWithoutFeedback,
  VirtualizedList,
} from 'react-native';
import { Text, ListItem, Icon, CheckBox } from 'react-native-elements';
import CustomSearch from '../../components/CustomSearch/CustomSearch';
import { container } from '../../styles/layoutStyle';
import Header from '../../components/Header';
import { COLORS } from '../../styles';
import * as Animatable from 'react-native-animatable';
import shipmentApi from '../../api/shipmentAPI';
import Loading from './../../components/Loading';

const VehicleList = ({ navigation, route }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(<Loading />);

  const { type } = route.params;

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      const getShipment =
        type === 'import' ? shipmentApi.import : shipmentApi.export;
      getShipment()
        .then(data => {
          setData(data);
          setLoading(null);
        })
        .catch(err => {
          setLoading(null);
          console.log(err);
        });
    });
    return unsubscribe;
  }, [navigation]);

  const ref = useRef([]);

  const handlePress = async (index, shipmentId, licence) => {
    await ref[index].animate({
      0: {
        scale: 1,
      },
      0.5: {
        scale: 0.9,
      },
      1: {
        scale: 1,
      },
    });
    navigation.navigate('VehicleDetail', { type, shipmentId, licence });
  };

  const renderItem = ({ item, index }) => (
    <Animatable.View
      ref={ele => (ref[index] = ele)}
      duration={500}
      easing="ease">
      <TouchableWithoutFeedback
        onPress={() => handlePress(index, item.id, item.licence)}>
        <ListItem containerStyle={style.storeItem}>
          <View
            style={{
              backgroundColor: 'rgba(255,255,255,0.6)',
              padding: 10,
              borderRadius: 15,
            }}>
            <Icon
              size={30}
              name="local-shipping"
              iconStyle={{
                color: '#FFF',
              }}
              containerStyle={{
                backgroundColor: COLORS.primary,
                padding: 10,
                borderRadius: 25,
              }}
            />
          </View>
          <ListItem.Content>
            <ListItem.Title>{item?.licence}</ListItem.Title>
            <ListItem.Subtitle>
              Khu vực: {item?.from_address?.ward}
            </ListItem.Subtitle>
          </ListItem.Content>
          <ListItem.Chevron size={30} />
        </ListItem>
      </TouchableWithoutFeedback>
    </Animatable.View>
  );

  return (
    <SafeAreaView style={style.container}>
      {loading}
      <Header
        leftElement={
          <Icon name="west" size={30} onPress={() => navigation.goBack()} />
        }
        headerText={'Danh sách phương tiện'}
      />

      <View style={{ width: '100%', paddingHorizontal: 10, display: 'flex' }}>
        <CustomSearch />
      </View>

      <VirtualizedList
        style={{
          alignSelf: 'stretch',
        }}
        initialNumToRender={5}
        data={data}
        getItemCount={() => data.length}
        getItem={(item, index) => item[index]}
        renderItem={renderItem}
        keyExtractor={item => `${item?.id}`}
        ListEmptyComponent={
          <View
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              paddingTop: '50%',
            }}>
            <Text>Chưa có lịch sử nhập xuất</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  container: { ...container },
  storeItem: {
    padding: 20,
    marginHorizontal: 20,
    borderRadius: 12,
    borderColor: 'rgba(0,0,0,0.5)',
    backgroundColor: COLORS.gray,
    marginVertical: 15,
  },
  chatList: {
    width: '100%',
    paddingHorizontal: 30,
    marginBottom: 20,
  },
  time: {
    alignSelf: 'flex-end',
    color: 'rgba(0,0,0,0.5)',
  },
});

export default VehicleList;
