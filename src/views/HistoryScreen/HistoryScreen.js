import React, { useState } from 'react';
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

export default function HistoryScreen({ navigation }) {
  const [data, setData] = useState([
    {
      carId: '#afoqijfoasdada'.toLocaleUpperCase(),
      dateTime: '12/20/2019 3:36 PM',
    },
    {
      carId: '#bmiweopkrejgoi'.toLocaleUpperCase(),
      dateTime: '12/20/2019 3:36 PM',
    },
    {
      carId: '#opkopjqwoiasdd'.toLocaleUpperCase(),
      dateTime: '12/20/2019 3:36 PM',
    },
    {
      carId: '#fmppoekpokrope'.toLocaleUpperCase(),
      dateTime: '12/20/2019 3:36 PM',
    },
  ]);
  const [index, setIndex] = useState(0);

  const renderItem = ({ item, index }) => (
    <TouchableOpacity>
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
          <ListItem.Title>{item.carId}</ListItem.Title>
          <ListItem.Subtitle>{item.dateTime}</ListItem.Subtitle>
        </ListItem.Content>
        <Icon
          size={25}
          name="file-download"
          iconStyle={{
            color: '#AAA',
          }}
          onPress={() => console.log(1)}
        />
      </ListItem>
    </TouchableOpacity>
  );

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
            data={data}
            renderItem={renderItem}
            keyExtractor={item => `${item.carId}`}
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
        </TabView.Item>
        <TabView.Item style={{ width: '100%' }}>
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={item => `${item.carId}`}
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
        </TabView.Item>
      </TabView>

      {data.length == 0 && <Loading />}
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
