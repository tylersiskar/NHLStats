import React from 'react';
import { 
		Text, 
		View, 
		Button,
		Alert,
		TouchableOpacity,
		FlatList
} from 'react-native';
import { createStackNavigator } from 'react-navigation';
import { DetailsScreen } from './details/Details';
import { HomeStyles } from './Home.Styles';

export class HomeScreen extends React.Component {

	static navigationOptions = {
		title: 'Home'
	};

	constructor (props) {
		super(props);
		this.state = { isLoading: true };
	}

	async componentDidMount () {
		let teams = [];
		try {
			let res = await fetch('https://statsapi.web.nhl.com/api/v1/teams');
			let json 	= await res.json();
			teams = json.teams;
			this.setState({teams: teams});
		} catch (e) {
			console.log('some error!',e);
		}
		
	}

	_goToDetails (team) {
		this.props.navigation.navigate('Details', {team: team});
	}

	/*
	<Button
    onPress={this._goToDetails.bind(this)}
    title="Go To Details!"
  />
	*/

  render() {
    return (
      <View style={HomeStyles.ContainerStyles}>
      	
        <FlatList
				  data={this.state.teams}
				  renderItem={
				  	({item}) => { 
				  		return <TouchableOpacity
				  			 // style={styles.button}
				         onPress={this._goToDetails.bind(this, item)}
				       >
				         <Text> {item.name} </Text>
				       </TouchableOpacity>
				  		//return <Text>{item.name}</Text> 
				  	} }
				  keyExtractor={(item, index) => index.toString()}
				/>
      </View>
    );
  }
}

export const HomeStack = createStackNavigator({
  Home: HomeScreen,
  Details: DetailsScreen,
});

//to navigate 
// HomeStack.navigationOptions = ({ navigation }) => {
//   let tabBarVisible = true;
//   if (navigation.state.index > 0) {
//     tabBarVisible = false;
//   }

//   return {
//     tabBarVisible,
//   };
// };
