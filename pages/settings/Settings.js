import React from 'react';
import { Text, 
         View, 
         TextInput, 
         StatusBar,
         Switch,
         Button } 
from 'react-native';
import { createStackNavigator } from 'react-navigation';

class SettingsScreen extends React.Component {

	static navigationOptions = {
		title: 'Settings'
	};

  constructor (props) {
    super(props);
    this.state = { statusBarAnimation: 'slide' };
  }

  showOrHideStatusBar () {
    let newState = !this.state.statusBarHidden || false;
    this.setState({ statusBarHidden: newState });
    StatusBar.setHidden(newState, this.state.statusBarAnimation);
  }


  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Settings!</Text>
        <TextInput
          placeholder="Enter your email!"
          returnKeyType="next"
          // autoFocus={true}
          keyboardType="email-address"
          textContentType="username"
          selectionColor="red" //color of carat and selectorz
          style={{padding: 10}}
          blurOnSubmit={false}
          onSubmitEditing={() => { this.passwordInput.focus(); }}
        />
        <TextInput
          placeholder="Enter your password!"
          returnKeyType="done"
          keyboardType="default"
          secureTextEntry={true}
          ref={(i) => {
            this.passwordInput = i;
          }}
          textContentType="username"
          style={{padding: 10}}
        />
        <Text
        style={{'paddingTop': 50}}
        >Status bar will {this.state.statusBarAnimation}.</Text>
        <Switch
          value={this.state.statusBarAnimation === 'slide'}
          onValueChange={() => {
            if(this.state.statusBarAnimation === 'slide') {
              this.setState({statusBarAnimation: 'fade'});
            } else {
              this.setState({statusBarAnimation: 'slide'});
            }
          }}
        />
        <Button 
          title={(this.state.statusBarHidden ? 'Show' : 'Hide') + ' the status bar'}
          onPress={this.showOrHideStatusBar.bind(this)}/>
      </View>
    );
  }
}

export const SettingsStack = createStackNavigator({
  Settings: SettingsScreen
});
