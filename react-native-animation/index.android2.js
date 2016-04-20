/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

import React, {
  AppRegistry,
  Animated,
  LayoutAnimation,
  Component,
  StyleSheet,
  Text,
  View
} from 'react-native';

class rotateAnim extends Component {
  constructor(props) {
    super(props);
    this.state = {
      anim: new Animated.Value(0),
      time: 'hello',
    }
  }

  componentDidMount() {
    var that = this;
    this.setState({time: this.getTime()});
    setInterval(function(){
        that.setState({time: that.getTime()});
    }, 1000);
    Animated.spring(this.state.anim, {
      toValue: 1,
      friction: 1,
      velocity: 8,
      // duration: 500,
    }).start();
  }

  getTime() {
    var now = new Date();
    var format = function(t) {
      return t < 10 ? '0'+t : t;
    }
    var time = format(now.getHours()) + ':' + format(now.getMinutes()) + ':' + format(now.getSeconds());
    return time;
  }
  render() {
    return (
      // <View style={styles.container}>
        <Animated.View style={[styles.anim, {
          transform: [
            // {
            //   translateY: -100
            // },
            {
              rotateX: this.state.anim.interpolate({
                inputRange: [0, 1],
                outputRange: ['-90deg', '0deg'],
              })
            },
          ]
        }, {
          opacity: this.state.anim.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: [0, 1, 1],
          })
        }]}>
          <Text style={styles.text}>{this.state.time}</Text>
        </Animated.View>
      // </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0ff',
    transform: [{perspective: 800}],
  },
  anim: {
    // backgroundColor: '#f00',
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: 200,
  },
  text: {
    fontSize: 90,
    // backgroundColor: 'white',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('MyProject', () => rotateAnim);
