import React, { Component } from 'react';
import {
  Alert,
  TouchableWithoutFeedback,
  Dimensions,
  View,
  Text,
  Animated,
  Easing,
  Image
} from 'react-native';
import styles, { BAR_HEIGHT, EMPTY_ITEM_SIZE, ITEM_SIZE } from './styles';
import ITEMS from './../data';
var { height, width } = Dimensions.get('window');
import AppRouter from '../AppRouter';

import {
  SharedElement,
  SharedElementGroup,
  withNavigation
} from '@expo/ex-navigation';

@withNavigation
export default class Slider extends Component {
  _placeHeaderGroups = {};
  _rowAnimations = {};

  constructor(props) {
    super(props);

    this.state = {
      scrollX: new Animated.Value(0)
    };
  }

  onItemClick(item, index) {
    this.props.navigator.push(
      AppRouter.getRoute('details', {
        item
      }),
      {
        transitionGroup: this._placeHeaderGroups[index]
      }
    );
  }

  renderItem(item, i) {
    this._rowAnimations[i] = new Animated.Value(0);

    let inputRange = [
      (i - 2) * ITEM_SIZE,
      (i - 1) * ITEM_SIZE,
      i * ITEM_SIZE,
      (i + 1) * ITEM_SIZE
    ];

    // Ensure that we're leaving space for first and last item.
    if (!item) {
      return <View key={i} style={{ width: EMPTY_ITEM_SIZE / 2 }} />;
    }

    const { image, name, age, description } = item;

    return (
      <TouchableWithoutFeedback
        hitSlop={{ top: 20, left: 20, bottom: 20, right: 20 }}
        onPress={() => this.onItemClick(item, i)}
        key={i}>
        <Animated.View
          style={[
            {
              transform: [
                {
                  scale: this.state.scrollX.interpolate({
                    inputRange: inputRange,
                    outputRange: [0.7, 1, 0.7, 1],
                    extrapolate: 'clamp'
                  })
                },
                {
                  translateY: this._rowAnimations[i].interpolate({
                    inputRange: [-1, 0, 1],
                    outputRange: [-200, 0, 200]
                  })
                }
              ]
            }
          ]}>
          <SharedElementGroup
            id="place-header"
            ref={g => {
              this._placeHeaderGroups[i] = g;
            }}
            configureTransition={() => ({
              timing: Animated.timing,
              easing: Easing.elastic(2),
              duration: 600
            })}>
            <SharedElement id="image">
              {animation => (
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
                      backgroundColor: 'transparent',
                      marginVertical: 10,
                      transform: [
                        {
                          translateY: this.state.scrollX.interpolate({
                            inputRange: inputRange,
                            outputRange: [-ITEM_SIZE / 2, 0, -ITEM_SIZE / 2, 0],
                            extrapolate: 'clamp'
                          })
                        }
                      ]
                    },
                    animation
                  ]}>
                  <Image
                    source={{ uri: item.image }}
                    style={[
                      {
                        height: ITEM_SIZE,
                        width: ITEM_SIZE,
                        borderRadius: ITEM_SIZE / 2
                      }
                    ]}
                  />
                </Animated.View>
              )}
            </SharedElement>

          </SharedElementGroup>
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
                    outputRange: [height / 4, 0, 0, 0],
                    extrapolate: 'clamp'
                  })
                },
                {
                  scale: this.state.scrollX.interpolate({
                    inputRange: inputRange,
                    outputRange: [0.85, 1, 0.85, 0.85],
                    extrapolate: 'clamp'
                  })
                }
              ],
              opacity: this.state.scrollX.interpolate({
                inputRange: inputRange,
                outputRange: [0, 1, 0, 0],
                extrapolate: 'clamp'
              })
            }}>
            <Text style={styles.nameText}>
              {item.name}
            </Text>
            <Text style={styles.ageText}>
              {item.age}
            </Text>
            <Text style={styles.descriptionText}>
              {item.description}
            </Text>
          </Animated.View>
        </Animated.View>
      </TouchableWithoutFeedback>
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
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: this.state.scrollX } } }],
          { useNativeDriver: true }
        )}>
        {ITEMS.map((item, i) => this.renderItem(item, i))}
      </Animated.ScrollView>
    );
  }
}
