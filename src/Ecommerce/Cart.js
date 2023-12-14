import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import axios from 'axios';

function Cart({route, navigation}) {
  const {item} = route.params;
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch data for the specific product using its ID
    axios
      .get(`https://fakestoreapi.com/products/${item.id}`)
      .then(res => {
        setData(res.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, [item.id]);

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <ScrollView>
      <Text style={styles.heading}>Product Details</Text>
      <View style={styles.product}>
        <Image
          source={{uri: data.image}}
          style={{
            width: 250,
            height: 300,
            marginLeft: 40,
            alignItems: 'center',
          }}
        />
        <View style={styles.productAlign}>
          <Text
            style={{
              color: 'black',
              fontWeight: 'bold',
              paddingTop: 10,
              paddingBottom: 10,
              fontSize: 22,
              width: 250,
              marginRight: 10,
            }}>
            {data.title}
          </Text>
          <Text
            style={{
              paddingTop: 7,
              paddingBottom: 7,
              color: 'brown',
              fontWeight: 'bold',
            }}>
            {data.category}
          </Text>
          <Text
            style={{
              color: 'red',
              fontWeight: 'bold',
              paddingTop: 7,
              paddingBottom: 7,
              fontSize: 25,
            }}>
            ₹{data.price}
          </Text>
          <Text style={styles.productDescription}>{data.description}</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.goBackButton} onPress={goBack}>
        <Text style={styles.goBackText}>Go Back</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  heading: {
    fontWeight: 'bold',
    fontSize: 25,
    color: 'black',
    marginTop: 60,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
  },
  productContainer: {},
  productItem: {
    flexDirection: 'row',
    marginBottom: 20,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
  },
  product: {
    backgroundColor: 'white',
    padding: 10,
    margin: 20,
    borderRadius: 10,
  },
  productImage: {
    width: 120,
    height: 220,
  },
  productDetails: {
    width: 220,
    padding: 10,
  },
  title: {
    fontSize: 27,
    fontWeight: 'bold',
    color: 'black',
  },
  productCategory: {
    color: 'brown',
    fontWeight: 'bold',
    paddingTop: 5,
    paddingBottom: 5,
  },
  pricetag: {
    color: 'red',
    fontWeight: 'bold',
    paddingTop: 5,
    paddingBottom: 5,
    fontSize: 22,
  },
  productDescription: {
    color: 'black',
  },
  btnProduct: {
    flexDirection: 'row',
  },
  btn: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 10,
    margin: 6,
    padding: 10,
    width: 84,
    height: 40,
  },
  btnText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },

  goBackButton: {
    backgroundColor: 'blue',
    borderRadius: 5,
    padding: 10,
    margin: 10,
  },
  goBackText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  productAlign: {
    margin: 20,
  },
});

export default Cart;
