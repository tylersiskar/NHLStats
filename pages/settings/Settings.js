import React from 'react';
import { Text, View, TextInput } from 'react-native';
import { createStackNavigator } from 'react-navigation';

class SettingsScreen extends React.Component {

	static navigationOptions = {
		title: 'Settings'
	};

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Settings!</Text>
        <TextInput
          placeholder="Enter your email!"
          returnKeyType="next"
          keyboardType="email-address"
          textContentType="username"
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
      </View>
    );
  }
}

export const SettingsStack = createStackNavigator({
  Settings: SettingsScreen
});
