import { extendTheme, NativeBaseProvider,  } from "native-base";
import { StyleSheet, View } from 'react-native';
import Navigation from './screens/navigation/Navigation';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./components/AuthComponents/Login.js";
import Signup from "./components/AuthComponents/Signup.js";
import ForgotPassword from "./components/AuthComponents/ForgotPassword.js";
import ResetPassword from "./components/AuthComponents/ResetPassword.js";
import ConfirmationEmail from "./components/AuthComponents/ConfirmationEmail.js";
import { NavigationContainer } from "@react-navigation/native";

export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <View style={styles.container}><NativeBaseProvider >
       <NavigationContainer>
      <Stack.Navigator
          // screenOptions={{
          //   headerShown: false,
          // }}
        >
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Signup" component={Signup} />
          <Stack.Screen
            name="ConfirmationEmail"
            component={ConfirmationEmail}
          />
          {/* <Stack.Screen name="ForgotPassword" component={ForgotPassword} /> */}
          <Stack.Screen name="ResetPassword" component={ResetPassword} />
        </Stack.Navigator>
        <Login/>
        <ConfirmationEmail/>
<Signup/>
      </NavigationContainer>
      </NativeBaseProvider>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
});
