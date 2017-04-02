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
const { Svg } = Components;
const { Stop, Defs, LinearGradient, G, Use, Circle, Ellipse } = Components.Svg;

import { Ionicons } from '@expo/vector-icons';

var { height, width } = Dimensions.get('window');

import {
  createRouter,
  NavigationProvider,
  StackNavigation
} from '@expo/ex-navigation';

const ITEM_SIZE = width * 0.68;
const EMPTY_ITEM_SIZE = width - ITEM_SIZE;

const BAR_HEIGHT = Constants.statusBarHeight * 5;
const FONT = 'Apple SD Gothic Neo';
const ITEMS = [
  null,
  {
    image: 'https://s-media-cache-ak0.pinimg.com/564x/bc/6d/d8/bc6dd84ab48f40e09f5b4f0409c5471c.jpg',
    name: 'Miranda Kerr',
    age: 21,
    description: 'Australian model'
  },
  {
    image: 'https://s-media-cache-ak0.pinimg.com/564x/5c/a0/f1/5ca0f13dd50ed9f6d630d8a7d7da0f3e.jpg',
    name: 'Janae Eliss',
    age: 22,
    description: 'Black & White Photography'
  },
  {
    image: 'https://s-media-cache-ak0.pinimg.com/564x/c4/67/49/c467498720c056c241dc1226f7290597.jpg',
    name: 'Romee Strijd',
    age: 24,
    description: 'Je suis tres bien et toi!'
  },
  {
    image: 'https://s-media-cache-ak0.pinimg.com/564x/76/90/7d/76907d454d4cb62f07b4fdf92ae05371.jpg',
    name: 'Alice',
    age: 19,
    description: 'Portrait of humans'
  },
  {
    image: 'https://s-media-cache-ak0.pinimg.com/564x/62/86/33/6286333a4f160a24b11e6a7ee8ea0b38.jpg',
    name: 'Francesca',
    age: 25,
    description: "I'm no model lady"
  },
  null
];

const Router = createRouter(() => ({
  home: () => HomeScreen
}));

class Slider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      scrollX: new Animated.Value(0)
    };
  }
  renderItem(item, i) {
    let inputRange = [
      (i - 2) * ITEM_SIZE,
      (i - 1) * ITEM_SIZE,
      i * ITEM_SIZE,
      (i + 1) * ITEM_SIZE
    ];

    // Ensure that we're leaving space for first and last item.
    if (!item) {
      return (
        <View
          key={i}
          style={[styles.emptyItem, { width: EMPTY_ITEM_SIZE / 2 }]}
        />
      );
    }

    const { image, name, age, description } = item;

    return (
      <Animated.View
        key={i}
        style={{
          transform: [
            {
              scale: this.state.scrollX.interpolate({
                inputRange: inputRange,
                outputRange: [0.8, 1, 0.8, 1]
              })
            }
          ]
        }}>
        <Animated.View
          style={[
            styles.headerShadow,
            {
              shadowRadius: 15,
              shadowOffset: { width: 0, height: 6 },
              shadowOpacity: 0.2,
              height: ITEM_SIZE,
              width: ITEM_SIZE,
              borderRadius: ITEM_SIZE / 2,
              marginVertical: 10,
              transform: [
                {
                  translateY: this.state.scrollX.interpolate({
                    inputRange: inputRange,
                    outputRange: [-ITEM_SIZE / 2, 0, -ITEM_SIZE / 2, 0]
                  })
                }
              ]
            }
          ]}>
          <Image
            source={{ uri: item.image }}
            style={[
              styles.headerShadow,
              {
                height: ITEM_SIZE,
                width: ITEM_SIZE,
                borderRadius: ITEM_SIZE / 2
              }
            ]}
          />
        </Animated.View>
        <Animated.View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'transparent',
            flex: 1,
            transform: [
              {
                translateY: this.state.scrollX.interpolate({
                  inputRange: inputRange,
                  outputRange: [height / 4, 0, 0, 0]
                })
              }
            ],
            opacity: this.state.scrollX.interpolate({
              inputRange: inputRange,
              outputRange: [0, 1, 0, 0]
            })
          }}>
          <Text
            style={{
              fontFamily: FONT,
              fontSize: 28,
              fontWeight: '700',
              color: '#565E65'
            }}>
            {item.name}
          </Text>
          <Text
            style={{
              fontFamily: FONT,
              fontSize: 48,
              fontWeight: '700',
              color: '#FEB9DE'
            }}>
            {item.age}
          </Text>
          <Text
            style={{
              fontFamily: FONT,
              fontSize: 22,
              fontWeight: '500',
              color: '#565E65'
            }}>
            {item.description}
          </Text>
        </Animated.View>
      </Animated.View>
    );
  }

  render() {
    return (
      <Animated.ScrollView
        style={{ flex: 0.65, width: width, paddingTop: BAR_HEIGHT * 0.6 }}
        contentContainerStyle={{
          alignItems: 'flex-start',
          justifyContent: 'center',
          flexGrow: 1
        }}
        horizontal={true}
        decelerationRate={0}
        snapToInterval={ITEM_SIZE}
        scrollEventThrottle={16}
        snapToAlignment="start"
        ref="scrollViewItems"
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event([
          { nativeEvent: { contentOffset: { x: this.state.scrollX } } }
        ])}>
        {ITEMS.map((item, i) => this.renderItem(item, i))}
      </Animated.ScrollView>
    );
  }
}

class HomeScreen extends React.Component {
  static route = {
    navigationBar: {
      title: 'Girls nearby',
      subtitle: '23/208'
    }
  };

  componentDidMount() {
    LayoutAnimation.spring();
  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Slider />
        <View
          style={{
            flex: 0.35,
            alignItems: 'center',
            justifyContent: 'center'
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'flex-start',
              justifyContent: 'space-between',
              width: width - 40
            }}>
            <AButton size={65} color={'#D834FF'} icon={'share-alt'} />
            <AButton size={90} color={'#FF00FF'} icon={'star'} />
            <AButton size={90} color={'#FF00EC'} icon={'happy'} />
            <AButton size={65} color={'#FF50B0'} icon={'sad'} />
          </View>
        </View>
      </View>
    );
  }
}

class AButton extends Component {
  render() {
    const stroke = 3;
    return (
      <TouchableOpacity
        onPress={() => Alert.alert(`${this.props.icon} pressed`)}
        style={{
          width: this.props.size,
          height: this.props.size,
          alignItems: 'center',
          justifyContent: 'center'
        }}>
        <Svg
          height={this.props.size}
          width={this.props.size}
          style={{
            shadowColor: this.props.color,
            shadowRadius: 10,
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.29,
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1
          }}>
          <Defs>
            <LinearGradient id="buttonGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <Stop offset="0" stopColor={this.props.color} stopOpacity=".9" />
              <Stop offset="1" stopColor={this.props.color} stopOpacity="1" />
            </LinearGradient>
          </Defs>
          <Circle
            cx={this.props.size / 2}
            cy={this.props.size / 2}
            r={this.props.size / 2 - stroke * 2}
            stroke="url(#buttonGrad)"
            strokeWidth={stroke}
            fill="#fff"
          />
        </Svg>
        <Ionicons
          name={`md-${this.props.icon}`}
          size={this.props.size * 0.45}
          style={{ backgroundColor: 'transparent', position: 'absolute' }}
          color={this.props.color}
        />
      </TouchableOpacity>
    );
  }
}

class TopHeader extends Component {
  render() {
    // console.log(Constants.systemFonts)
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

class Header extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { title, subtitle } = this.props.config.navigationBar;

    return (
      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: width,
          height: BAR_HEIGHT * 2 / 3,
          backgroundColor: 'transparent',
          alignItems: 'center',
          justifyContent: 'center',
          flexWrap: 'nowrap'
        }}>
        <Text
          style={[
            styles.shadow,
            { color: '#fff', fontWeight: '700', fontSize: 22, fontFamily: FONT }
          ]}>
          {title}
        </Text>
        <Text
          style={[
            styles.shadow,
            { color: '#fff', fontWeight: '400', fontSize: 16, fontFamily: FONT }
          ]}>
          {subtitle}
        </Text>
      </View>
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
        <StackNavigation
          initialRoute="home"
          defaultRouteConfig={{
            navigationBar: {
              tintColor: '#FFF',
              renderLeft: props => (
                <Ionicons
                  name="ios-menu"
                  size={34}
                  style={[
                    styles.shadow,
                    {
                      backgroundColor: 'transparent',
                      paddingTop: 4,
                      paddingLeft: 14,
                      shadowColor: '#000'
                    }
                  ]}
                  color={props.config.navigationBar.tintColor}
                />
              ),
              renderRight: props => (
                <Ionicons
                  name="ios-options"
                  size={30}
                  style={[
                    styles.shadow,
                    {
                      backgroundColor: 'transparent',
                      paddingTop: 8,
                      paddingRight: 14
                    }
                  ]}
                  color={props.config.navigationBar.tintColor}
                />
              ),
              renderTitle: props => <Header {...props} />,
              renderBackground: () => <TopHeader />
            }
          }}
        />
      </NavigationProvider>
    );
  }
}

const styles = StyleSheet.create({
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
  }
});
