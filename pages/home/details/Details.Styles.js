import { StyleSheet } from 'react-native';
 
const HEADER_MAX_HEIGHT = 200;
const HEADER_MIN_HEIGHT = 60;
const HEADER_SCROLL_DISTANCE = 140;

export const DetailsStyles = StyleSheet.create({
	ContainerStyles: { 
		flex: 1,
	  flexDirection: 'row',
	  flexWrap: 'wrap',
	  alignItems: 'flex-start',
	  justifyContent: 'space-between',
	},
	TextStyles: { color: 'green' },
	fill: {
    flex: 1,
  },
  // flex: {
  // 	width: '100%',
  // 	backgroundColor: 'gold',
  //   alignItems: 'center',
  //   justifyContent: 'center',
    
  // },
  flexItem: {
  	flexGrow: 1,
  	flexBasis: 100,
  	backgroundColor: 'green'
  },
  row: {

  	/*width: '50%',*/
    flexGrow: 1,
    backgroundColor: 'gold',
		flexBasis: 100,
  },
  header: {
	  position: 'absolute',
	  top: 0,
	  left: 0,
	  right: 0,
	  backgroundColor: '#fff',
	  overflow: 'hidden',
	},
	bar: {
	  marginTop: 28,
	  height: 32,
	  alignItems: 'center',
	  justifyContent: 'center',
	},
	title: {
	  backgroundColor: 'transparent',
	  color: 'white',
	  fontSize: 18,
	},
	scrollViewContent: {
	  marginTop: HEADER_MAX_HEIGHT,
	},
	backgroundImage: {
	  position: 'absolute',
	  top: 0,
	  left: 0,
	  right: 0,
	  width: null,
	  height: HEADER_MAX_HEIGHT,
	  resizeMode: 'cover',
	}
});