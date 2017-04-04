import { StyleSheet, Dimensions } from 'react-native';
import { Constants } from 'expo';
var { height, width } = Dimensions.get('window');

const FONT = 'Apple SD Gothic Neo';
export const ITEM_SIZE = width * 0.68;
export const EMPTY_ITEM_SIZE = width - ITEM_SIZE;
export const BAR_HEIGHT = Constants.statusBarHeight * 5;

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: BAR_HEIGHT,
    backgroundColor: '#fff'
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#34495e'
  },
  shadow: {
    shadowOpacity: 0.4,
    shadowOffset: {
      width: 1,
      height: 3
    },
    shadowRadius: 6
  },
  headerShadow: {
    shadowOpacity: 0.6,
    shadowColor: '#FF0088',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowRadius: 12
  },
  largeHeading: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 22,
    fontFamily: FONT
  },
  smallHeading: {
    color: '#fff',
    fontWeight: '400',
    fontSize: 16,
    fontFamily: FONT
  },
  descriptionText: {
    fontFamily: FONT,
    fontSize: 22,
    fontWeight: '500',
    color: '#565E65'
  },
  ageText: {
    fontFamily: FONT,
    fontSize: 48,
    fontWeight: '700',
    color: '#FEB9DE'
  },
  nameText: {
    fontFamily: FONT,
    fontSize: 28,
    fontWeight: '700',
    color: '#565E65'
  }
});
