import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import {
  Text,
  Icon,
  CheckBox,
  Tab,
  TabView,
  ListItem,
} from 'react-native-elements';
import { container, header } from '../../styles/layoutStyle';
import Loading from '../../components/Loading';
import Header from '../../components/Header';
import { danger, primary, success, warning } from '../../styles/color';
import storageApi from '../../api/storageApi';
import moment from 'moment';

export default function HistoryScreen({ navigation }) {
  const [pageImport, setPageImport] = useState(0);
  const [pageExport, setPageExport] = useState(0);
  const [imports, setImports] = useState([]);
  const [exports, setExports] = useState([]);
  const [index, setIndex] = useState(0);

  const renderItem = ({ item, index }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('HistoryDetail', { item })}>
      <ListItem
        containerStyle={{
          padding: 20,
          marginHorizontal: 20,
          borderRadius: 12,
          borderColor: 'rgba(0,0,0,0.5)',
          backgroundColor: '#F0F1F5',
          marginVertical: 15,
        }}>
        <View
          style={{
            backgroundColor: 'rgba(255,255,255,0.6)',
            padding: 10,
            borderRadius: 15,
          }}>
          <Icon
            size={30}
            name="import-export"
            iconStyle={{
              color: '#FFF',
            }}
            containerStyle={{
              backgroundColor: success,
              padding: 10,
              borderRadius: 25,
            }}
          />
        </View>
        <ListItem.Content>
          <ListItem.Title>ID: {item.id}</ListItem.Title>
          <ListItem.Subtitle>
            {moment(item.createdAt).format('DD-MM-YYYY HH:mm:ss')}
          </ListItem.Subtitle>
        </ListItem.Content>
        <ListItem.Chevron size={20} />
      </ListItem>
    </TouchableOpacity>
  );

  useEffect(() => {
    Promise.all([
      storageApi.importList({ page: pageImport }),
      storageApi.exportList({ page: pageExport }),
    ]).then(result => {
      setImports(result[0]);
      setExports(result[1]);
    });
  }, [pageImport, pageExport]);

  return (
    <View style={styles.container}>
      <Header headerText="Lịch sử nhập xuất"></Header>
      <Tab
        value={index}
        onChange={e => setIndex(e)}
        indicatorStyle={{
          backgroundColor: primary,
          height: 3,
        }}>
        <Tab.Item
          title="Nhập kho"
          titleStyle={{ fontSize: 12, color: primary }}
          icon={{
            name: 'vertical-align-bottom',
            color: primary,
          }}
          containerStyle={{
            backgroundColor: '#FFF',
          }}
        />
        <Tab.Item
          title="Xuất kho"
          titleStyle={{ fontSize: 12, color: primary }}
          icon={{ name: 'vertical-align-top', color: primary }}
          containerStyle={{
            backgroundColor: '#FFF',
          }}
        />
      </Tab>

      <TabView value={index} onChange={setIndex} animationType="spring">
        <TabView.Item style={{ width: '100%' }}>
          <FlatList
            data={imports}
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
              imports.length > 5 && (
                <View style={{ padding: 20 }}>
                  <PillButton
                    onPress={() => setPageImport(pageImport + 1)}
                    title="Xem thêm"
                  />
                </View>
              )
            }
          />
        </TabView.Item>
        <TabView.Item style={{ width: '100%' }}>
          <FlatList
            data={exports}
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
              exports.length > 5 && (
                <View style={{ padding: 20 }}>
                  <PillButton
                    onPress={() => setPageImport(pageExport + 1)}
                    title="Xem thêm"
                  />
                </View>
              )
            }
          />
        </TabView.Item>
      </TabView>

      {/* {exports.length == 0 && <Loading />} */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...container,
    alignItems: 'stretch',
    flex: 1,
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
  row: {
    flexWrap: 'nowrap',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  column: {
    flexWrap: 'nowrap',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
