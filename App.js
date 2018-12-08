//An NHL Stats Application!
import React from 'react';
import { Text, View } from 'react-native';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { HomeStack } from './pages/home/Home';
import { SettingsStack } from './pages/settings/Settings';

const TabNavigator = createBottomTabNavigator({
  Home: HomeStack,
  Settings: SettingsStack
}, {
  defaultNavigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ focused, horizontal, tintColor }) => {
      const { routeName } = navigation.state;
      let iconName;
      if (routeName === 'Home') {
        iconName = `ios-information-circle${focused ? '' : '-outline'}`;
      } else if (routeName === 'Settings') {
        iconName = `ios-cog`;
      }
      // You can return any component that you like here! We usually use an
      // icon component from react-native-vector-icons
      return <Ionicons name={iconName} size={horizontal ? 20 : 25} color={tintColor} />;
    },
    tabBarOnPress: ({ navigation, defaultHandler }) => {
      if (navigation.isFocused() && navigation.state.index > 0) {
        // Pop to root on tab bar pressed if already focused on the tab
        navigation.popToTop();
      } else {
        // Scroll to top if at root of tab
        const navigationInRoute = navigation.getChildNavigation(
          navigation.state.routes[0].key
        );

        if (
          !!navigationInRoute &&
          navigationInRoute.isFocused() &&
          !!navigationInRoute.state.params &&
          !!navigationInRoute.state.params.scrollToTop
        ) {
          navigationInRoute.state.params.scrollToTop();
        } else {
          defaultHandler();
        }
      }
    }
  }),
  tabBarOptions: {
    activeTintColor: '#ff5400',
    inactiveTintColor: 'gray',
    tabBarOnPress: () => {
      
    }
  }
});

const AppContainer = createAppContainer(TabNavigator);

class App extends React.Component {

  render() {
    return <AppContainer />;
  }
}

export default App;