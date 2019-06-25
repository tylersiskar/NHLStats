import React from 'react';
import { 
		Text, 
		View, 
		Button,
		Alert,
		TouchableOpacity,
		FlatList,
		Modal,
		TouchableHighlight,
		AsyncStorage
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
		this.state = { isLoading: true, modalVisible: false };
	}

	async componentDidMount () {

		//first let's check for login info
		let isLoggedIn;
		// try {	
		// 	isLoggedIn = await AsyncStorage.getItem('user:name');
		// 	if(!isLoggedIn) {
		// 		this.setState({modalVisible: true});
		// 	}
		// } catch (error) {
  //    // Error retrieving data
  //    console.error(error);
  //  	}

		//second we'll check for teams
		let teams = [];
		try {
			let res = await fetch('https://statsapi.web.nhl.com/api/v1/teams');
			let json 	= await res.json();
			teams = json.teams;
			this.setState({teams: teams});
			console.log('checkteam', teams);
		} catch (e) {
			console.log('some error!',e);
		}

		this.props.navigation.setParams({
      scrollToTop: () => {
        this.flatListElem.scrollToOffset({ x: 0, y: 0, animated: true })
      }
    });
		
	}

	setModalVisibility (isVisible) {
		this.setState({modalVisible: isVisible});
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
				<Modal
			    animationType="slide"
			    transparent={false}
			    visible={this.state.modalVisible}
			    onRequestClose={() => {
			      Alert.alert('Modal has been closed.');
			    }}>
			    <View style={HomeStyles.ContainerStyles}>
			      <Text>Hello World!</Text>
			      <TouchableHighlight
			        onPress={() => {
			          this.setModalVisibility(!this.state.modalVisible);
			        }}>
			        <Text>Hide Modal</Text>
			      </TouchableHighlight>
			    </View>
			  </Modal>
      </View>
    );
  }
}

export const HomeStack = createStackNavigator({
  Home: HomeScreen,
  Details: DetailsScreen,
});

//to navigate without footer
// HomeStack.navigationOptions = ({ navigation }) => {
//   let tabBarVisible = true;
//   if (navigation.state.index > 0) {
//     tabBarVisible = false;
//   }

//   return {
//     tabBarVisible,
//   };
// };
