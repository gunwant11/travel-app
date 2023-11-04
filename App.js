import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import MapViewComponent from './components/MapViewComponent';
import { GluestackUIProvider, Text, Box, Button, ButtonText } from "@gluestack-ui/themed"
import { config } from "@gluestack-ui/config" // Optional if you want to use default theme

export default function App() {
  return (
    <GluestackUIProvider config={config}>
      <Box width="100%" justifyContent="center" alignItems="center">
        <Text>Open up App.js to start working on your app!</Text>
        <MapViewComponent />
        <Button>
        <ButtonText>Hello world</ButtonText>
      </Button>
      </Box>
    </GluestackUIProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
