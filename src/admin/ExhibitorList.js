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

const ExhibitorList = () => {
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(true);

  const tableHead = ['Full Name', 'Email', 'Actions'];

  const fetchDataFromAPI = async () => {
    try {
      const response = await api.get('/user/get_users');
      console.log(response, '---');

      // Filter users with role equal to '1'
      const filteredUsers = response.data.users.filter(
        user => user.role === '1',
      );

      // Set the filtered data to state
      setTableData(filteredUsers);
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
        // Implement the action to view exhibitor details here
        break;
      case 'delete':
        console.log('Delete button clicked for:', rowData);
        // Implement the action to delete exhibitor here
        break;
      default:
        break;
    }
  };

  return (
    <ScrollView>
      <Text style={styles.layoutText}>Exhibitor List</Text>
      <View style={styles.container}>
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
            <Row data={tableHead} style={styles.head} textStyle={styles.text} />
            {tableData.map((rowData, index) => (
              <Row
                key={index}
                data={[
                  rowData.fullname,
                  rowData.email,
                  <View
                    style={styles.actionButtonsContainer}
                    key={'action_buttons_' + index}>
                    <TouchableOpacity
                      onPress={() => handleActionButtonClick('view', rowData)}
                      style={styles.actionButton}>
                      <Text style={styles.actionButtonText}>View</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => handleActionButtonClick('delete', rowData)}
                      style={styles.DeleteActionButton}>
                      <Text style={styles.actionButtonText}>Delete</Text>
                    </TouchableOpacity>
                  </View>,
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
  head: {
    height: 40,
    backgroundColor: '#f1f8ff',
  },
  text: {margin: 6},
  row: {
    flexDirection: 'row',
    backgroundColor: '#FFF1C1',
  },
  actionButtonsContainer: {
    flexDirection: 'row',
  },
  DeleteActionButton: {
    padding: 5,
    margin: 3,
    backgroundColor: 'red',
    borderRadius: 5,
  },
  actionButton: {
    padding: 5,
    margin: 3,
    backgroundColor: 'green',
    borderRadius: 5,
  },
  actionButtonText: {color: 'white', textAlign: 'center'},
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
    backgroundColor: colors.white,
  },
});

export default ExhibitorList;
