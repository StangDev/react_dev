import React, { Component } from 'react';
import { View, Text } from 'react-native';
import moduleName from 'Met';

class Home extends Component {
    static navigationOptions ={

    }
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View>
        <Text> textInComponent </Text>
      </View>
    );
  }
}

