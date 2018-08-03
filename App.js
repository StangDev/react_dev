import React, { Component } from 'react';
import { UIManager, LayoutAnimation, Alert } from 'react-native';
import { authorize, refresh, revoke } from 'react-native-app-auth';
import { Page, Button, ButtonContainer, Form, Heading } from './components';
import { createStore } from "redux";
import { Buffer } from 'buffer';


const reducer=(state,action)=>{
    switch (action.type) {
      case "ADD":
           state = action.payload;
        break;
      case "SUBTRACT":

        break;
      default:
    }
    return state;
}

const store = createStore(reducer,'');
store.subscribe(()=>{
    console.log("update Store:",store.getState());
});


console.disableYellowBox = true;
UIManager.setLayoutAnimationEnabledExperimental &&
UIManager.setLayoutAnimationEnabledExperimental(true);

type State = {
  hasLoggedInOnce: boolean,
  accessToken: ?string,
  accessTokenExpirationDate: ?string,
  refreshToken: ?string,
  idToken: ?string
};

const config = {
  issuer: 'http://tint.tonproject.com/id',
  clientId: 'tintmobile5',
  redirectUrl: 'io.identityserver.demo:/oauthredirect',
  scopes: ['openid', 'profile', 'email','phone','address','testapi01a','offline_access'],
  dangerouslyAllowInsecureHttpRequests: true,
  serviceConfiguration: {
    authorizationEndpoint: 'http://tint.tonproject.com/id/connect/authorize',
    tokenEndpoint: 'http://tint.tonproject.com/id/connect/token',
    revocationEndpoint: 'http://tint.tonproject.com/id/connect/revoke'
  }
};

export default class App extends Component<{}, State> {
  state = {
    hasLoggedInOnce: false,
    accessToken: '',
    accessTokenExpirationDate: '',
    refreshToken: '',
    idToken: '',
    beers: []
  };

  animateState(nextState: $Shape<State>, delay: number = 0) {
    setTimeout(() => {
      this.setState(() => {
        LayoutAnimation.easeInEaseOut();
        return nextState;
      });
    }, delay);
  }

  authorize = async () => {
    try {
        console.log(config);
        
      const authState = await authorize(config);
      console.log("authorize",authState);
      this.animateState(
        {
          hasLoggedInOnce: true,
          accessToken: authState.accessToken,
          accessTokenExpirationDate: authState.accessTokenExpirationDate,
          refreshToken: authState.refreshToken,
          idToken:authState.idToken
        },
        500
      );
    } catch (error) {
      Alert.alert('Failed to log in', error.message);
    }
  };

  refresh = async () => {
    try {
      const authState = await refresh(config, {
        refreshToken: this.state.refreshToken
      });

      this.animateState({
        accessToken: authState.accessToken || this.state.accessToken,
        accessTokenExpirationDate:
          authState.accessTokenExpirationDate || this.state.accessTokenExpirationDate,
        refreshToken: authState.refreshToken || this.state.refreshToken
      });
    } catch (error) {
      Alert.alert('Failed to refresh token', error.message);
    }
  };

  revoke = async () => {
    try {
      await revoke(config, {
        tokenToRevoke: this.state.accessToken,
        sendClientId: true
      });
      this.animateState({
        accessToken: '',
        accessTokenExpirationDate: '',
        refreshToken: ''
      });
    } catch (error) {
      Alert.alert('Failed to revoke token', error.message);
    }
  };

  render() {
    const { state } = this;
    if (state.idToken) {
      const jwtBody = state.idToken.split('.')[1];
      const base64 = jwtBody.replace('-', '+').replace('_', '/');
      const decodedJwt = Buffer.from(base64, 'base64');
      state.idTokenJSON = JSON.parse(decodedJwt);
    }
    store.dispatch({
      type:"ADD",
      payload:state
   });
    return (
      <Page>
        {!!state.accessToken ? (
          <Form>
            <Form.Label>accessToken</Form.Label>
            <Form.Value>{state.accessToken}</Form.Value>
            <Form.Label>ID Token</Form.Label>
            <Form.Value>{JSON.stringify(state.idTokenJSON)}</Form.Value>
            <Form.Label>accessTokenExpirationDate</Form.Label>
            <Form.Value>{state.accessTokenExpirationDate}</Form.Value>
            <Form.Label>refreshToken</Form.Label>
            <Form.Value>{state.refreshToken}</Form.Value>
          </Form>
        ) : (
          <Heading>{state.hasLoggedInOnce ? 'Goodbye.' : 'Hello, ZTDEV.'}</Heading>
        )}

        <ButtonContainer>
          {!state.accessToken && (
            <Button onPress={this.authorize} text="Authorize" color="#DA2536" />
          )}
          {!!state.refreshToken && <Button onPress={this.refresh} text="Refresh" color="#24C2CB" />}
          {!!state.accessToken && <Button onPress={this.revoke} text="Revoke" color="#EF525B" />}
        </ButtonContainer>
      </Page>
    );
  }
}
