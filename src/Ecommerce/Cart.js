import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';

function Cart({route, navigation}) {
  const {item} = route.params;
  const [data, setData] = useState([]);
  const [quantity, setQuantity] = useState(1);
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
  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const removeFromCart = item => {
    navigation.navigate('Commerce');
    Alert.alert('Remove Successfully!');
  };

  const movetoBuyHandler = selectedProduct => {
    navigation.navigate('Buy', {item: selectedProduct});
  };

  return (
    <ScrollView>
      {loading ? (
        <ActivityIndicator
          size="large"
          color="orange"
          style={{marginTop: 60}}
        />
      ) : (
        <>
          <View style={styles.productContainer}>
            <View style={styles.productItem}>
              <View style={styles.imageQuantity}>
                <Image source={{uri: data.image}} style={styles.productImage} />
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
              </View>

              <View style={styles.productDetails}>
                <Text style={styles.title}>{data.title}</Text>
                <Text
                  style={{
                    paddingTop: 7,
                    paddingBottom: 7,
                    color: 'brown',
                    fontWeight: 'bold',
                  }}>
                  {data.category}
                </Text>
                <Text style={styles.priceTag}>
                  ₹{(data.price * quantity).toFixed(1)}{' '}
                  <Text style={styles.offer}>47% off</Text>
                </Text>
                <View style={{flexDirection: 'row'}}>
                  <TouchableOpacity
                    style={styles.goBackButton}
                    onPress={() => movetoBuyHandler(item)}>
                    <Text style={styles.goBackText}>Buy Now</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.goBackButton}
                    onPress={() => removeFromCart(item)}>
                    <Text style={styles.goBackText}>Remove</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  productContainer: {
    margin: 15,
    padding: 10,
  },
  productItem: {
    flexDirection: 'row',
    marginBottom: 20,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
  },
  productImage: {
    width: 120,
    height: 107,
    resizeMode: 'cover',
  },
  productDetails: {
    width: 210,
    padding: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 10,
  },
  quantityLabel: {
    fontWeight: 'bold',
    color: 'black',
    fontSize: 18,
  },
  quantityButton: {
    fontSize: 15,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderRadius: 5,
  },
  quantityText: {
    paddingHorizontal: 10,
    fontSize: 18,
    color: 'black',
  },
  goButton: {
    backgroundColor: '#FFA500',
    borderRadius: 5,
    padding: 15,
    margin: 10,
    height: 50,
    width: 100,
  },

  goBackText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  goBackButton: {
    backgroundColor: 'red',
    padding: 10,
    width: '45%',
    margin: 5,
    borderRadius: 10,
  },

  priceTag: {
    color: 'red',
    fontWeight: 'bold',
    paddingTop: 7,
    paddingBottom: 7,
    fontSize: 25,
  },
  offer: {
    color: 'green',
    fontWeight: 'bold',
    fontSize: 22,
  },
  imageQuantity: {
    flexDirection: 'column',
  },
});

export default Cart;
