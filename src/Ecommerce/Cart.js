import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';

function Cart({route, navigation}) {
  const {item} = route.params;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`https://fakestoreapi.com/products/${item.id}`)
      .then(res => {
        setData(res.data);
        setLoading(false);
      })
      .catch(error => {
        console.log(error);
        setLoading(false);
      });
  }, [item.id]);

  const movetoBuyHandler = selectedProduct => {
    navigation.navigate('Buy', {item: selectedProduct});
  };
  return (
    <ScrollView>
      {loading ? (
        <ActivityIndicator size="large" color="blue" style={{marginTop: 60}} />
      ) : (
        <>
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
              <Text
                style={{
                  color: 'gray',
                  fontWeight: 'bold',
                  fontSize: 18,
                  marginBottom: 5,
                }}>
                Description
              </Text>
              <Text style={styles.productDescription}>{data.description}</Text>
            </View>
          </View>
          <View style={{alignItems: 'center'}}>
            <TouchableOpacity
              style={styles.goBackButton}
              onPress={() => movetoBuyHandler(item)}>
              <Text style={styles.goBackText}>Buy Now</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  heading: {
    fontWeight: 'bold',
    fontSize: 25,
    color: 'black',
    marginTop: 20,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
  },
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
    backgroundColor: 'red',
    borderRadius: 5,
    padding: 12,
    margin: 10,
    width: 340,
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
