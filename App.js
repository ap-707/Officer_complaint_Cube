import React, { Component } from 'react';
import configData from './env.json';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Login from './screens/Login';
import Officer_profile from './screens/Officer_profile';
import All_Complaints from './screens/All_Complaints';
import Done_complaints from './screens/Done_complaints';
import See_complaintDetails from './screens/See_complaintDetails';
import Inreview_complaints from './screens/Inreview_complaints';

const Stack = createNativeStackNavigator();
const Tab = createMaterialTopTabNavigator();

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      is_login: null
    };
  };

  componentDidMount = async () => {
    let val = JSON.parse(await AsyncStorage.getItem('officer_data'));

    // const of_data = JSON.parse(JSON.parse(val));
    console.log("val in app.js: ", val);

    if (val != null) {
      this.setState({ is_login: true });
    } else {
      this.setState({ is_login: false });
      console.log('officer_data in FALSE app.js : ');
    }

    console.log('is_Login : ', this.state.is_login);
  };

  render() {

    function Tab1(post_Data) {
      return (
        <Stack.Navigator screenOptions={{ headerShown: false }} >
          <Stack.Screen name="Home" component={All_Complaints} />
          <Stack.Screen name="See_complaintDetails" component={See_complaintDetails} initialParams={post_Data} />
        </Stack.Navigator>
      );
    };

    function Tab2(post_Data) {
      return (
        <Stack.Navigator screenOptions={{ headerShown: false }} >
          <Stack.Screen name="Inreview_complaints" component={Inreview_complaints} />
          <Stack.Screen name="See_complaintDetails" component={See_complaintDetails} initialParams={post_Data} />
        </Stack.Navigator>
      );
    };

    function Tab3(post_Data) {
      return (
        <Stack.Navigator screenOptions={{ headerShown: false }} >
          <Stack.Screen name="Done_complaints" component={Done_complaints} />
          <Stack.Screen name="See_complaintDetails" component={See_complaintDetails} initialParams={post_Data} />
        </Stack.Navigator>
      );
    };


    function MyTabs() {
      return (
        <Tab.Navigator>

          <Tab.Screen
            options={{
              title: 'Complaints',
              tabBarLabelStyle: { fontSize: 12, fontWeight: '900' },
              tabBarStyle: { backgroundColor: '#f6c6c6', elevation: 20 },
              tabBarIndicatorStyle: {
                height: 5,
                backgroundColor: "#c42020",
                borderTopLeftRadius: 5,
                borderTopRightRadius: 5,
              }
            }}
            name='Tab1' component={Tab1} />


          <Tab.Screen
            options={{
              title: 'In Review',
              tabBarLabelStyle: { fontSize: 12, fontWeight: '900' },
              tabBarStyle: { backgroundColor: '#f7f194', elevation: 20, },
              tabBarIndicatorStyle: {
                height: 5,
                backgroundColor: "#c7b320",
                borderTopLeftRadius: 5,
                borderTopRightRadius: 5,
              }
            }}
            name='Tab2' component={Tab2} />

          <Tab.Screen options={{
            title: 'Done',
            tabBarLabelStyle: { fontSize: 12, fontWeight: '900' },
            tabBarStyle: { backgroundColor: configData.theme_color, elevation: 20 },
            tabBarIndicatorStyle: {
              height: 5,
              backgroundColor: configData.component_color,
              borderTopLeftRadius: 5,
              borderTopRightRadius: 5,
            },
          }}
            name='Tab3' component={Tab3} />

          <Tab.Screen
            options={{
              title: () => <FontAwesome5 name='user' color={"#000000"} size={25} solid />,
              tabBarStyle: { backgroundColor: configData.component_color },
              tabBarIndicatorStyle: {
                height: 5,
                backgroundColor: "#000000",
                borderTopLeftRadius: 5,
                borderTopRightRadius: 5,
              }
            }}
            name='Tab4' component={Officer_profile} />

        </Tab.Navigator>
      );
    }

    return (
      <NavigationContainer>
        {
          (this.state.is_login)
            ? MyTabs()
            : <Stack.Navigator screenOptions={{ headerShown: false }}>
              <Stack.Screen name="Login" component={Login} />
              <Stack.Screen name="All_Complaints" component={MyTabs} />
            </Stack.Navigator>
        }
      </NavigationContainer>

    );
  }
}
