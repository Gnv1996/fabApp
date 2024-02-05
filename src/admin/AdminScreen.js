import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Table, Row} from 'react-native-table-component';
import axios from 'axios';
import colors from '../styles/colors';

const AdminScreen = () => {
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isExhibitorList, setIsExhibitorList] = useState(true); // Default to Exhibitor List

  const tableHead = ['Company Name', 'Full Name', 'Mobile'];

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

  const handleViewButtonClick = rowData => {
    // Handle the "View" button click for the corresponding row data
    console.log('View button clicked for:', rowData);
  };

  const handleToggle = () => {
    setIsExhibitorList(prev => !prev);
    setLoading(true); // Reset loading state when toggling
  };

  return (
    <View style={styles.container}>
      <Text style={styles.layoutText}>
        {isExhibitorList ? 'Exhibitor List' : 'Fabricator List'}
      </Text>
      <TouchableOpacity onPress={handleToggle} style={styles.toggleButton}>
        <Text style={styles.toggleButtonText}>
          Switch to {isExhibitorList ? 'Fabricator' : 'Exhibitor'} List
        </Text>
      </TouchableOpacity>
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
          <Row
            data={[...tableHead, 'Actions']}
            style={styles.head}
            textStyle={styles.text}
          />
          {tableData.map((rowData, index) => (
            <Row
              key={index}
              data={[
                ...rowData,
                <TouchableOpacity
                  onPress={() => handleViewButtonClick(rowData)}>
                  <Text style={styles.viewButton}>View</Text>
                </TouchableOpacity>,
              ]}
              style={styles.row}
              textStyle={styles.text}
            />
          ))}
        </Table>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, padding: 20, paddingTop: 30, backgroundColor: '#fff'},
  head: {height: 40, backgroundColor: '#f1f8ff'},
  text: {margin: 6},
  row: {flexDirection: 'row', backgroundColor: '#FFF1C1'},
  viewButton: {color: 'blue', textAlign: 'center'},
  toggleText: {fontSize: 18, marginBottom: 10},
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
