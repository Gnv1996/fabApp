import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import colors from '../styles/colors';
import Icon from 'react-native-vector-icons/Ionicons';

function Notification({navigation}) {
  const handleViewClick = () => {
    navigation.navigate('Requirement');
  };

  return (
    <ScrollView>
      <View>
        <TouchableOpacity
          onPress={handleViewClick}
          style={{
            flexDirection: 'row',
            padding: 10,
            borderBottomColor: colors.gray,
            borderBottomWidth: 1,
            backgroundColor: colors.white,
          }}>
          <View style={{marginTop: 20}}>
            <Icon name="notifications-circle" size={50} color="#808080" />
          </View>
          <View style={{padding: 20}}>
            <Text style={styles.titleName}>VRC Fashions</Text>
            <Text style={styles.titlePostion}>
              Premium designed icons for use in web, iOS, Android, and desktop
              apps.
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  titleName: {
    fontSize: 17,
    fontWeight: 'bold',
  },
  titlePostion: {
    fontSize: 15,
    color: colors.gray,
    marginTop: 2,
    marginRight: 40,
  },
  tableContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#000',
    padding: 5,
    borderBlockColor: 'gray',
    borderWidth: 1,
    width: 350,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 20,
    borderRadius: 5,
  },
  column: {
    flex: 1,
    paddingHorizontal: 15,
  },
  cellHeader: {
    fontWeight: 'bold',
    textAlign: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    paddingVertical: 5,
  },
  cell: {
    textAlign: 'center',

    paddingVertical: 5,
  },
});
export default Notification;

// import React, { useState, useEffect } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   ScrollView,
// } from 'react-native';
// import colors from '../styles/colors';
// import Icon from 'react-native-vector-icons/Ionicons';
// import axios from 'axios';

// function Notification({ navigation }) {
//   const [notifications, setNotifications] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         // Make API call using axios
//         const response = await axios.get('YOUR_API_ENDPOINT');

//         // Assuming the response.data contains the array of notifications
//         const apiResponse = response.data;

//         // Update state with new notifications
//         setNotifications(apiResponse);
//       } catch (error) {
//         console.error('Error fetching notifications:', error);
//       }
//     };

//     // Fetch data when the component mounts
//     fetchData();
//   }, []);

//   const handleViewClick = (id) => {
//     // Handle click based on notification id, navigate to a specific screen, etc.
//     console.log(`Clicked on notification with id: ${id}`);
//   };

//   return (
//     <ScrollView>
//       {notifications.map((notification) => (
//         <TouchableOpacity
//           key={notification.id}
//           onPress={() => handleViewClick(notification.id)}
//           style={{
//             flexDirection: 'row',
//             padding: 10,
//             borderBottomColor: colors.gray,
//             borderBottomWidth: 1,
//             backgroundColor: colors.white,
//           }}>
//           <View style={{ marginTop: 20 }}>
//             <Icon name="notifications-circle" size={50} color="#808080" />
//           </View>
//           <View style={{ padding: 20 }}>
//             <Text style={styles.titleName}>{notification.title}</Text>
//             <Text style={styles.titlePostion}>{notification.description}</Text>
//           </View>
//         </TouchableOpacity>
//       ))}
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   titleName: {
//     fontSize: 17,
//     fontWeight: 'bold',
//   },
//   titlePostion: {
//     fontSize: 15,
//     color: colors.gray,
//     marginTop: 2,
//     marginRight: 40,
//   },
// });

// export default Notification;
