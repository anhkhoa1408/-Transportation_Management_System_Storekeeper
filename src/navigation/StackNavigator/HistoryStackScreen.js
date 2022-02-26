import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HistoryDetail from './../../views/HistoryScreen/HistoryDetail';
import HistoryScreen from '../../views/HistoryScreen/HistoryScreen';

const HistoryStack = createStackNavigator();

const HistoryStackScreen = () => {
  return (
    <HistoryStack.Navigator
      screenOptions={routes => ({
        headerShown: false,
      })}
      initialRouteName="HistoryScreen">
      <HistoryStack.Screen name="HistoryDetail" component={HistoryDetail} />
      <HistoryStack.Screen name="HistoryScreen" component={HistoryScreen} />
    </HistoryStack.Navigator>
  );
};

export default HistoryStackScreen;
