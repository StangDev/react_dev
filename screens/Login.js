import React, { Component } from 'react';
import { View, Text, Button,StyleSheet } from 'react-native';
import { DrawerActions } from 'react-navigation';
export class Login extends Component {
    

  render() {
    return (
      <View style={styles.container}>
       <Text>This is the Login screen</Text>
      </View>
    )
  }
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5FCFF',
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
  
export default Login;