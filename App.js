import React, { Component } from 'react';
import { Constants, Components } from 'expo';
import {
  LayoutAnimation,
  ScrollView,
  Animated,
  TouchableOpacity,
  Alert,
  Image,
  Dimensions,
  Text,
  View,
  StyleSheet,
  StatusBar
} from 'react-native';

import styles, { BAR_HEIGHT } from './components/styles.js';
import Header from './components/Header';

const { Svg } = Components;
const { Stop, Defs, LinearGradient, G, Use, Circle, Ellipse } = Components.Svg;

import { Ionicons } from '@expo/vector-icons';
import Router from './AppRouter';

var { height, width } = Dimensions.get('window');

import {
  NavigationProvider,
  StackNavigation,
  SharedElementOverlay
} from '@expo/ex-navigation';

class TopHeader extends Component {
  render() {
    return (
      <Svg height={BAR_HEIGHT} width={width} style={styles.headerShadow}>
        <Defs>
          <LinearGradient id="grad" x1="0%" y1="0%" x2="0%" y2="100%">
            <Stop offset="0" stopColor="#FF0EE5" stopOpacity="1" />
            <Stop offset="1" stopColor="#FF0088" stopOpacity="1" />
          </LinearGradient>
          <G id="shape">
            <G>
              <Ellipse
                cx={width / 2}
                cy="0"
                rx={100 + width / 2}
                ry={BAR_HEIGHT}
              />
            </G>
          </G>
        </Defs>

        <Use href="#shape" x="0" y="0" fill="url(#grad)" />
      </Svg>
    );
  }
}

export default class App extends Component {
  componentDidMount() {
    StatusBar.setBarStyle('light-content');
  }

  render() {
    return (
      <NavigationProvider router={Router}>
        <SharedElementOverlay>
          <StackNavigation
            initialRoute="home"
            defaultRouteConfig={{
              navigationBar: {
                tintColor: '#FFF',
                renderLeft: props => (
                  <Ionicons
                    name="ios-menu"
                    size={34}
                    onPress={() => Alert.alert('button pressed')}
                    style={[
                      styles.shadow,
                      {
                        backgroundColor: 'transparent',
                        marginTop: 4,
                        marginLeft: 14,
                        shadowColor: '#000'
                      }
                    ]}
                    color={props.config.navigationBar.tintColor}
                  />
                ),
                renderRight: props => (
                  <Ionicons
                    name="ios-options"
                    onPress={() => Alert.alert('button pressed')}
                    size={30}
                    style={[
                      styles.shadow,
                      {
                        backgroundColor: 'transparent',
                        marginTop: 8,
                        marginRight: 14
                      }
                    ]}
                    color={props.config.navigationBar.tintColor}
                  />
                ),
                renderTitle: props => (
                  <Header {...props.config.navigationBar} />
                ),
                renderBackground: () => <TopHeader />
              }
            }}
          />
        </SharedElementOverlay>
      </NavigationProvider>
    );
  }
}
