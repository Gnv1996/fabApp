import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {Table, Row} from 'react-native-table-component';
import colors from '../styles/colors';
import api from '../utils/api';

const AdminScreen = () => {
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isExhibitorList, setIsExhibitorList] = useState(true); // Default to Exhibitor List

  const tableHead = ['Full Name', 'Email', 'Actions'];

  const fetchDataFromAPI = async () => {
    try {
      const response = await api.get('/user/get_users');
      if (Array.isArray(response.data)) {
        setTableData(response.data);
      } else if (
        response.data &&
        response.data.users &&
        Array.isArray(response.data.users)
      ) {
        setTableData(response.data.users);
      } else {
        console.error('Invalid data structure returned from API');
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data from API:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDataFromAPI();
  }, []);

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
    setLoading(true);
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
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
            <Row data={tableHead} style={styles.head} textStyle={styles.text} />
            {tableData.map((rowData, index) => {
              // Check if rowData is not null or undefined
              if (
                rowData &&
                ((isExhibitorList && rowData.role === '1') ||
                  (!isExhibitorList && rowData.role === '2'))
              ) {
                return (
                  <Row
                    key={index}
                    data={[
                      rowData.fullname,
                      rowData.email,
                      <TouchableOpacity
                        key={'delete_' + index}
                        onPress={() =>
                          handleActionButtonClick('delete', rowData)
                        }>
                        <Text style={styles.actionButton}>Delete</Text>
                      </TouchableOpacity>,
                    ]}
                    style={styles.row}
                    textStyle={styles.text}
                  />
                );
              } else {
                return <Text>Loading</Text>; // If the rowData is null or the role doesn't match, render nothing
              }
            })}
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
