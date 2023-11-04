import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Auth } from "aws-amplify";
import ConfirmationEmail from "../../components/AuthComponents/ConfirmationEmail.js";
import Login from "../../components/AuthComponents/Login.js";
import Signup from "../../components/AuthComponents/Signup";
import ForgotPassword from "../../components/AuthComponents/ForgotPassword";
import ResetPassword from "../../components/AuthComponents/ResetPassword";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AddNote from "../AddNote";
import MapViewComponent from "../Maps";
import Profile from "../Profile";
import { View } from "@gluestack-ui/themed";
import Icon from "react-native-vector-icons/Octicons";
// import { Profile } from "../Profile";


const Navigation = () => {
  const [currentuser, setCurrentuser] = React.useState(true);
//   const { setUser } = useAppContext();
//   const checkuser = async () => {
//     try {
//       const user = await Auth.currentAuthenticatedUser({ bypassCache: true });
//       setCurrentuser(user);
//       setUser(user);
//     } catch (err) {
//       console.log(err);
//       setCurrentuser(null);
//       setUser(null);
//     }
//   };

//   React.useEffect(() => {
//     checkuser();
//   }, []);

  const viewStyle = (focused) => {
    return {
      backgroundColor: focused ? "#edb0b9" : "#b2aed1b2",
      borderRadius: 100,
      width: 45,
      height: 45,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    };
  };


  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();
  return (
    <NavigationContainer>

{currentuser ? ( <Tab.Navigator
          screenOptions={{
            headerShown: false,
            tabBarShowLabel: false,

            tabBarStyle: {
              position: "absolute",
              borderTopWidth: 0,
              bottom: 25,
              left: 20,
              right: 20,
              elevation: 0,   alignItems: 'center',
              flex: 1,
              gap: 20,
              backgroundColor: "transparent",
              height: 60,
            },
          }}
        >
          <Tab.Screen
            options={{
              tabBarIcon: ({ focused }) => (
                <View
                  style={{
                   ...viewStyle(focused),
                  }}
                >
                  <Icon
                    name="image"
                    size={20}
                    color={"#fff" }
                  />
                </View>
              ),
            }}
            name="Map"
            component={MapViewComponent}
          />

         
<Tab.Screen
            name="AddNote"
            disabled= {true}
            navigationOptions={{
              headerVisible: false,
              bottomNavigationOptions: {
                visible: false,
              },
            }}
            options={{
              headerShown: false,
              tabBarVisible: false,
              disabled: true,
              tabBarStyle: { display: "none" },
              tabBarIcon: ({ focused }) => (
                <View
                  style={{
                    backgroundColor: focused ? "#cc4f4f" : "#5a5190",
                    borderRadius: 55,
                    padding: 10,
                    borderWidth: 7,
                    borderColor: "#b2aed1b2",
                    
                  }}
                >
                  <Icon
                    name="plus"
                    size={22}
                      paddingRight={3}
                      paddingLeft={3}
                    color={"#fff" }
                    
                    
                  />
                </View>
              ),
            }}
            component={AddNote}
          />
           <Tab.Screen
            options={{
              tabBarIcon: ({ focused }) => (
                <View
                  style={{
                   ...viewStyle(focused),
                  }}
                >
                  <Icon
                    name="person"
                    size={20}
                    color={"#fff" }
                  />
                </View>
              ),
            }}
            name="Profile"
            component={Profile}
          />
        </Tab.Navigator>
      ) : 
        (<Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Signup" component={Signup} />
          <Stack.Screen
            name="ConfirmationEmail"
            component={ConfirmationEmail}
          />
        </Stack.Navigator>)}
    </NavigationContainer>
  );
};


export default Navigation;

