// Import Component
import React, { useState, useEffect } from 'react';
import { Image, StyleSheet, View, FlatList } from 'react-native';
import { Card, Icon, withBadge, Text } from 'react-native-elements';
import Loading from '../../components/Loading';
import Header from '../../components/Header';
import HeaderAvatar from '../../components/HeaderAvatar';
import InfoCard from './InfoCard';
// Import Function
import { connect } from 'react-redux';
import homeAPI from '../../api/homeAPI';
// Import Asset
import styles, { STYLES, COLORS, FONTS } from '../../styles';
import banner from './../../assets/images/delivery.jpg';
import { container, shadowCard } from '../../styles/layoutStyle';
import { danger, primary, success } from '../../styles/color';

function HomeScreen({ navigation, ...props }) {
  const BadgedIcon = withBadge(10)(Icon);
  const [listData, setListData] = useState([
    {
      icon: 'add',
      title: 'Nhập kho',
      navigate: 'VehicleList',
    },
    {
      icon: 'exit-to-app',
      title: 'Xuất kho',
      navigate: 'VehicleList',
    },
    {
      icon: 'assignment',
      title: 'Xem báo cáo',
      navigate: 'Report',
    },
  ]);

  const [user, setUser] = useState({
    name: '',
    avatar:
      'https://res.cloudinary.com/dfnoohdaw/image/upload/v1638692549/avatar_default_de42ce8b3d.png',
  });

  const [status, setStatus] = useState({
    storage_status: '',
    total_packages: '',
  });

  const renderItem = ({ item }) => (
    <InfoCard item={item} navigation={navigation} />
  );
  const keyExtractor = (item, index) => index.toString();

  useEffect(() => {
    homeAPI.getStorekeeperStatus().then(response => setStatus(response));
  }, []);

  return (
    <>
      {/* {!listData.length && <Loading />} */}
      <View style={homeStyle.container}>
        <Header
          leftElement={
            <BadgedIcon
              name="notifications"
              color={COLORS.primary}
              size={30}
              onPress={() => navigation.navigate('Notification')}
            />
          }
          headerText={'Xin chào ' + user.name}
          rightElement={
            <HeaderAvatar
              url={user.avatar}
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
        <View style={homeStyle.listInfo}>
          <FlatList
            contentContainerStyle={{ paddingVertical: 15 }}
            showsHorizontalScrollIndicator={false}
            horizontal
            data={listData}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
          />
        </View>

        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
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
      </View>
    </>
  );
}

const homeStyle = StyleSheet.create({
  container: {
    ...container,
  },
  listInfo: {
    width: '100%',
    height: 150,
    marginBottom: 20,
  },
  banner: {
    width: '100%',
    height: '100%',
  },
  cardContainer: {
    flex: 1,
    borderRadius: 20,
    marginTop: 0,
    flexDirection: 'column',
    ...shadowCard,
  },
});

const mapStateToProps = state => ({
  userInfo: state.userInfo,
});

export default connect(mapStateToProps)(HomeScreen);
