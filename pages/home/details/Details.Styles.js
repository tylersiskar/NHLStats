import { StyleSheet } from 'react-native';

const HEADER_MAX_HEIGHT = 200;
const HEADER_MIN_HEIGHT = 60;
const HEADER_SCROLL_DISTANCE = 140;

export const DetailsStyles = StyleSheet.create({
	ContainerStyles: { flex: 1, justifyContent: 'center', alignItems: 'center' },
	TextStyles: { color: 'green' },
	fill: {
    flex: 1,
  },
  row: {
    height: 40,
    margin: 16,
    backgroundColor: '#D3D3D3',
    alignItems: 'center',
    justifyContent: 'center',
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