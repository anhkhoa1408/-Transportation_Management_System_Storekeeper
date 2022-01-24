import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../../views/HomeScreen/HomeScreen';
import Account from '../../views/AuthScreen/Account';
import EditProfile from '../../views/SettingScreen/EditProfile';
import ChangePass from '../../views/SettingScreen/ChangePass';
import NotificationScreen from '../../views/NotificationScreen/NotificationScreen';
import EditReport from '../../views/ReportScreen/EditReport';
import VehicleList from '../../views/StorageScreen/VehicleList';
import EditPackage from '../../views/StorageScreen/EditPackage';
import VehicleDetail from '../../views/StorageScreen/VehicleDetail';
import BarcodeDetail from '../../views/BarcodeScreen/BarcodeDetail';

const HomeStack = createStackNavigator();

const HomeStackScreen = () => {
  return (
    <HomeStack.Navigator
      screenOptions={routes => ({
        headerShown: false,
      })}
      initialRouteName="HomeScreen">
      <HomeStack.Screen name="HomeScreen" component={HomeScreen} />
      <HomeStack.Screen name="Account" component={Account} />
      <HomeStack.Screen name="EditReport" component={EditReport} />
      <HomeStack.Screen name="EditProfile" component={EditProfile} />
      <HomeStack.Screen name="ChangePass" component={ChangePass} />
      <HomeStack.Screen name="Notification" component={NotificationScreen} />
      <HomeStack.Screen name="VehicleList" component={VehicleList} />
      <HomeStack.Screen name="EditPackage" component={EditPackage} />
      <HomeStack.Screen name="VehicleDetail" component={VehicleDetail} />
      <HomeStack.Screen name="BarcodeDetail" component={BarcodeDetail} />
    </HomeStack.Navigator>
  );
};

export default HomeStackScreen;
