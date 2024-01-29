// // import React, { useState, useEffect } from 'react';
// // import { View, Text, StyleSheet, ActivityIndicator, Image } from 'react-native';

// // const UserProfile = () => {
// //   const [userData, setUserData] = useState(null);
// //   const [loading, setLoading] = useState(true);

// //   useEffect(() => {
// //     fetchUserData();
// //   }, []);

// //   const fetchUserData = async () => {
// //     try {
// //       const response = await fetch('https://reqres.in/api/users?page=2'); // Replace with your API endpoint
// //       if (response.ok){
// //         const data = await response.json();
// //         setUserData(data);
// //         setLoading(false);
// //         console.log(data)
// //       }
// //       else {
// //         console.error("failed");
// //       }
      
      
// //     } catch (error) {
// //       console.error('Error fetching user data:', error);
// //       setLoading(false);
// //     }
// //   };

// //   if (loading) {
// //     return (
// //       <View style={styles.container}>
// //         <ActivityIndicator size="large" color="#0000ff" />
// //       </View>
// //     );
// //   }

// //   if (!userData) {
// //     return (
// //       <View style={styles.container}>
// //         <Text>No user data available</Text>
// //       </View>
// //     );
// //   }

// //   return (
// //     <View style={styles.container}>
// //       <Image source={{ uri: userData.profileImage }} style={styles.profileImage} />
// //       <Text style={styles.userName}>{userData.name}</Text>
// //       <Text style={styles.userEmail}>{userData.email}</Text>
// //       {/* Render other user profile details here */}
// //     </View>
// //   );
// // };

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     justifyContent: 'center',
// //     alignItems: 'center',
// //   },
// //   profileImage: {
// //     width: 150,
// //     height: 150,
// //     borderRadius: 75,
// //     marginBottom: 20,
// //   },
// //   userName: {
// //     fontSize: 24,
// //     fontWeight: 'bold',
// //     marginBottom: 10,
// //   },
// //   userEmail: {
// //     fontSize: 18,
// //     marginBottom: 20,
// //   },
// // });

// // export default UserProfile;
// import React, { useState, useEffect } from 'react';
// import { View, Text, StyleSheet, Button, ActivityIndicator, Image } from 'react-native';
// // import { View, Text, Button, ImageBackground, StyleSheet } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// const UserProfile = () => {
//   const [userData, setUserData] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchUserData();
//   }, []);

//   const fetchUserData = async () => {
//     try {
//       const response = await fetch('https://reqres.in/api/users/7'); // Endpoint for fetching user with ID 7
//       const data = await response.json();
//       setUserData(data.data);
//       setLoading(false);
//       console.log(data);
//     } catch (error) {
//       console.error('Error fetching user data:', error);
//       setLoading(false);
//     }
//   };

//   if (loading) {
//     return (
//       <View style={styles.container}>
//         <ActivityIndicator size="large" color="#0000ff" />
//       </View>
//     );
//   }

//   if (!userData) {
//     return (
//       <View style={styles.container}>
//         <Text>No user data available</Text>
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       <Image source={{ uri: userData.avatar }} style={styles.profileImage} />
//       <Text style={styles.userName}>{`${userData.first_name} ${userData.last_name}`}</Text>
//       <Text style={styles.userEmail}>  {userData.email}</Text>
//       <Text style={styles.phoneNumber}>Phone no:  {userData.email}</Text>
//       <Text style={styles.userEmail}>Address:
//       <Text style={styles.Country}> Country: India </Text>
//       <Text style={styles.State}> State: Biahr
//        </Text>
//       <Text style={styles.City}> City: </Text>
//       <Text style={styles.Appetment}> Appetment: </Text>
//       </Text>
//       <Text style={styles.userEmail}>Institute:  {userData.email}</Text>
//       <Button title="Files" onPress={() => navigation.navigate('personal_file')}color="black" />
//       {/* <Button title='User Profile' onPress={()=> navigation.navigate('user_profile')}/> */}
//     </View>
    
//   );
// };

// const styles = StyleSheet.create({
//     container: {
//       flex: 1,
//       justifyContent: 'center',
//       alignItems: 'center',
//     },
//     profileImage: {
//       width: 150,
//       height: 150,
//       borderRadius: 75,
//       marginBottom: 20,
//     },
//     userName: {
//       fontSize: 24,
//       fontWeight: 'bold',
//       marginBottom: 10,
//     },
//     userEmail: {
//       fontSize: 18,
//       marginBottom: 20,

//     },
//     phoneNumber: {
//         fontSize: 18,
//         fontWeight: 'bold', // Applying bold font weight to phone number text
//         marginBottom: 10,
//         color: '#841584', // Applying custom color to phone number text
//       },
//   });
  
//   export default UserProfile
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, ActivityIndicator, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import S3FileViewer from '../personal_files/personalfile';
const UserProfile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    const token = await AsyncStorage.getItem("jwtToken")
    console.log("1:->",token)
    try {
      await fetch("https://e02b-203-110-242-40.ngrok-free.app/getUser/profile", {
        method:"GET",
        headers:{
          "Authorization":`Bearer ${token}`
        }
      }).then(response=>{
        console.log(response.ok);
        if(!response.ok){
          throw new Error("Error status: ", `${response.status}`)
        }
        return response.json()
      }).then(data=>{
        console.log(data);
        setUserData(data.user);
        setLoading(false);
      })
    } catch (error) {
      console.error('Error fetching user data:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (!userData) {
    return (
      <View style={styles.container}>
        <Text>No user data available</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image source={{ uri: userData.avatar }} style={styles.profileImage} />
      <Text style={styles.userName}>{userData.name}</Text>
      <Text style={styles.userEmail}>{userData.email}</Text>
      <Text style={styles.addressLabel}>Address:</Text>
      <View style={styles.addressContainer}>
        <Text style={styles.addressText}><Text style={styles.Country}>Country</Text> {userData.address.country}</Text>
        <Text style={styles.addressText}>State: {userData.address.state}</Text>
        <Text style={styles.addressText}>City: {userData.address.city}</Text>
        <Text style={styles.addressText}>Mobile number: {userData.mobileNumber}</Text>
      </View>
      <Button title="Files" onPress={() => navigation.navigate('personalfile')} color="black" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 2,
    // justifyContent: 'center',
    alignItems: 'center',
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    // marginBottom: 20,
    marginTop: 50,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  userEmail: {
    fontSize: 18,
    marginBottom: 10,
  },
  addressLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  addressContainer: {
    marginBottom: 10,
  },
  addressText: {
    fontSize: 16,
    marginBottom: 5,
  },
  Country:{
    fontWeight: "bold",
    // fontSize: 20,
  }
});

export default UserProfile;
