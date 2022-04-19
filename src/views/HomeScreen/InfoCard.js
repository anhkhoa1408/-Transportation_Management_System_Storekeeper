import React, { useRef } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { Icon, ListItem, Text } from 'react-native-elements';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { COLORS } from '../../styles';

const width = Dimensions.get('screen').width;
const height = Dimensions.get('window').width;

const InfoCard = ({ item, navigation, type }) => {
  const ref = useRef(null);
  const handlePress = async navigate => {
    await ref.current.animate({
      0: {
        scale: 1,
      },
      0.25: {
        scale: 1,
        opacity: 0.9,
      },
      0.75: {
        scale: 0.8,
        opacity: 1,
      },
      1: {
        scale: 1,
      },
    });
    navigation.navigate(navigate, {
      type: type,
    });
  };
  return (
    <Animatable.View ref={ref} duration={500} easing="ease">
      <TouchableWithoutFeedback onPress={() => handlePress(item.navigate)}>
        <ListItem containerStyle={styles.listItem}>
          <View
            style={{
              padding: 4,
              borderRadius: 50,
              backgroundColor: 'rgba(255, 255, 255, 0.4)',
            }}>
            <Icon
              name={item.icon}
              reverseColor={COLORS.primary}
              reverse
              size={18}
              color={COLORS.white}
            />
          </View>
          <Text
            style={{
              color: '#000',
              fontSize: 13,
              marginTop: 5
            }}>
            {item.title}
          </Text>
        </ListItem>
      </TouchableWithoutFeedback>
    </Animatable.View>
  );
};

const styles = StyleSheet.create({
  listItem: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    borderColor: '#000',
    backgroundColor: 'transparent',
    zIndex: -999,
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: COLORS.white,
  },
});

export default InfoCard;
