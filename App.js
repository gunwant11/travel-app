import { extendTheme, NativeBaseProvider,  } from "native-base";
import { StyleSheet, View } from 'react-native';
import Navigation from './screens/navigation/Navigation';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Amplify } from 'aws-amplify';
import awsExports from './src/aws-exports';
import { useEffect } from "react";
import { createPost } from "./services/postService";
Amplify.configure(awsExports);

export default function App() {
  const Stack = createNativeStackNavigator();


  useEffect(() => {
    createPost('title', 'description', 'image', 'latitude', 'longitude', 'address', 'content', 'descHTML')
  },[]
  )

  return (
    <View style={styles.container}><NativeBaseProvider >
      <Navigation/>
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

