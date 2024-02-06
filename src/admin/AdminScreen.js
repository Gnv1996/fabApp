import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {Table, Row} from 'react-native-table-component';
import axios from 'axios';
import colors from '../styles/colors';

const AdminScreen = () => {
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isExhibitorList, setIsExhibitorList] = useState(true); // Default to Exhibitor List

  const tableHead = ['Company Name', 'Full Name', 'Mobile', 'Actions'];

  const getApiEndpoint = () => {
    return isExhibitorList
      ? 'https://your-api-endpoint.com/exhibitorData'
      : 'https://your-api-endpoint.com/fabricatorData';
  };

  useEffect(() => {
    // Replace the following URL with your actual API endpoint
    axios
      .get(getApiEndpoint())
      .then(response => {
        if (Array.isArray(response.data)) {
          setTableData(response.data);
          setLoading(false);
        } else {
          console.error('Invalid data format. Expected an array.');
          setLoading(false);
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, [isExhibitorList]);

  const handleActionButtonClick = (action, rowData) => {
    // Handle action button click for the corresponding row data
    switch (action) {
      case 'view':
        console.log('View button clicked for:', rowData);
        break;
      case 'delete':
        console.log('Delete button clicked for:', rowData);
        break;
      default:
        break;
    }
  };

  const handleToggle = () => {
    setIsExhibitorList(prev => !prev);
    setLoading(true); // Reset loading state when toggling
  };

  return (
    <ScrollView>
      <Text style={styles.layoutText}>
        {isExhibitorList ? 'Exhibitor List' : 'Fabricator List'}
      </Text>
      <View style={styles.container}>
        <TouchableOpacity onPress={handleToggle} style={styles.toggleButton}>
          <Text style={styles.toggleButtonText}>
            Switch to {isExhibitorList ? 'Fabricator' : 'Exhibitor'} List
          </Text>
        </TouchableOpacity>
        {loading ? (
          <Text>Loading...</Text>
        ) : (
          <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
            <Row data={tableHead} style={styles.head} textStyle={styles.text} />
            {tableData.map((rowData, index) => (
              <Row
                key={index}
                data={[
                  ...rowData,
                  <TouchableOpacity
                    onPress={() => handleActionButtonClick('view', rowData)}>
                    <Text style={styles.actionButton}>View</Text>
                  </TouchableOpacity>,
                  <TouchableOpacity
                    onPress={() => handleActionButtonClick('delete', rowData)}>
                    <Text style={styles.actionButton}>Delete</Text>
                  </TouchableOpacity>,
                ]}
                style={styles.row}
                textStyle={styles.text}
              />
            ))}
          </Table>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, padding: 20, paddingTop: 30, backgroundColor: '#fff'},
  head: {height: 40, backgroundColor: '#f1f8ff'},
  text: {margin: 6},
  row: {flexDirection: 'row', backgroundColor: '#FFF1C1'},
  actionButton: {color: 'blue', textAlign: 'center', marginRight: 10},
  toggleButton: {backgroundColor: '#007BFF', padding: 10, borderRadius: 5},
  toggleButtonText: {color: 'white', textAlign: 'center'},
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

export default AdminScreen;
