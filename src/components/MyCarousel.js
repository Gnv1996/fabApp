import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  FlatList,
} from 'react-native';

const windowWidth = Dimensions.get('window').width;

const carouselData = [
  {
    title: 'Upcoming Events – India Expo centre',
    content:
      'India Biggest Electric Motor Vehicle Show and International Exhibition on Electric Vehicles, Hybrid Vehicles ,Automotive.',
    image: require('../assests/s-1.jpeg'), // Replace with your image path
  },
  {
    title: 'Trade Shows in Noida',
    content:
      'A Combination of Trade mart. With Exhibition & Convention Facilities ; Fully Certified Venue to hold. International ...',
    image: require('../assests/s-3.jpeg'), // Replace with your image path
  },
  {
    title: 'Indian Art Exhibitions in Delhi',
    content:
      'Delhi which are popular for Indian Art Exhibition. Kiran Nadar Museum of Art has always been in limelight for conducting Indian Art ...',
    image: require('../assests/s-4.jpeg'), // Replace with your image path
  },
  {
    title: 'Showcase the diverse cultural heritage',
    content:
      'expo aims to facilitate a holistic conversation and showcase the diverse cultural heritage exhibited by various museums across the country..',
    image: require('../assests/s-5.jpeg'), // Replace with your image path
  },
  // Add more items as needed
];

const MyCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (currentIndex + 1) % carouselData.length;
      setCurrentIndex(nextIndex);
    }, 2000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [currentIndex]);

  useEffect(() => {
    // Scroll to the new index when currentIndex changes
    if (flatListRef.current) {
      flatListRef.current.scrollToIndex({index: currentIndex, animated: true});
    }
  }, [currentIndex]);
  const renderItem = ({item}) => (
    <View style={styles.carouselContainer}>
      <Image source={item.image} style={styles.image} />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.content}>{item.content}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={carouselData}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        initialNumToRender={1}
        getItemLayout={(data, index) => ({
          length: windowWidth,
          offset: windowWidth * index,
          index,
        })}
        onMomentumScrollEnd={event => {
          const newIndex = Math.floor(
            event.nativeEvent.contentOffset.x / windowWidth,
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  carouselContainer: {
    width: 350,
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 8,
    marginTop: 5,
    borderColor: 'gray',
    borderWidth: 1,
    margin: 20,
  },
  image: {
    width: '100%',
    height: 250,
    borderRadius: 8,
    marginBottom: 10,
  },
  title: {
    paddingLeft: 10,
    paddingRight: 10,
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: 'black',
  },
  content: {
    fontSize: 16,
    color: 'gray',
    textAlign: 'justify',
    paddingBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
  },
  navigationButton: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'blue',
    marginTop: 10,
  },
});

export default MyCarousel;

// import React, {useState} from 'react';
// import {View, Text, Image, StyleSheet, Dimensions} from 'react-native';
// import Carousel from 'react-native-snap-carousel';

// const carouselData = [
//   {
//     title: 'Upcoming Events – India Expo centre',
//     content:
//       'India Biggest Electric Motor Vehicle Show and International Exhibition on Electric Vehicles, Hybrid Vehicles ,Automotive.',
//     image: require('../assests/s-1.jpeg'), // Replace with your image path
//   },
//   {
//     title: 'Trade Shows in Noida',
//     content:
//       'A Combination of Trade mart. With Exhibition & Convention Facilities ; Fully Certified Venue to hold. International ...',
//     image: require('../assests/s-3.jpeg'), // Replace with your image path
//   },
//   {
//     title: 'Indian Art Exhibitions in Delhi',
//     content:
//       'Delhi which are popular for Indian Art Exhibition. Kiran Nadar Museum of Art has always been in limelight for conducting Indian Art ...',
//     image: require('../assests/s-4.jpeg'), // Replace with your image path
//   },
//   {
//     title: 'Showcase the diverse cultural heritage',
//     content:
//       'expo aims to facilitate a holistic conversation and showcase the diverse cultural heritage exhibited by various museums across the country..',
//     image: require('../assests/s-5.jpeg'), // Replace with your image path
//   },
//   // Add more items as needed
// ];

// const MyCarousel = () => {
//   const sliderWidth = Dimensions.get('window').width;
//   const itemWidth = sliderWidth * 0.8; // For example, each slide takes up 80% of the screen width

//   const renderItem = ({item}) => {
//     return (
//       <View style={styles.slide}>
//         <Image source={item.image} style={styles.image} />
//         <Text style={styles.title}>{item.title}</Text>
//         <Text style={styles.content}>{item.content}</Text>
//       </View>
//     );
//   };

//   return (
//     <Carousel
//       data={carouselData}
//       renderItem={renderItem}
//       sliderWidth={sliderWidth}
//       itemWidth={itemWidth}
//       autoplay={true} // Enable autoplay
//       autoplayInterval={3000}
//     />
//   );
// };

// const styles = StyleSheet.create({
//   slide: {
//     // flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'white',
//     borderRadius: 8,
//     marginTop: 5,
//     height: 410,
//   },
//   image: {
//     width: '100%',
//     height: 250,
//     borderRadius: 10,
//     marginBottom: 10,
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginBottom: 10,
//     textAlign: 'justify',
//     paddingLeft: 10,
//     paddingRight: 10,
//   },
//   content: {
//     fontSize: 16,
//     textAlign: 'justify',
//     color: 'gray',
//     paddingLeft: 10,
//     paddingRight: 10,
//     paddingBottom: 15,
//   },
// });

// export default MyCarousel;
