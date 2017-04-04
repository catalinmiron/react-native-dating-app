import React, { Component } from 'react';
import { Dimensions, View, Text } from 'react-native';
import styles, { BAR_HEIGHT } from './styles';
var { height, width } = Dimensions.get('window');

export default class Header extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { title, subtitle } = this.props;

    return (
      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: width,
          height: BAR_HEIGHT * 0.67,
          backgroundColor: 'transparent',
          alignItems: 'center',
          justifyContent: 'flex-start',
          marginTop: 8,
          flexWrap: 'nowrap'
        }}>
        <Text
          style={[
            styles.shadow,
            styles.largeHeading,
            { height: 34, lineHeight: 34 }
          ]}>
          {title}
        </Text>
        {subtitle
          ? <Text style={[styles.shadow, styles.smallHeading]}>
              {subtitle}
            </Text>
          : null}
      </View>
    );
  }
}
