import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import EditReport from '../../views/ReportScreen/EditReport';
import ReportList from '../../views/ReportScreen/ReportList';

const ReportStack = createStackNavigator();

const ReportStackScreen = () => {
  return (
    <ReportStack.Navigator
      screenOptions={routes => ({
        headerShown: false,
      })}
      initialRouteName="ReportScreen">
      <ReportStack.Screen name="ReportScreen" component={ReportList} />
      <ReportStack.Screen name="EditReport" component={EditReport} />
    </ReportStack.Navigator>
  );
};

export default ReportStackScreen;
