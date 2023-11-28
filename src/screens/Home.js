import {
  View,
  Text,
  ImageBackground,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import React from 'react';
import colors from '../styles/colors';
import MyCarousel from '../components/MyCarousel';
import Card from './Card';
import room1 from '../assests/room1.jpeg';
import room2 from '../assests/room2.jpeg';
import room3 from '../assests/room3.jpeg';
import room4 from '../assests/room4.jpeg';
import room5 from '../assests/room5.jpeg';
import room6 from '../assests/room6.jpeg';
import room7 from '../assests/room7.webp';
import room8 from '../assests/room8.jpeg';
import Shop from './Shop';
import shop1 from '../assests/shop6.webp';
import shop2 from '../assests/bed1.jpeg';
import seen1 from '../assests/seen1.webp';
import seen2 from '../assests/seen2.jpeg';
import seen3 from '../assests/seen3.webp';
import seen4 from '../assests/seen4.jpeg';
import seen5 from '../assests/seen5.jpeg';
import seen7 from '../assests/seen7.jpeg';
import {useNavigation} from '@react-navigation/native';

function ExhibitionCenterCard({title, description, imageSource}) {
  const navigation = useNavigation();
  const handleCardPress = () => {
    console.log('Exhibition center clicked:', title);

    // Delayed navigation to 'Open' screen
    setTimeout(() => {
      navigation.navigate('Open');
    }, 100);

    // Delayed go back to previous screen
    setTimeout(() => {
      navigation.goBack();
    }, 4000);
  };
  return (
    <TouchableOpacity onPress={handleCardPress}>
      <View style={styles.imgContain}>
        <Image source={imageSource} style={styles.imgFixed} />
        <Text
          style={{
            textAlign: 'left',
            fontWeight: 'bold',
            color: colors.black,
            margin: 5,
          }}>
          {title}
        </Text>
        <Text
          style={{
            color: colors.gray,
            textAlign: 'justify',
            marginLeft: 5,
            marginRight: 5,
            marginBottom: 7,
          }}>
          {description}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

function HomeScreen() {
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={{borderRadius: 5, height: 250, borderRadius: 5}}>
          <ImageBackground
            source={require('../assests/dp.jpeg')}
            style={styles.imageBackground}>
            <Text style={styles.titleInfo}>Welcome in fab App</Text>
            <Text style={styles.info}>
              Headlines are used to entertain, add shock, or hook readers to
              make them want to know more....
            </Text>
            <View
              style={{
                marginLeft: 20,
                marginTop: 10,
              }}>
              <TouchableOpacity style={styles.btn}>
                <Text
                  style={{
                    textAlign: 'center',
                    color: colors.white,
                    fontWeight: 'bold',
                  }}>
                  Explore Now
                </Text>
              </TouchableOpacity>
            </View>
          </ImageBackground>
        </View>
        <View style={{backgroundColor: colors.white}}>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 22,
              marginTop: 25,
              marginBottom: 15,
              marginLeft: 32,
              color: colors.black,
            }}>
            Our Exhibitions centre
          </Text>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <ExhibitionCenterCard
              title="Lucknow Center"
              description="An event at which objects such as paintings are shown to the public ..."
              imageSource={require('../assests/a.jpeg')}
            />

            <ExhibitionCenterCard
              title="Kolkata Center"
              description="An event at which objects such as paintings are shown to the public ..."
              imageSource={require('../assests/b.jpeg')}
            />
          </View>

          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: 15,
            }}>
            <ExhibitionCenterCard
              title="Delhi Center"
              description="An event at which objects such as paintings are shown to the public ..."
              imageSource={require('../assests/c.jpeg')}
            />

            <ExhibitionCenterCard
              title="Hyderabad Center"
              description="An event at which objects such as paintings are shown to the public ..."
              imageSource={require('../assests/d.jpeg')}
            />
          </View>
        </View>

        <View
          style={{
            backgroundColor: colors.orange,
            height: 70,
            width: '100%',
          }}>
          <View style={{flex: 1, flexDirection: 'row', marginBottom: 10}}>
            <View>
              <Text
                style={{
                  marginTop: 10,
                  marginBottom: 3,
                  marginLeft: 15,
                  fontSize: 20,
                  fontWeight: 'bold',
                  color: colors.black,
                }}>
                We are Best Interior Designer's
              </Text>
              <Text
                style={{marginLeft: 20, marginBottom: 10, color: '#28231D'}}>
                We'll Work Together to Create a Design Plan
              </Text>
            </View>
            <View
              style={{
                marginTop: 15,
                marginLeft: 46,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              {/* <TouchableOpacity style={styles.btns}>
                <Text style={{textAlign: 'center'}}>Join Us</Text>
              </TouchableOpacity> */}
            </View>
          </View>
        </View>

        <View style={{marginBottom: 10, marginTop: 30}}>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 22,
              marginBottom: 10,
              color: colors.black,
              marginLeft: 20,
              marginBottom: 20,
            }}>
            Room Interior Design
          </Text>
          <Card
            imageUri={room1}
            title="Wooden Flooring with Design"
            prices="$ 120 per/ft"
            description="Whether you're looking to update your home or office, our designers are experts. From There, We'll Work Together to Create a Design Plan That Meets Your Needs."
          />

          <Card
            imageUri={room2}
            title="Customised in bed and design"
            prices="$ 100 per/ft"
            description="A minimalist interior design can help you save money. The reason is that less money is spent on furnishing and decorating the property. "
          />

          <Card
            imageUri={room3}
            title="Customised in bed and Sofa"
            prices="$ 150 per/ft"
            description="Embracing simplicity, functionality, and negative space, minimalist interior design encourages a more intentional and harmonious way of living. "
          />
          <Card
            imageUri={room4}
            title="Best Look bed and wall"
            prices="$ 130 per/ft"
            description="Minimalism is one of the main current trends in interior decoration, valuing the concept of less is more focusing on what is functional."
          />

          <Card
            imageUri={room5}
            title="Customised in wall and bed"
            prices="$ 180 per/ft"
            description="Livspace Brings To You The Home Renovation Service You Need! Make Your Home Look Beautiful. Customised Home Interiors "
          />
          <Card
            imageUri={room6}
            title="Customised in Look of wall and bed"
            prices="$ 220 per/ft"
            description="Minimalist Interior Design: Less Is More for Timeless Elegance · Stress Reduction and Mental Clutter Reduction: Minimalism can have a ... "
          />
          <Card
            imageUri={room7}
            title="Customised in wall with painting"
            prices="$ 250 per/ft"
            description="Pay only half the token amount to book your home interiors. Meet our designer online. See live 3D designs from the comfort of your home "
          />
          <Card
            imageUri={room8}
            title="Design with Beautiful look of wall"
            prices="$ 210 per/ft"
            description="Keep it simple, yet well defined. Clean, modern lines are the best for a minimal design scheme. The focus is on the shape and functionality of the furniture."
          />
        </View>

        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 22,
            marginBottom: 10,
            color: colors.black,
            marginLeft: 20,
            marginBottom: 20,
          }}>
          Shop By Categories
        </Text>
        <View>
          <Shop
            imageUri1={shop1}
            imageUri2={shop2}
            title1=""
            title2="King Size bed"
          />
        </View>

        <View>
          <Shop
            imageUri1={seen1}
            imageUri2={seen2}
            title1=""
            title2="Wooden Furniture"
          />
        </View>

        <View>
          <Shop
            imageUri1={seen3}
            imageUri2={seen4}
            title1=""
            title2="Hunter wooden"
          />
        </View>

        <View style={{marginBottom: 15}}>
          <Shop
            imageUri1={seen5}
            imageUri2={seen7}
            title1=""
            title2="Multipurpose Furniture"
          />
        </View>

        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 22,
            marginBottom: 10,
            color: colors.black,
            marginLeft: 20,
            marginBottom: 20,
          }}>
          Upcoming Event
        </Text>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 30,
          }}>
          <MyCarousel />
        </View>
        <View
          style={{
            backgroundColor: '#28231D',
            height: 70,
          }}>
          <View
            style={{
              borderBottomColor: colors.gray,
              borderBottomWidth: 1,
              padding: 15,
            }}>
            <Text style={{color: 'white', textAlign: 'right'}}>to top</Text>
          </View>
          {/* <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <View style={{marginTop: 20, marginLeft: 10, marginRight: 20}}>
              <Icon name="facebook" size={40} color="#FFFFFF" />
            </View>
            <View style={{marginTop: 20, marginLeft: 30, marginRight: 20}}>
              <Icon name="twitter" size={40} color="#FFFFFF" />
            </View>
            <View style={{marginTop: 20, marginLeft: 30, marginRight: 10}}>
              <Icon name="instagram" size={40} color="#FFFFFF" />
            </View>
            <View style={{marginTop: 20, marginLeft: 30, marginRight: 20}}>
              <Icon name="youtube" size={35} color="#FFFFFF" />
            </View>
          </View>

          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 20,
            }}>
            <Text style={{color: 'white'}}>
              Imprint / Privacy | Terms & Condition |
            </Text>
            <Text style={{color: 'white'}}>Feedback</Text>
            <Text style={{color: 'white', marginTop: 10}}>
              Standard website
            </Text>
          </View> */}
        </View>
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  title: {
    textAlign: 'left',
    fontSize: 22,
    color: colors.black,
    fontWeight: 'bold',
    marginTop: 10,
  },

  imageBackground: {
    height: '100%',
    width: '100%',
    borderRadius: 5,
  },

  btn: {
    backgroundColor: colors.orange,
    width: 150,
    padding: 10,
    borderRadius: 20,
  },
  btk: {
    backgroundColor: colors.orange,
    width: '100%',
    padding: 10,
    borderRadius: 20,
  },
  btns: {
    backgroundColor: colors.white,
    width: 100,
    padding: 8,
    borderRadius: 20,
    borderColor: colors.gray,
  },
  titleInfo: {
    marginTop: 50,
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.white,
    marginLeft: 20,
  },
  info: {
    textAlign: 'justify',
    marginLeft: 20,
    marginRight: 20,
    marginTop: 10,
    width: 200,
    color: colors.white,
  },
  imgContain: {
    height: 210,
    width: 150,
    borderWidth: 1,
    borderColor: colors.gray,
    borderRadius: 5,
    margin: 15,
  },
  imgFixed: {
    height: 100,
    width: 150,
    borderRadius: 5,
  },
  imgBackground: {
    height: 400,
    width: '100%',
  },
  wooden: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 166,
    backgroundColor: colors.white,
    padding: 15,
  },
});
export default HomeScreen;
