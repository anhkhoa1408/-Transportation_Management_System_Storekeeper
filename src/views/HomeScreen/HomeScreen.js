// Import Component
import React, { useState, useEffect, useRef } from 'react';
import { Image, StyleSheet, View, FlatList, Dimensions } from 'react-native';
import { Card, Icon, withBadge, Text } from 'react-native-elements';
import Loading from '../../components/Loading';
import Header from '../../components/Header';
import HeaderAvatar from '../../components/HeaderAvatar';
import InfoCard from './InfoCard';
// Import Function
import { connect } from 'react-redux';
import { getAvatarFromUser, getNameFromUser } from '../../utils/avatarUltis';
import homeAPI from '../../api/homeAPI';
// Import Asset
import styles, { STYLES, COLORS, FONTS } from '../../styles';
import banner from './../../assets/images/delivery.jpg';
import { container, shadowCard } from '../../styles/layoutStyle';
import { danger, primary, success } from '../../styles/color';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import * as Animatable from 'react-native-animatable';

const screenWidth = Dimensions.get('window').width;

function HomeScreen({ navigation, userInfo, noties, ...props }) {
  const [badge, setBadge] = useState(null);
  const ref = useRef(null);
  const [listData, setListData] = useState([
    {
      icon: 'add',
      title: 'Nhập kho',
      navigate: 'VehicleList',
      type: 'import',
    },
    {
      icon: 'exit-to-app',
      title: 'Xuất kho',
      navigate: 'VehicleList',
      type: 'export',
    },
    {
      icon: 'assignment',
      title: 'Xem báo cáo',
      navigate: 'Report',
    },
  ]);

  useEffect(() => {
    setBadge(Badge(Object.keys(noties).length));
  }, [noties]);

  useEffect(() => {
    ref.current.animate({
      from: {
        right: -screenWidth,
      },
      to: {
        right: 0,
      },
    });
  }, []);

  const Badge = totalNoties => {
    const BadgedIcon = withBadge(totalNoties)(Icon);
    return (
      <BadgedIcon
        name="notifications"
        color={COLORS.primary}
        size={30}
        onPress={() => navigation.navigate('Notification')}
      />
    );
  };

  const [status, setStatus] = useState({
    storage_status: '',
    total_packages: '',
  });

  const renderItem = ({ item }) => (
    <InfoCard
      item={item}
      navigation={navigation}
      type={item.type && item.type}
    />
  );
  const keyExtractor = (item, index) => index.toString();

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      homeAPI.getStorekeeperStatus().then(response => setStatus(response));
    })
    return unsubscribe
  }, []);

  return (
    <>
      {/* {!listData.length && <Loading />} */}
      <View style={homeStyle.container}>
        <Header
          leftElement={badge}
          headerText={'Xin chào ' + getNameFromUser(userInfo?.user)}
          rightElement={
            <HeaderAvatar
              url={getAvatarFromUser(userInfo?.user)}
              onPressAction={() => navigation.navigate('EditProfile')}
            />
          }
        />

        {/* Banner Section */}
        <View
          style={{
            ...STYLES.container,
            height: '35%',
            paddingHorizontal: 10,
          }}>
          <Image style={homeStyle.banner} source={banner} />
        </View>

        {/* Info Cards Section */}
        <KeyboardAwareScrollView
          enableOnAndroid
          enableAutomaticScroll
          style={{ width: '100%' }}>
          <Animatable.View ref={ref} easing="ease" duration={500}>
              <FlatList
                contentContainerStyle={{
                  display:'flex',
                  flexDirection: 'row',
                  width: '100%',
                  justifyContent: 'space-evenly',
                  alignItems: 'center'
                }}
                style={homeStyle.listInfo}
                showsHorizontalScrollIndicator={false}
                horizontal
                data={listData}
                renderItem={renderItem}
                keyExtractor={keyExtractor}
              />
          </Animatable.View>

          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              marginBottom: 25,
            }}>
            <Card containerStyle={homeStyle.cardContainer}>
              <Card.Title>Tình trạng kho</Card.Title>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}>
                <Icon
                  name="store"
                  color={
                    status.storage_status === 'Đang hoạt động'
                      ? COLORS.primary
                      : COLORS.warning
                  }
                  size={22}
                  reverse
                />
                <Text style={FONTS.BigBold}>{status.storage_status}</Text>
              </View>
            </Card>
            <Card containerStyle={homeStyle.cardContainer}>
              <Card.Title>Đơn hàng cần nhập</Card.Title>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}>
                <Icon name="inventory" color={success} size={22} reverse />
                <Text style={[FONTS.BigBold, { fontSize: 20 }]}>
                  {status.total_packages}
                </Text>
              </View>
            </Card>
          </View>
        </KeyboardAwareScrollView>
      </View>
    </>
  );
}

const homeStyle = StyleSheet.create({
  container: {
    ...container,
  },
  listInfo: {
    height: 100,
    backgroundColor: COLORS.gray,
    marginLeft: 15,
    borderTopLeftRadius: 50,
    borderBottomLeftRadius: 50,
    zIndex: 99,
    marginBottom: 25,
  },
  banner: {
    width: '100%',
    height: '100%',
  },
  cardContainer: {
    flex: 1,
    borderRadius: 10,
    marginTop: 0,
    borderWidth: 0,
    flexDirection: 'column',
    ...shadowCard,
    shadowColor: COLORS.primary,
    elevation: 15,
  },
});

const mapStateToProps = state => ({
  userInfo: state.userInfo,
  noties: state.notification,
});

export default connect(mapStateToProps)(HomeScreen);
