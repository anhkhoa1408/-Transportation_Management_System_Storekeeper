import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import StorageScreen from '../../views/StorageScreen/StorageScreen';
import EditPackage from '../../views/StorageScreen/EditPackage';

const StorageStack = createStackNavigator();

const StorageStackScreen = () => {
  return (
    <StorageStack.Navigator
      screenOptions={routes => ({
        headerShown: false,
      })}
      initialRouteName="StorageScreen">
      <StorageStack.Screen name="StorageScreen" component={StorageScreen} />
      <StorageStack.Screen name="EditPackage" component={EditPackage} />
    </StorageStack.Navigator>
  );
};

export default StorageStackScreen;
