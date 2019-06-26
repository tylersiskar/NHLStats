import React from 'react';
import styled     from 'styled-components/native';
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

// padding-top: ${ ({firstChild, noPadding}) => (firstChild && !noPadding) ? Constants.defaultPaddingTop : 0 }px;
//     padding-right: ${ ({noPadding}) => noPadding ?  0 : Constants.defaultPadding }px;
//     padding-bottom: ${ ({lastChild, noPadding}) => (lastChild || noPadding) ? 0 : Constants.defaultPaddingBottom}px;
//     padding-left: ${ ({noPadding}) => noPadding ?  0 : Constants.defaultPadding }px;

const FlexWrapper = styled.View`
    display: flex;
    justify-content: space-around;
    background-color: blue;
    flex-direction: row;
    align-items: stretch;
    flex-grow: 1;
`;


export class DetailsScreen extends React.Component {

  constructor(props) {
    super(props);

    let team = this.props.navigation.getParam('team', {name: 'No Team'});
    console.log('ty', team);

    // New pic

    var str = team.name;
    var picture = logo1;
    
    console.log('wh', picture);
    var logo = str.split(' ');
    console.log('l', logo);
    var yes = logo[1];
    var ye = yes.trim(); 
    var link = './img/';
    var link2 = '.png';
    var linktotal = link.concat(ye, link2);
    
    console.log('words', linktotal);
    console.log('words1', picture);
    // if(linktotal === logo1){
    //   picture = logo1
    // } else if (linktotal === logo2){
    //   picture = logo2
    // }
    // else{
    //   picture = './img/Sabres.png'
    // }


    // switch(linktotal) {

    //   case linktotal === './img/Penguins.png':
    //     picture = './img/Penguins.png';
        
    //     break;
    //   case linktotal === './img/Bruins.png':
    //     picture = './img/Bruins.png';
    //   default:
    //     picture = './img/Sabres.png';
    //   break;
    // }
    
    //var link = './img/' + ye + '.png';

    this.state = {
      team: team,
      scrollY: new Animated.Value(0),
      stats: [],
      photo: linktotal
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
    
        <FlexWrapper style={DetailsStyles.scrollViewContent}>

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
            let loss = stat && 
                              stat.splits && 
                              stat.splits[0] && 
                              stat.splits[0].stat &&
                              stat.splits[0].stat.losses ? 
                              stat.splits[0].stat.losses :
                              'No Data';
            let ot = stat && 
                              stat.splits && 
                              stat.splits[0] && 
                              stat.splits[0].stat &&
                              stat.splits[0].stat.ot ? 
                              stat.splits[0].stat.ot :
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
            console.log('a',Object.keys(data).length);

            return (
              /*style={DetailsStyles.ContainerStyles}*/
              /*style={DetailsStyles.flexItem}*/
              
                <View key={index} style={DetailsStyles.flexItem}>
                 
                  
                  <Text>{'Wins: ' + wins}</Text>
                   <Text>{'Losses: ' + loss}</Text>
                    <Text>{'OTL: ' + ot}</Text>
                     <Text>{'Points: ' + points}</Text>
                  
                
                </View>
              
            
            );
          
          })}
      </FlexWrapper>
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
            source={require('./img/Jose.png')}

          />
          <View style={DetailsStyles.bar}>
          </View>
        </Animated.View>
      </View>
    );
  }
}