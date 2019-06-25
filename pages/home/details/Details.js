import React from 'react';
import { 
    Text, 
    View, 
    Button,
    Alert,
    ScrollView,
    Animated
} from 'react-native';
import { DetailsStyles } from './Details.Styles';
import logo1 from './img/Penguins.png';
import logo2 from './img/Bruins.png';
const HEADER_MAX_HEIGHT = 200;
const HEADER_MIN_HEIGHT = 60;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

export class DetailsScreen extends React.Component {

  constructor(props) {
    super(props);

    let team = this.props.navigation.getParam('team', {name: 'No Team'});
    console.log('ty', team);

    // New pic

    var str = team.name;
    var picture = logo1;
    console.log('wh', str);
    var logo = str.split(' ');
    console.log('l', logo);
    var yes = logo[1];
    var ye = yes.trim(); 
    var link = './img/';
    var link2 = '.png';
    var linktota = link.concat(ye, link2);
    var linktotal = linktota.toString();
    console.log('words', linktotal);
    console.log('words1', logo1);
    // if(linktotal === logo1){
    //   console.log('case1', logo1);
    //   picture = logo1
    // } else if (linktotal === logo2){
    //   picture = logo2
    // }
    // else{
    //   picture = './img/Sabres.png'
    // }


    // switch(true) {
    //   case linktotal === logo1:
    //     picture = logo1;
    //     console.log('switch', picture);
    //     break;
    //   case linktotal === logo2:
    //     picture = logo2;
    //   default:
    //     picture = './img/Sabres.png';
    //   break;
    // }
    
    //var link = './img/' + ye + '.png';

    this.state = {
      team: team,
      scrollY: new Animated.Value(0),
      stats: [],
      photo: picture
    };
  }

  static navigationOptions = ({ navigation }) => {
    const team = navigation.getParam('team', {name: 'No Team'});
    return {
      title: team.name
    };
  };


  async componentDidMount () {


    //put fetch here
    let stats = [];
    try {
      let res = await fetch('https://statsapi.web.nhl.com/api/v1/teams/' + this.state.team.id + '/stats');
      let json  = await res.json();
      stats = json.stats;
      this.setState({stats: stats});
      console.log('check', stats);
    } catch (e) {
      console.log('some error!',e);
    }

    this.props.navigation.setParams({
      scrollToTop: () => {
        this.flatListElem.scrollToOffset({ x: 0, y: 0, animated: true })
      }
    });
  }
  
  _renderScrollViewContent() {
    return (
      <View style={DetailsStyles.scrollViewContent}>
        {this.state.stats && this.state.stats.map((stat, index) => {
          console.log('stat', stat);
          let inputs = Object.keys(stat.splits[0].stat);
          let result = Object.values(stat.splits[0].stat);
          let wins = stat && 
                            stat.splits && 
                            stat.splits[0] && 
                            stat.splits[0].stat &&
                            stat.splits[0].stat.wins ? 
                            stat.splits[0].stat.wins :
                            'No Data';
          let points = stat && 
                            stat.splits && 
                            stat.splits[0] && 
                            stat.splits[0].stat &&
                            stat.splits[0].stat.pts ? 
                            stat.splits[0].stat.pts :
                            'No Data';
          let data = stat && 
                            stat.splits && 
                            stat.splits[0] && 
                            stat.splits[0].stat ?
                            stat.splits[0].stat :
                            'N/A';   
                   
          return (
            <View key={index} style={DetailsStyles.row}>
              
              <Text>{inputs[index] + ': ' + result[index]}</Text>  
              <Text>{ 'Wins: '+  wins} </Text>
              <Text>{'Pts: ' + points}</Text>
            </View>
          );
        }
        )}
      </View>
    );
  }

  render() {

    const headerHeight = this.state.scrollY.interpolate({
      inputRange: [-(HEADER_SCROLL_DISTANCE), 0, HEADER_SCROLL_DISTANCE],
      outputRange: [HEADER_MAX_HEIGHT+HEADER_SCROLL_DISTANCE, HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
      extrapolate: 'clamp',
    });

    const imageTranslate = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [0, -50],
      extrapolate: 'clamp',
    });

    const imageScale = this.state.scrollY.interpolate({
      inputRange: [-50, 0, HEADER_SCROLL_DISTANCE],
      outputRange: [1.125, 1, 1],
      // extrapolate: 'clamp'
    });
    

    return (
      <View style={DetailsStyles.fill}>
        <ScrollView
          style={DetailsStyles.fill}
          scrollEventThrottle={16}
          showsVerticalScrollIndicator={false}
          onScroll={Animated.event(
            [{
              nativeEvent: {
                contentOffset: { y: this.state.scrollY }
              }
            }]
          )}
        >
          {this._renderScrollViewContent()}
        </ScrollView>
        <Animated.View style={
            [
              DetailsStyles.header, 
              {height: headerHeight}
            ]}>
          <Animated.Image
            style={[
              DetailsStyles.backgroundImage,
              {transform: [
                {translateY: imageTranslate}, 
                {scaleY: imageScale},
                {scaleX: imageScale}
              ]},
            ]}

            source={this.state.photo}

          />
          <View style={DetailsStyles.bar}>
          </View>
        </Animated.View>
      </View>
    );
  }
}