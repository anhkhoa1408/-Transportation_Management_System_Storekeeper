import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  SafeAreaView,
  TouchableWithoutFeedback,
} from 'react-native';
import { Text, ListItem, Icon } from 'react-native-elements';
import CustomSearch from '../../components/CustomSearch/CustomSearch';
import { container } from '../../styles/layoutStyle';
import Header from '../../components/Header';
import { COLORS } from '../../styles';
import * as Animatable from 'react-native-animatable';
import PillButton from './../../components/CustomButton/PillButton';
import packageApi from '../../api/packageApi';

const StorageScreen = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);

  const ref = useRef([]);

  const handlePress = async (index, item) => {
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
    navigation.navigate('EditPackage', { item });
  };

  const renderItem = ({ item, index }) => (
    <Animatable.View
      ref={ele => (ref[index] = ele)}
      duration={500}
      easing="ease">
      <TouchableWithoutFeedback
        onPress={() =>
          handlePress(index, {
            ...item.package,
            importedQuantity: item.quantity,
            importedId: item.id,
            code: item.code,
          })
        }>
        <ListItem containerStyle={style.storeItem}>
          <View
            style={{
              backgroundColor: 'rgba(255,255,255,0.6)',
              padding: 10,
              borderRadius: 15,
            }}>
            <Icon
              size={30}
              name="box"
              type="feather"
              iconStyle={{
                color: '#FFF',
              }}
              containerStyle={{
                backgroundColor: COLORS.warning,
                padding: 10,
                borderRadius: 25,
              }}
            />
          </View>
          <ListItem.Content>
            <ListItem.Title>{item.package.id}</ListItem.Title>
            <ListItem.Subtitle>Barcode: {item.code}</ListItem.Subtitle>
            <ListItem.Subtitle>
              Vị tri: Khu {item.package.position}
            </ListItem.Subtitle>
          </ListItem.Content>
          <ListItem.Chevron size={20} />
        </ListItem>
      </TouchableWithoutFeedback>
    </Animatable.View>
  );

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      packageApi
        .getImportedPackage({ page: page })
        .then(response => {
          setData([...data, ...response]);
        })
        .catch(error => console.log(error));
    });

    return unsubscribe;
  }, []);

  return (
    <SafeAreaView style={style.container}>
      <Header headerText={'Quản lý kho'} />

      <View style={{ width: '100%', paddingHorizontal: 10, display: 'flex' }}>
        <CustomSearch />
      </View>

      <FlatList
        style={{
          alignSelf: 'stretch',
        }}
        data={data}
        renderItem={renderItem}
        keyExtractor={item => `${item.id}`}
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
        ListFooterComponent={
          data.length > 5 && (
            <View style={{ padding: 20 }}>
              <PillButton
                // onPress={() => setPageImport(pageExport + 1)}
                title="Xem thêm"
              />
            </View>
          )
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
    backgroundColor: '#F0F1F5',
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

export default StorageScreen;
