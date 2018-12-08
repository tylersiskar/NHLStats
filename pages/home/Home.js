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

		this.props.navigation.setParams({
      scrollToTop: () => {
        this.flatListElem.scrollToOffset({ x: 0, y: 0, animated: true })
      }
    });
		
	}

	_goToDetails (team) {
		this.props.navigation.navigate('Details', {team: team});
	}

  render() {
    return (
      <View style={HomeStyles.ContainerStyles}>
      	
        <FlatList
        	ref={(el) => {
        		this.flatListElem = el;
        	}}
				  data={this.state.teams}
				  showsVerticalScrollIndicator={false}
				  renderItem={
				  	({item}) => { 
				  		return <TouchableOpacity
				  			 style={HomeStyles.ListItemStyles}
				         onPress={this._goToDetails.bind(this, item)}
				       >
				       	<Text> {item.name} </Text>
				      </TouchableOpacity>
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
