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

function Buy({route, navigation}) {
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

  const goContinue = () => {
    Alert.alert('waiting');
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
          <Text style={styles.heading}>Buy</Text>
          <View style={styles.productContainer}>
            <View style={styles.productItem}>
              <Image source={{uri: data.image}} style={styles.productImage} />
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
                  ₹{(data.price * quantity).toFixed(2)}{' '}
                  <Text style={styles.offer}>47% off</Text>
                </Text>

                <View style={styles.quantityContainer}>
                  <Text style={styles.quantityLabel}>Quantity:</Text>
                  <TouchableOpacity onPress={decreaseQuantity}>
                    <Text style={styles.quantityButton}>-</Text>
                  </TouchableOpacity>
                  <Text style={styles.quantityText}>{quantity}</Text>
                  <TouchableOpacity onPress={increaseQuantity}>
                    <Text style={styles.quantityButton}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <TouchableOpacity style={styles.goButton} onPress={goContinue}>
              <Text style={styles.goBackText}>Continue...</Text>
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
    marginTop: 30,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
  },
  productContainer: {
    marginTop: 30,
    marginLeft: 5,
    marginRight: 5,
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
    height: 220,
  },
  productDetails: {
    width: 245,
    padding: 10,
  },
  title: {
    fontSize: 27,
    fontWeight: 'bold',
    color: 'black',
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
  },
  quantityText: {
    paddingHorizontal: 15,
    fontSize: 18,
  },
  goButton: {
    backgroundColor: '#FFA500',
    borderRadius: 5,
    padding: 10,
    margin: 10,
    height: 50,
    width: 100,
  },

  goBackText: {
    color: 'white',
    marginTop: 7,
    fontWeight: 'bold',
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
});

export default Buy;
