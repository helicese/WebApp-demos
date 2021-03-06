 'use strict';

import React from 'react';
import ReactNative, {
  Animated,
  AppRegistry,
  Easing,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import UIExplorerButton from './UIExplorerButton';

        // render: function() {
class FadeInView extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        fadeAnim: new Animated.Value(0), // opacity 0
      };
    }
    componentDidMount() {
      Animated.timing(       // Uses easing functions
        this.state.fadeAnim, // The value to drive
        {
          toValue: 1,        // Target
          duration: 2000,    // Configuration
        },
      ).start();             // Don't forget start!
    }
    render() {
      return (
        <Animated.View   // Special animatable View
          style={{
            opacity: this.state.fadeAnim,  // Binds
          }}>
          {this.props.children}
        </Animated.View>
      );
    }
};
class FadeInExample extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        show: true,
      };
    }
    render() {
      return (
        <View>
          <UIExplorerButton onPress={() => {
              this.setState((state) => (
                {show: !state.show}
              ));
            }}>
            Press to {this.state.show ?
              'Hide' : 'Show'}
          </UIExplorerButton>
          {this.state.show && <FadeInView>
            <View style={styles.content}>
              <Text>FadeInView</Text>
            </View>
          </FadeInView>}
        </View>
      );
    }
};
class Fling extends React.Component {
    render() {
        this.anim = this.anim || new Animated.Value(0);
        return (
            <View>
              <UIExplorerButton onPress={() => {
                Animated.spring(this.anim, {
                  toValue: 0,   // Returns to the start
                  velocity: 3,  // Velocity makes it move
                  tension: -10, // Slow
                  friction: 1,  // Oscillate a lot
                }).start(); }}>
                Press to Fling it!
              </UIExplorerButton>
              <Animated.View
                style={[styles.content, {
                  transform: [   // Array order matters
                    {scale: this.anim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [1, 4],
                    })},
                    {translateX: this.anim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, 500],
                    })},
                    {rotate: this.anim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [
                        '0deg', '360deg' // 'deg' or 'rad'
                      ],
                    })},
                  ]}
                ]}>
                <Text>Transforms!</Text>
              </Animated.View>
            </View>
        );
    }
};
class Animate extends React.Component {
    render() {
      this.anims = this.anims || [1,2,3].map(
        () => new Animated.Value(0)
      );
      return (
        <View>
          <UIExplorerButton onPress={() => {
            var timing = Animated.timing;
            Animated.sequence([ // One after the other
              timing(this.anims[0], {
                toValue: 200,
                easing: Easing.linear,
              }),
              Animated.delay(400), // Use with sequence
              timing(this.anims[0], {
                toValue: 0,
                easing: Easing.elastic(2), // Springy
              }),
              Animated.delay(400),
              Animated.stagger(200,
                this.anims.map((anim) => timing(
                  anim, {toValue: 200}
                )).concat(
                this.anims.map((anim) => timing(
                  anim, {toValue: 0}
                ))),
              ),
              Animated.delay(400),
              Animated.parallel([
                Easing.inOut(Easing.quad), // Symmetric
                Easing.back(1.5),  // Goes backwards first
                Easing.ease        // Default bezier
              ].map((easing, ii) => (
                timing(this.anims[ii], {
                  toValue: 320, easing, duration: 3000,
                })
              ))),
              Animated.delay(400),
              Animated.stagger(200,
                this.anims.map((anim) => timing(anim, {
                  toValue: 0,
                  easing: Easing.bounce, // Like a ball
                  duration: 2000,
                })),
              ),
            ]).start(); }}>
            Press to Animate
          </UIExplorerButton>
          {['Composite', 'Easing', 'Animations!'].map(
            (text, ii) => (
              <Animated.View
                style={[styles.content, {
                  left: this.anims[ii]
                }]}>
                <Text>{text}</Text>
              </Animated.View>
            )
          )}
        </View>
      );
    }
};
class Demo extends React.Component {
    render() {
        return (
            <View>
                <FadeInExample />
                <Fling />
                <Animate />
            </View>

        );
    }
};

var styles = StyleSheet.create({
  content: {
    backgroundColor: 'deepskyblue',
    borderWidth: 1,
    borderColor: 'dodgerblue',
    padding: 20,
    margin: 20,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
});

AppRegistry.registerComponent('MyProject', () => Demo);