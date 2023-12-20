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
  Alert,
} from 'react-native';
import axios from 'axios';

function Buy({route, navigation}) {
  const {item} = route.params;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

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
  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const movetoBuyHandler = item => {
    const totalPrice = (data.price * quantity).toFixed(2);
    navigation.navigate('Payment', {totalPrice});
  };

  return (
    <ScrollView>
      {loading ? (
        <ActivityIndicator size="large" color="blue" style={{marginTop: 60}} />
      ) : (
        <>
          <Text style={styles.heading}>Buy</Text>
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
                  width: 280,
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
              <Text style={styles.pricetag}>
                ₹{(data.price * quantity).toFixed(1)}{' '}
                <Text style={styles.offer}>47% off</Text>
              </Text>

              <View style={styles.quantityContainer}>
                <Text style={styles.quantityLabel}>Qty:-</Text>
                <TouchableOpacity onPress={decreaseQuantity}>
                  <Text style={styles.quantityButton}>-</Text>
                </TouchableOpacity>
                <Text style={styles.quantityText}>{quantity}</Text>
                <TouchableOpacity onPress={increaseQuantity}>
                  <Text style={styles.quantityButton}>+</Text>
                </TouchableOpacity>
              </View>
              <Text
                style={{
                  color: '#48494B',
                  fontWeight: 'bold',
                  fontSize: 18,
                  marginBottom: 7,
                }}>
                Description :-
              </Text>
              <Text style={styles.productDescription}>{data.description}</Text>
            </View>

            <View style={{alignItems: 'center'}}>
              <TouchableOpacity
                style={styles.goBackButton}
                onPress={() => movetoBuyHandler(item)}>
                <Text style={styles.goBackText}>Buy Now</Text>
              </TouchableOpacity>
            </View>
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
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 7,
  },
  quantityLabel: {
    marginRight: 10,
    fontWeight: 'bold',
    color: 'black',
  },
  quantityButton: {
    fontSize: 20,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderRadius: 5,
    color: 'black',
  },
  quantityText: {
    paddingHorizontal: 15,
    fontSize: 18,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  quantityLabel: {
    fontWeight: 'bold',
    color: 'black',
    fontSize: 18,
    paddingRight: 7,
    paddingTop: 5,
    paddingBottom: 5,
  },
  quantityButton: {
    fontSize: 20,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderRadius: 5,
  },
  quantityText: {
    paddingHorizontal: 15,
    fontSize: 18,
    color: 'black',
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
    width: '100%',
  },
  goBackText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  productAlign: {
    margin: 20,
  },
  offer: {
    color: 'green',
    fontWeight: 'bold',
    fontSize: 22,
  },
});

export default Buy;
