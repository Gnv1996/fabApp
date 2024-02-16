import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {Table, Row} from 'react-native-table-component';
import colors from '../styles/colors';
import {useNavigation} from '@react-navigation/native';
import api from '../utils/api';
import {AuthContext} from '../contexts/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

function Requirement() {
  const [tableData, setTableData] = useState([]);
  const [apiData, setApiData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const {UsersID} = useContext(AuthContext);

  useEffect(() => {
    fetchDataFromApi();
  }, []);

  const fetchDataFromApi = async () => {
    try {
      const response = await api.get(`/requirement/get/${UsersID}`);
      console.log(response, '------------------');
      setApiData(response.data.userRequirement);
    } catch (error) {
      console.error('Error fetching data from API:', error);
    } finally {
      setLoading(false);
    }
  };

  const buttonAcceptHandler = async () => {
    const accessToken = await AsyncStorage.getItem('userToken');
    try {
      const response = await api.put(`/requirement/accept/${UsersID}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log(response, '---data ---show');
      if (response.data.success == true) {
        Alert.alert('You Accepted Fabrication Successfully');
      }

      fetchDataFromApi();
    } catch (error) {
      console.error('Error accepting requirement:', error);
      Alert.alert('Error accepting requirement. Please try again.');
    }
  };

  const buttonRejectHandler = async () => {
    try {
      await api.put(`/requirement/reject/${UsersID}`);

      // Show success alert
      Alert.alert('You Rejected! Successfully');

      // Refetch data from API
      fetchDataFromApi();

      // Navigate to Notifications screen
      navigation.navigate('Notifications');
    } catch (error) {
      console.error('Error rejecting requirement:', error);
      // Show error alert if API call fails
      Alert.alert('Error rejecting requirement. Please try again.');
    }
  };

  const keyMapping = {
    updatedAt: 'Last Updated',
    stallSize: 'Size of Stall',
    stallNumber: 'Stall no.',
    Color_Theme: 'Color Theme',
    selectedColor: 'Selected Color',
    products: 'Products to display',
    branding: 'Branding',
    WoodenFlooring: 'Wooden Floorings',
    carpetColor: 'Carpet color',
    furniture: 'Furniture',
    lighting: 'Lighting',
    budget: 'Budget',
    comment: 'Comment',
  };

  // Render loading indicator if data is being fetched
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.blue} />
      </View>
    );
  }

  return (
    <ScrollView>
      <Text style={styles.layoutText}>Exhibitor Requirement</Text>
      <View style={styles.container}>
        <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
          {apiData &&
            Object.entries(apiData)
              .filter(([key]) => key in keyMapping) // Filter keys based on the keyMapping
              .map(([key, value], index) => (
                <Row
                  key={index}
                  data={[
                    <Text style={styles.texts}>{keyMapping[key]}</Text>, // Use modified key
                    <Text style={styles.text}>{value}</Text>,
                  ]}
                  style={[
                    styles.row,
                    index % 2 && {backgroundColor: '#f2f2f2'},
                  ]}
                />
              ))}
        </Table>

        <View style={styles.budget}>
          <TouchableOpacity
            style={styles.btnAccept}
            onPress={buttonAcceptHandler}>
            <Text style={styles.btn_Text}>Accept</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.btnReject}
            onPress={buttonRejectHandler}>
            <Text style={styles.btn_Text}>Reject</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 30,
  },
  row: {
    height: 40,
    flexDirection: 'row',
    backgroundColor: '#fff',
  },
  text: {
    flex: 1,
    textAlign: 'center',
    fontWeight: '600',
    marginTop: 10,
    color: colors.gray,
  },
  texts: {
    flex: 1,
    textAlign: 'center',
    fontWeight: '600',
    marginTop: 10,
    color: colors.black,
  },
  btnAccept: {
    backgroundColor: colors.green,
    flex: 1,
    padding: 10,
    borderRadius: 5,
    margin: 5,
  },
  btnReject: {
    backgroundColor: colors.red,
    flex: 1,
    padding: 10,
    borderRadius: 5,
    margin: 5,
  },
  btn_Text: {
    textAlign: 'center',
    color: colors.white,
    fontWeight: '500',
    fontSize: 20,
  },
  budget: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
    justifyContent: 'center',
  },
  layoutText: {
    borderWidth: 2,
    borderColor: colors.gray,
    padding: 15,
    borderRadius: 10,
    margin: 20,
    color: colors.black,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 27,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Requirement;
