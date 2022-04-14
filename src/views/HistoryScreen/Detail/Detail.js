import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Icon, ListItem } from 'react-native-elements';
import { COLORS, FONTS } from '../../../styles';
import moment from 'moment';
import { simplifyString } from '../../../utils/simplifyString';

const Detail = ({ item, navigation }) => {
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('HistoryDetail', { item })}>
      <ListItem containerStyle={styles.itemContainer}>
        <View style={styles.item}>
          <Icon
            size={30}
            name="import-export"
            iconStyle={{
              color: '#FFF',
            }}
            containerStyle={styles.icon}
          />
        </View>
        <ListItem.Content>
          <ListItem.Title style={FONTS.Smol}>ID: {simplifyString(item.id, 15)}</ListItem.Title>
          <ListItem.Subtitle>
            {moment(item.createdAt).format('DD-MM-YYYY HH:mm:ss')}
          </ListItem.Subtitle>
        </ListItem.Content>
        <ListItem.Chevron size={20} />
      </ListItem>
    </TouchableOpacity>
  );
};

export default Detail;

const styles = StyleSheet.create({
  itemContainer: {
    padding: 20,
    marginHorizontal: 20,
    borderRadius: 12,
    borderColor: 'rgba(0,0,0,0.5)',
    backgroundColor: '#F3F3FA',
    marginVertical: 15,
  },
  item: {
    backgroundColor: 'rgba(255,255,255,0.6)',
    padding: 10,
    borderRadius: 15,
  },
  icon: {
    backgroundColor: COLORS.success,
    padding: 10,
    borderRadius: 25,
  },
});
