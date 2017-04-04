import React, { Component } from 'react';
import {
  TouchableWithoutFeedback,
  Easing,
  Animated,
  Image,
  View,
  Text
} from 'react-native';
import {
  withNavigation,
  SharedElement,
  SharedElementGroup
} from '@expo/ex-navigation';
import { Ionicons } from '@expo/vector-icons';
import styles, {
  BAR_HEIGHT,
  EMPTY_ITEM_SIZE,
  ITEM_SIZE
} from './components/styles';
import Header from './components/Header';

@withNavigation
export class LeftButton extends Component {
  render() {
    return (
      <Ionicons
        name="md-arrow-back"
        size={34}
        onPress={() => this.props.navigator.pop()}
        style={[
          styles.shadow,
          {
            backgroundColor: 'transparent',
            marginTop: 4,
            marginLeft: 14,
            shadowColor: '#000'
          }
        ]}
        color={'#fff'}
      />
    );
  }
}

@withNavigation
export default class DetailScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      contentAnimation: new Animated.Value(0)
    };
  }

  static route = {
    navigationBar: {
      renderTitle: props => <Header title={props.params.item.name} />,
      subtitle: '23/208',
      renderLeft: () => <LeftButton />,
      renderRight: () => {},
      renderBackground: () => {}
    }
  };

  render() {
    const { item } = this.props;
    const contentScale = this.state.contentAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [2, 1]
    });
    const contentTranslate = this.state.contentAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [100, 1]
    });
    const opacityTransition = this.state.contentAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1]
    });

    return (
      <View style={[styles.container, { paddingTop: BAR_HEIGHT / 2 }]}>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center'
          }}>
          <SharedElementGroup
            id="place-header"
            configureTransition={() => ({
              timing: Animated.timing,
              easing: Easing.elastic(2),
              duration: 200
            })}
            onTransitionStart={(transitionProps, prevTransitionProps) => {
              const inverse = transitionProps.scene.index <
                prevTransitionProps.scene.index;
              Animated.timing(this.state.contentAnimation, {
                duration: 400,
                toValue: inverse ? 0 : 1,
                useNativeDriver: true
              }).start();
            }}>
            <SharedElement id="image">
              {animation => (
                <Animated.View
                  style={[
                    styles.headerShadow,
                    {
                      shadowRadius: 15,
                      shadowOffset: { width: 0, height: 6 },
                      shadowOpacity: 0.2,
                      height: ITEM_SIZE * 1.3,
                      width: ITEM_SIZE * 1.3,
                      borderRadius: ITEM_SIZE * 1.3 / 2,
                      backgroundColor: 'transparent',
                      marginVertical: 10
                    },
                    animation
                  ]}>
                  <TouchableWithoutFeedback
                    hitSlop={{ top: 20, left: 20, bottom: 20, right: 20 }}
                    onPress={() => this.props.navigator.pop()}>
                    <Image
                      source={{ uri: item.image }}
                      style={[
                        {
                          height: ITEM_SIZE * 1.3,
                          width: ITEM_SIZE * 1.3,
                          borderRadius: ITEM_SIZE * 1.3 / 2
                        }
                      ]}
                    />
                  </TouchableWithoutFeedback>
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
                { translateY: contentTranslate },
                { scale: contentScale }
              ],
              opacity: opacityTransition
            }}>
            <Text style={[styles.nameText, { fontSize: 36 }]}>
              {item.name}
            </Text>
            <Text style={[styles.ageText, { fontSize: 82 }]}>
              {item.age}
            </Text>
            <Text style={[styles.descriptionText, { fontSize: 24 }]}>
              {item.description}
            </Text>
          </Animated.View>
        </View>
      </View>
    );
  }
}
