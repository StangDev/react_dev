/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {ScrollView, StyleSheet, FlatList, ActivityIndicator, Text, View,Linking ,Image} from 'react-native';
import {createDrawerNavigator} from 'react-navigation';
import { Card, Button, CheckBox ,Icon ,Header } from 'react-native-elements'

console.disableYellowBox = true;

export default class App extends Component {

  constructor(props){
    super(props);
    this.state ={ isLoading: true}
  }

  componentDidMount(){
    return fetch('http://testapi01a.tonproject.com/api/MobileNew')
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState({
          isLoading: false,
          dataSource: responseJson,
        }, function(){

        });

      })
      .catch((error) =>{
        console.error(error);
      });
  }






  render() {


    if(this.state.isLoading){
      return(
        <View style={styles.container}>
          <ActivityIndicator/>
        </View>
      )
    }

    return(
   
       
      <View >
       <Header
          leftComponent={{ icon: 'menu', color: '#fff' }}
          centerComponent={{ text: 'MY TITLE', style: { color: '#fff' } }}
          rightComponent={{ icon: 'home', color: '#fff' }}
        />
        <FlatList
          data={this.state.dataSource}
          renderItem={({item}) => 
          <Card
          style={styles.container}
          title={item.title}
          image={{uri: item.enclosure_url}}>
          <Text style={{marginBottom: 10}}>
           {item.description}
          </Text>
          <Button
          onPress={ ()=>{ Linking.openURL(item.link)}}
            icon={{name: 'code'}}
            backgroundColor='#03A9F4'
            fontFamily='Lato'
            buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
            title='อ่านต่อ...' />
        </Card>}
          keyExtractor={(item, index) => index}
        />
      </View>
    );

  }
}

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
