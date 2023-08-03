import {View, Image, StyleSheet, ScrollView, Text} from 'react-native';
import React from 'react';
import colors from '../styles/colors';
import Icon from 'react-native-vector-icons/FontAwesome';

function About() {
  return (
    <ScrollView>
      <View style={styles.container}>
        <View>
          <Image
            source={require('../assests/about.jpeg')}
            style={{height: 300, width: 400}}
          />
        </View>
        <View style={styles.title}>
          <Text style={{fontSize: 22}}>About us</Text>
        </View>
        <View style={styles.description}>
          <Text style={styles.info}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
            at magna porttitor lorem mollis ornare. Fusce varius varius massa.
            Vivamus nec odio tempus, condimentum ex eget, varius diam.
          </Text>
          <Text style={styles.info}>
            Nunc efficitur laoreet vulputate. Curabitur mi ligula, aliquet
            commodo leo in, consectetur venenatis tellus. Maecenas quis vehicula
            erat, vitae finibus tellus. Cras rhoncus ipsum quis lacus aliquam,
            quis euismod ligula varius. Phasellus ac odio rhoncus, aliquet nisl
            lobortis, commodo orci. Quisque bibendum est ut pellentesque
            hendrerit.
          </Text>
        </View>
        <View style={styles.titles}>
          <Text style={{fontSize: 22}}>Our Team</Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            padding: 15,
            borderBottomColor: colors.gray,
            borderBottomWidth: 1,
            backgroundColor: colors.white,
          }}>
          <Image
            source={require('../assests/ceo.jpeg')}
            style={{height: 90, width: 90, borderRadius: 10}}
          />
          <View style={{padding: 20}}>
            <Text style={styles.titleName}>Rickie Baroch</Text>
            <Text style={styles.titlePostion}>CEO</Text>
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            padding: 15,
            borderBottomColor: colors.gray,
            borderBottomWidth: 1,
            backgroundColor: colors.white,
          }}>
          <Image
            source={require('../assests/5.jpeg')}
            style={{height: 90, width: 90, borderRadius: 10}}
          />
          <View style={{padding: 20}}>
            <Text style={styles.titleName}>Robert Smith</Text>
            <Text style={styles.titlePostion}>Manager</Text>
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            padding: 15,
            borderBottomColor: colors.gray,
            borderBottomWidth: 1,
            backgroundColor: colors.white,
          }}>
          <Image
            source={require('../assests/2.jpeg')}
            style={{height: 90, width: 90, borderRadius: 10}}
          />
          <View style={{padding: 20}}>
            <Text style={styles.titleName}>Alex Edwards</Text>
            <Text style={styles.titlePostion}>Developer</Text>
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            padding: 15,
            backgroundColor: colors.white,
          }}>
          <Image
            source={require('../assests/3.jpeg')}
            style={{height: 90, width: 90, borderRadius: 10}}
          />
          <View style={{padding: 20}}>
            <Text style={styles.titleName}>Erika Mateo</Text>
            <Text style={styles.titlePostion}>Designer</Text>
          </View>
        </View>

        <View style={styles.titles}>
          <Text style={{fontSize: 22}}>Our Client</Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            padding: 15,
            borderBottomColor: colors.gray,
            borderBottomWidth: 1,
            backgroundColor: colors.white,
          }}>
          <Image
            source={require('../assests/10.jpeg')}
            style={{height: 90, width: 90, borderRadius: 10}}
          />
          <View style={{padding: 20}}>
            <Text style={styles.titleName}>NBJ Group of Company</Text>
            <Text style={styles.titlePostion}>Group Member</Text>
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            padding: 15,
            borderBottomColor: colors.gray,
            borderBottomWidth: 1,
            backgroundColor: colors.white,
          }}>
          <Image
            source={require('../assests/11.jpeg')}
            style={{height: 90, width: 90, borderRadius: 10}}
          />
          <View style={{padding: 20}}>
            <Text style={styles.titleName}>NEXT Textile</Text>
            <Text style={styles.titlePostion}>Member</Text>
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            padding: 15,
            borderBottomColor: colors.gray,
            borderBottomWidth: 1,
            backgroundColor: colors.white,
          }}>
          <Image
            source={require('../assests/12.jpeg')}
            style={{height: 90, width: 90, borderRadius: 10}}
          />
          <View style={{padding: 20}}>
            <Text style={styles.titleName}>NFM Group of company</Text>
            <Text style={styles.titlePostion}>CEO & Respected Member</Text>
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            padding: 15,
            borderBottomColor: colors.gray,
            borderBottomWidth: 1,
            backgroundColor: colors.white,
            marginBottom: 50,
          }}>
          <Image
            source={require('../assests/15.jpeg')}
            style={{height: 90, width: 90, borderRadius: 10}}
          />
          <View style={{padding: 20}}>
            <Text style={styles.titleName}>VRC Fashions</Text>
            <Text style={styles.titlePostion}>HR and Member</Text>
          </View>
        </View>

        <View
          style={{
            backgroundColor: 'black',
            height: 200,
          }}>
          <View
            style={{
              borderBottomColor: colors.gray,
              borderBottomWidth: 1,
              padding: 15,
            }}>
            <Text style={{color: 'white', textAlign: 'right'}}>to top</Text>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
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
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    borderBottomColor: colors.gray,
    borderBottomWidth: 1,
    padding: 15,
    fontWeight: 'bold',
  },
  titles: {
    borderBottomColor: colors.gray,
    borderBottomWidth: 1,
    borderTopColor: colors.gray,
    borderTopWidth: 1,
    padding: 15,
    fontWeight: 'bold',
  },
  description: {
    backgroundColor: colors.white,
  },
  info: {
    fontSize: 18,
    padding: 15,
    textAlign: 'justify',
  },
  titleName: {
    fontSize: 21,
  },
  titlePostion: {
    fontSize: 21,
    color: colors.gray,
  },
});
export default About;
