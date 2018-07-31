
import React, {Component} from 'react';
import { StyleSheet, FlatList, ActivityIndicator,  View,Linking ,Image} from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body } from 'native-base';

console.disableYellowBox = true;

export class Home extends Component {

 
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
   
       
      <Container >
         <Header />
        <Content>
        <FlatList
          data={this.state.dataSource}
          renderItem={({item}) => 
          
         <Card style={{flex: 0.2}}>
           <CardItem>
         <Text>{item.title }</Text>
         </CardItem>
         <CardItem cardBody>
             <Image source={{uri:  item.enclosure_url}} style={{height: 200, width: null, flex: 1}}/>
         </CardItem>
         <CardItem>
         <Text>{item.description }</Text>
           <Left>
             <Button transparent textStyle={{color: '#87838B'}}>
               <Icon name="logo-github" />
               <Text>1,926 stars</Text>
             </Button>
           </Left>
         </CardItem>
       </Card>}
          keyExtractor={(item, index) => index}
        />
         </Content>
      </Container>
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

export default Home;