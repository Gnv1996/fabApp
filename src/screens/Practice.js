import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';

function Practice() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get('https://fakestoreapi.com/products')
      .then(res => {
        setData(res.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <ScrollView>
      <SafeAreaView>
        <Text style={styles.heading}>Our Latest Product's</Text>
        <View style={styles.productContainer}>
          {data.length > 0 &&
            data.map((item, index) => (
              <View key={index} style={styles.product}>
                <Image
                  source={{uri: item.image}}
                  style={{
                    width: 120,
                    height: 200,
                    marginTop: 40,
                  }}
                />
                <View style={styles.productAlign}>
                  <Text
                    style={{
                      color: 'black',
                      fontWeight: 'bold',
                      padding: 10,
                      fontSize: 18,
                      width: 250,
                      marginRight: 10,
                    }}>
                    {item.title}
                  </Text>
                  <Text
                    style={{padding: 10, color: 'brown', fontWeight: 'bold'}}>
                    {item.category}
                  </Text>
                  <Text
                    style={{
                      color: 'red',
                      fontWeight: 'bold',
                      padding: 7,
                      fontSize: 25,
                    }}>
                    ₹{item.price}
                  </Text>
                  <Text
                    style={{
                      color: 'gray',
                      margin: 10,
                      width: 220,
                    }}>
                    {item.description}
                  </Text>
                  <View style={styles.button}>
                    <TouchableOpacity style={styles.btn}>
                      <Text style={styles.btnText}>Buy</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btn}>
                      <Text style={styles.btnText}>Cart</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ))}
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  heading: {
    fontWeight: 'bold',
    fontSize: 20,
    color: 'black',
    margin: 15,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 15,
  },
  product: {
    flexDirection: 'row',
    margin: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    overflow: 'hidden',
  },
  productAlign: {
    flexDirection: 'column',
  },
  button: {
    flex: 1,
    flexDirection: 'row',
  },
  btn: {
    backgroundColor: 'red',
    borderRadius: 5,
    padding: 10,
    margin: 5,
    width: 100,
  },
  btnText: {
    color: 'white',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
  },
});

export default Practice;
