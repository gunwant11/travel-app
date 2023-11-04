import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Auth } from "aws-amplify";
import ConfirmationEmail from "../../components/AuthComponents/ConfirmationEmail";
import Login from "../../components/AuthComponents/Login";
import Signup from "../../components/AuthComponents/Signup";
import ForgotPassword from "../../components/AuthComponents/ForgotPassword";
import ResetPassword from "../../components/AuthComponents/ResetPassword";
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
  return (
    <NavigationContainer>

        <Stack.Navigator
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
          <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
          <Stack.Screen name="ResetPassword" component={ResetPassword} />
        </Stack.Navigator>
    </NavigationContainer>
  );
};


export default Navigation;

