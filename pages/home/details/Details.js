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

const HEADER_MAX_HEIGHT = 200;
const HEADER_MIN_HEIGHT = 60;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

export class DetailsScreen extends React.Component {

  constructor(props) {
    super(props);
    let team = this.props.navigation.getParam('team', {name: 'No Team'});
    this.state = {
      team: team,
      scrollY: new Animated.Value(0)
    };
  }

  static navigationOptions = ({ navigation }) => {
    const team = navigation.getParam('team', {name: 'No Team'});
    return {
      title: team.name
    };
  };

  componentDidMount () {
    this.props.navigation.setParams({
      scrollToTop: () => {
        this.flatListElem.scrollToOffset({ x: 0, y: 0, animated: true })
      }
    });
  }

  _renderScrollViewContent() {
    const data = Array.from({length: 30});
    return (
      <View style={DetailsStyles.scrollViewContent}>
        {data.map((_, i) =>
          <View key={i} style={DetailsStyles.row}>
            <Text>{i+1}</Text>
          </View>
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
            source={require('./img/sabres.png')}
          />
          <View style={DetailsStyles.bar}>
          </View>
        </Animated.View>
      </View>
    );
  }
}