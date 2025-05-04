import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from './src/Screens/home-screen';
import CountScreen from './src/Screens/count-screen';
import { FormatModal } from './src/Components/format-modal';
import TrafficMapModal from './src/Components/traffic-map-modal';

const Stack = createNativeStackNavigator();
export default function App() {
  return (
   <NavigationContainer>
    <StatusBar/>
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={CountScreen} />
      <Stack.Screen name="Count" component={CountScreen} />
      <Stack.Screen name='format-modal' options={{presentation: 'modal'}} component={FormatModal} />
    </Stack.Navigator>
   </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
