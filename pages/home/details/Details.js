import React from 'react';
import { 
    Text, 
    View, 
    Button,
    Alert
} from 'react-native';
import { DetailsStyles } from './Details.Styles';

export class DetailsScreen extends React.Component {

  constructor(props) {
    super(props);
    let team = this.props.navigation.getParam('team', {name: 'No Team'});
    this.state = {team: team};
  }

  static navigationOptions = ({ navigation }) => {
    const team = navigation.getParam('team', {name: 'No Team'});
    return {
      title: team.name
    };
  };

  render() {
    return (
      <View style={DetailsStyles.ContainerStyles}>
        <Text style={DetailsStyles.TextStyles}>{this.state.team ? this.state.team.name : 'No Team Name'}</Text>
      </View>
    );
  }
}