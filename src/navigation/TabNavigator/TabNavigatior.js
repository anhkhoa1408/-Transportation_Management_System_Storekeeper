import React, { useRef, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import { Icon } from 'react-native-elements';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';
import { COLORS } from '../../styles';

import HomeStackScreen from '../StackNavigator/HomeStackScreen';
import HistoryStackScreen from '../StackNavigator/HistoryStackScreen';
import ReportStackScreen from '../StackNavigator/ReportStackScreen';
import SettingStackScreen from '../StackNavigator/SettingStackScreen';
import StorageStackScreen from '../StackNavigator/StorageStackScreen';

const Tab = createBottomTabNavigator();

const TabNavigatior = () => {
  const CustomTabBarButton = props => {
    let { iconName, name, accessibilityState } = props;
    let focused = accessibilityState.selected;
    let duration = 600;

    const animate1 = {
      0: { scale: 0.5, translateY: 7 },
      0.92: { translateY: -34 },
      1: { scale: 1.2, translateY: -24 },
    };
    const animate2 = {
      0: { scale: 1.2, translateY: -24 },
      1: { scale: 1, translateY: 7 },
    };

    const circle1 = {
      0: { scale: 0 },
      0.3: { scale: 0.9 },
      0.5: { scale: 0.2 },
      0.8: { scale: 0.7 },
      1: { scale: 1 },
    };
    const circle2 = { 0: { scale: 1 }, 1: { scale: 0 } };

    const viewRef = useRef(null);
    const textRef = useRef(null);
    const circleRef = useRef(null);

    useEffect(() => {
      if (focused) {
        viewRef.current.animate(animate1);
        circleRef.current.animate(circle1);
        textRef.current.transitionTo({ scale: 1 });
      } else {
        viewRef.current.animate(animate2);
        circleRef.current.animate(circle2);
        textRef.current.transitionTo({ scale: 0 });
      }
    }, [focused]);
    return (
      <TouchableOpacity
        {...props}
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        activeOpacity={1}
        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Animatable.View
          ref={viewRef}
          duration={duration}
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View style={style.btn}>
            <Animatable.View ref={circleRef} style={[style.circle]} />
            <Icon
              name={iconName}
              size={25}
              color={focused ? COLORS.white : '#C9C9C9'}
            />
          </View>
          <Animatable.Text ref={textRef} style={style.text}>
            {name}
          </Animatable.Text>
        </Animatable.View>
      </TouchableOpacity>
    );
  };

  return (
    <Tab.Navigator
      backBehavior="initialRoute"
      initialRouteName="Home"
      activeColor={COLORS.primary}
      barStyle={style.container}
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          ...style.container,
          display: getTabBarVisibility(route),
        },
        tabBarButton: props => {
          let iconName, name, color;
          switch (route.name) {
            case 'History':
              iconName = 'history';
              name = 'Nhập xuất';
              color = COLORS.primary;
              break;
            case 'Report':
              iconName = 'receipt-long';
              name = 'Báo cáo';
              color = COLORS.header;
              break;
            case 'Home':
              iconName = 'dashboard';
              name = 'Trang chủ';
              color = COLORS.success;
              break;
            case 'Store':
              iconName = 'store';
              name = 'Kho hàng';
              color = COLORS.danger;
              break;
            case 'Setting':
              iconName = 'settings';
              color = COLORS.warning;
              name = 'Cài đặt';
          }
          return (
            <CustomTabBarButton
              color={color}
              iconName={iconName}
              name={name}
              {...props}
            />
          );
        },
        tabBarActiveTintColor: '#7FC3DC',
        tabBarInactiveTintColor: '#BBB',
      })}>
      <Tab.Screen name="History" component={HistoryStackScreen} />
      <Tab.Screen name="Report" component={ReportStackScreen} />
      <Tab.Screen name="Home" component={HomeStackScreen} />
      <Tab.Screen name="Store" component={StorageStackScreen} />
      <Tab.Screen name="Setting" component={SettingStackScreen} />
    </Tab.Navigator>
  );
};

const visibleTabBarScreen = [
  'HistoryScreen',
  'ReportScreen',
  'HomeScreen',
  'StorageScreen',
  'Account',
];

const getTabBarVisibility = route => {
  const routeName = getFocusedRouteNameFromRoute(route) ?? 'HomeScreen';
  return visibleTabBarScreen.includes(routeName) ? 'flex' : 'none';
};

const style = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    backgroundColor: COLORS.white,
    height: 90,
    marginHorizontal: 20,
    bottom: 15,
    borderRadius: 20,
  },
  btn: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 4,
    borderColor: COLORS.white,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  circle: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
    borderRadius: 25,
  },
  text: {
    fontSize: 12,
    textAlign: 'center',
    color: COLORS.primary,
  },
});

export default TabNavigatior;
