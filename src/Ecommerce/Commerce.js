import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';

function Commerce({navigation}) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get('https://fakestoreapi.com/products')
      .then(res => {
        setData(res.data);
        setLoading(false); // Set loading to false when data is fetched
      })
      .catch(error => {
        console.log(error);
        setLoading(false); // Set loading to false in case of an error
      });
  }, []);

  const movetoCardHandler = selectedProduct => {
    navigation.navigate('Cart', {item: selectedProduct});
  };

  const movetoBuyHandler = selectedProduct => {
    navigation.navigate('Buy', {item: selectedProduct});
  };

  return (
    <ScrollView>
      <SafeAreaView>
        <Text style={styles.heading}>Our Latest Product's</Text>
        {loading ? (
          <ActivityIndicator size="large" color="red" style={{marginTop: 20}} />
        ) : (
          <View style={styles.productContainer}>
            {data.length > 0 &&
              data.map((item, index) => (
                <View style={styles.productItem} key={index}>
                  <Image
                    source={{uri: item.image}}
                    style={styles.productImage}
                  />
                  <View style={styles.productDetails}>
                    <Text style={styles.title}>{item.title}</Text>
                    <Text style={styles.productCategory}>{item.category}</Text>
                    <Text style={styles.pricetag}>₹{item.price}</Text>
                    <Text style={styles.productDescription}>
                      {item.description}
                    </Text>
                    <View style={styles.btnProduct}>
                      <TouchableOpacity
                        style={styles.btn}
                        onPress={() => movetoBuyHandler(item)}>
                        <Text style={styles.btnText}>Buy Now</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.btn}
                        onPress={() => movetoCardHandler(item)}>
                        <Text style={styles.btnText}>Cart</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              ))}
          </View>
        )}
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  heading: {
    fontWeight: 'bold',
    fontSize: 20,
    color: 'black',
    margin: 20,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
  },
  productContainer: {
    margin: 20,
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
    width: 220,
    padding: 10,
  },
  title: {
    fontSize: 22,
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
    width: 84,
    height: 40,
  },
  btnText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Commerce;
