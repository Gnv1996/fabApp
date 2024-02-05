import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import {Table, Row} from 'react-native-table-component';
import axios from 'axios'; // Import Axios
import colors from '../styles/colors';

function Requirement() {
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    // Initialize tableData with keys only
    const initialKeys = [
      'Size of Stall',
      'Stall no.',
      'Color Theme',
      'Products to display',
      'Branding',
      'Wooden Floorings',
      'Carpet color',
      'Furniture',
      'Lighting',
      'Budget',
      'Comment',
      // ... add other keys similarly
    ];

    setTableData(initialKeys);

    // Fetch data from the API
    fetchDataFromApi();
  }, []);

  const fetchDataFromApi = async () => {
    try {
      // Replace 'your-api-endpoint' with the actual API endpoint
      const response = await axios.get('https://api.example.com/data'); // Example API endpoint
      const apiData = response.data;

      const valuesForKeys = {
        'Size of Stall': apiData.sizeOfStall,
        'Stall no.': apiData.stallNo,
        'Color Theme': apiData.colorTheme,
        'Products to display': apiData.productsToDisplay,
        Branding: apiData.branding,
        'Wooden Floorings': apiData.woodenFlooring,
        'Carpet color': apiData.carpetColor,
        Furniture: apiData.furniture,
        Lighting: apiData.lighting,
        Budget: apiData.budget,
        Comment: apiData.comment,
        // ... add other keys similarly
      };

      // Create an array of arrays with keys and values
      const transformedData = tableData.map(key => [key, valuesForKeys[key]]);

      // Update the state with the transformed data
      setTableData(transformedData);
    } catch (error) {
      console.error('Error fetching data from API:', error);
    }
  };

  const buttonAcceptHandler = () => {
    Alert.alert('You Accepted Fabrication Successfully');
  };

  const buttonRejectHandler = () => {
    Alert.alert('You Rejected! Successfully');
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.layoutText}>Exhibitor Requirement</Text>
        <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
          {tableData.map((rowData, index) => (
            <Row
              key={index}
              data={[
                // Display key on the left and value on the right
                <Text style={styles.texts}>{rowData}</Text>,
                <Text style={styles.text}>{rowData[0]}</Text>,
              ]}
              style={[styles.row, index % 2 && {backgroundColor: '#f2f2f2'}]}
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
});

export default Requirement;
