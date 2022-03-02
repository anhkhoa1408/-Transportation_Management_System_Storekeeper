import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../../views/HomeScreen/HomeScreen';
import EditProfile from '../../views/SettingScreen/EditProfile';
import NotificationScreen from '../../views/NotificationScreen/NotificationScreen';
import VehicleList from '../../views/StorageScreen/VehicleList';
import VehicleDetail from '../../views/StorageScreen/VehicleDetail';
import BarcodeDetail from '../../views/BarcodeScreen/BarcodeDetail';
import BarcodeScan from '../../views/BarcodeScreen/BarcodeScan';
import EditPackage from '../../views/StorageScreen/EditPackage';

const HomeStack = createStackNavigator();

const HomeStackScreen = () => {
  return (
    <HomeStack.Navigator
      screenOptions={routes => ({
        headerShown: false,
      })}
      initialRouteName="HomeScreen">
      <HomeStack.Screen name="HomeScreen" component={HomeScreen} />
      <HomeStack.Screen name="EditProfile" component={EditProfile} />
      <HomeStack.Screen name="Notification" component={NotificationScreen} />
      <HomeStack.Screen name="VehicleList" component={VehicleList} />
      <HomeStack.Screen name="VehicleDetail" component={VehicleDetail} />
      <HomeStack.Screen name="BarcodeDetail" component={BarcodeDetail} />
      <HomeStack.Screen name="BarcodeScan" component={BarcodeScan} />
      <HomeStack.Screen name="EditPackage" component={EditPackage} />
    </HomeStack.Navigator>
  );
};

export default HomeStackScreen;
