import React from 'react';
import {View, Text, Image, StyleSheet, Dimensions} from 'react-native';
import Carousel from 'react-native-snap-carousel';

const carouselData = [
  {
    title: 'Slide 1',
    content: 'Content of Slide 1',
    image: require('../assests/s-1.jpeg'), // Replace with your image path
  },
  {
    title: 'Slide 2',
    content: 'Content of Slide 2',
    image: require('../assests/s-1.jpeg'), // Replace with your image path
  },
  {
    title: 'Slide 3',
    content: 'Content of Slide 3',
    image: require('../assests/s-1.jpeg'), // Replace with your image path
  },
  // Add more items as needed
];

const MyCarousel = () => {
  const sliderWidth = Dimensions.get('window').width;
  const itemWidth = sliderWidth * 0.8; // For example, each slide takes up 80% of the screen width

  const renderItem = ({item}) => {
    return (
      <View style={styles.slide}>
        <Image source={item.image} style={styles.image} />
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.content}>{item.content}</Text>
      </View>
    );
  };

  return (
    <Carousel
      data={carouselData}
      renderItem={renderItem}
      sliderWidth={sliderWidth}
      itemWidth={itemWidth}
    />
  );
};

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 20,
    margin: 10,
    height: 200,
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: 8,
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  content: {
    fontSize: 16,
  },
});

export default MyCarousel;
