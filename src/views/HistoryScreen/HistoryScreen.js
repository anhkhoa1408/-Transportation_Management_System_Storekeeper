import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, SafeAreaView } from 'react-native';
import { Text, Tab, TabView } from 'react-native-elements';
import { container } from '../../styles/layoutStyle';
import Loading from '../../components/Loading';
import Header from '../../components/Header';
import storageApi from '../../api/storageApi';
import PrimaryButton from './../../components/CustomButton/PrimaryButton';
import Detail from './Detail/Detail';
import { COLORS } from '../../styles';

export default function HistoryScreen({ navigation }) {
  const [pageImport, setPageImport] = useState(0);
  const [pageExport, setPageExport] = useState(0);
  const [imports, setImports] = useState([]);
  const [exports, setExports] = useState([]);
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(<Loading />);

  const renderItem = ({ item, index }) => (
    <Detail item={item} navigation={navigation} />
  );

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      Promise.all([
        storageApi.importList({ _start: 0 }),
        storageApi.exportList({ _start: 0 }),
      ])
        .then(result => {
          setLoading(null);
          setImports(result[0]);
          setExports(result[1]);
        })
        .catch(err => {
          setLoading(null);
          console.log(err);
        });
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('blur', () => {
      setPageImport(0);
      setPageExport(0);
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    if (pageExport) {
      storageApi
        .exportList({ _start: pageExport })
        .then(result => {
          setLoading(null);
          setExports([...exports, ...result]);
        })
        .catch(err => {
          setLoading(null);
          console.log(err);
        });
    }
  }, [pageExport]);

  useEffect(() => {
    if (pageImport) {
      storageApi
        .importList({ _start: pageImport })
        .then(result => {
          setLoading(null);
          setImports([...imports, ...result]);
        })
        .catch(err => {
          setLoading(null);
          console.log(err);
        });
    }
  }, [pageImport]);

  return (
    <SafeAreaView style={styles.container}>
      {loading}
      <Header headerText="Lịch sử nhập xuất"></Header>
      <View style={{ paddingHorizontal: 15, height: 62 }}>
        <Tab
          value={index}
          onChange={e => setIndex(e)}
          indicatorStyle={{
            height: 0,
          }}>
          <Tab.Item
            title="Nhập kho"
            titleStyle={{ fontSize: 12, color: COLORS.primary }}
            containerStyle={{
              backgroundColor: COLORS.gray,
              borderTopLeftRadius: 20,
              borderBottomLeftRadius: 20,
            }}
            buttonStyle={[
              { padding: 3 },
              index === 0 ? [styles.activeTab] : [styles.inactiveTab],
            ]}
          />
          <Tab.Item
            title="Xuất kho"
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
              index === 1 ? [styles.activeTab] : [styles.inactiveTab],
            ]}
          />
        </Tab>
      </View>

      <TabView value={index} onChange={setIndex} animationType="spring">
        <TabView.Item
          onMoveShouldSetResponder={e => e.stopPropagation()}
          style={{ width: '100%' }}>
          <FlatList
            data={imports}
            renderItem={renderItem}
            keyExtractor={item => `${item.id}`}
            ListEmptyComponent={
              <View style={styles.noData}>
                <Text>Chưa có lịch sử nhập xuất</Text>
              </View>
            }
            ListFooterComponent={
              imports.length > 5 && (
                <View style={{ padding: 20 }}>
                  <PrimaryButton
                    onPress={() => setPageImport(pageImport + 1)}
                    title="Xem thêm"
                  />
                </View>
              )
            }
          />
        </TabView.Item>
        <TabView.Item
          onMoveShouldSetResponder={e => e.stopPropagation()}
          style={{ width: '100%' }}>
          <FlatList
            data={exports}
            renderItem={renderItem}
            keyExtractor={item => `${item.id}`}
            ListEmptyComponent={
              <View style={styles.noData}>
                <Text>Chưa có lịch sử nhập xuất</Text>
              </View>
            }
            ListFooterComponent={
              exports.length > 5 && (
                <View style={{ padding: 20 }}>
                  <PrimaryButton
                    onPress={() => setPageExport(pageExport + 1)}
                    title="Xem thêm"
                  />
                </View>
              )
            }
          />
        </TabView.Item>
      </TabView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    ...container,
    alignItems: 'stretch',
    flex: 1,
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
  noData: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: '50%',
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
