import React from 'react';
import { StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import HistoryScreen from '../../views/HistoryScreen/HistoryScreen';
import ReportList from '../../views/ReportScreen/ReportList';
import Account from '../../views/AuthScreen/Account';
import HomeStackScreen from '../StackNavigator/HomeStackScreen';
import StorageScreen from '../../views/StorageScreen/StorageScreen';

import { COLORS } from '../../styles';

const Tab = createMaterialBottomTabNavigator();

const TabNavigatior = () => {
  return (
    <Tab.Navigator
      backBehavior="initialRoute"
      initialRouteName="Home"
      activeColor={COLORS.primary}
      barStyle={style.container}
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color }) => {
          let iconName;
          switch (route.name) {
            case 'History':
              iconName = 'history';
              break;
            case 'Report':
              iconName = 'receipt-long';
              break;
            case 'Home':
              iconName = 'dashboard';
              break;
            case 'Store':
              iconName = 'store';
              break;
            case 'Setting':
              iconName = 'settings';
          }
          return (
            <Icon name={iconName} size={24} color={color} type="material" />
          );
        },
        tabBarActiveTintColor: '#7FC3DC',
        tabBarInactiveTintColor: '#BBB',
      })}>
      <Tab.Screen
        name="History"
        component={HistoryScreen}
        options={{
          tabBarLabel: 'Lịch sử',
        }}
      />
      <Tab.Screen
        name="Report"
        component={ReportList}
        options={{
          tabBarLabel: 'Báo cáo',
        }}
      />
      <Tab.Screen
        name="Home"
        component={HomeStackScreen}
        options={{
          tabBarLabel: 'Trang chủ',
        }}
      />
      <Tab.Screen
        name="Store"
        component={StorageScreen}
        options={{
          tabBarLabel: 'Kho hàng',
        }}
      />
      <Tab.Screen
        name="Setting"
        component={Account}
        options={{
          tabBarLabel: 'Cài đặt',
        }}
      />
    </Tab.Navigator>
  );
};

const style = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#FFF',
    zIndex: 1,
    height: '10%',
  },
});

export default TabNavigatior;
