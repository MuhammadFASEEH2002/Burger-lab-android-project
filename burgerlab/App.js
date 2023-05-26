import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen';
import SplashScreen from './src/screens/SplashScreen';
import CartScreen from './src/screens/CartScreen';
import SignInScreen from './src/screens/SIgnInScreen';
import AddProductScreen from './src/screens/Admin/AddProductScreen';
import ProductsList from './src/screens/Admin/ProductsList';
import CheckOutScreen from './src/screens/CheckOutScreen';
import { View } from 'react-native';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <View style={{ flex: 1, marginTop: 26 }}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="Splash" component={SplashScreen} />
          <Stack.Screen name="AddProduct" component={AddProductScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Cart" component={CartScreen} />
          <Stack.Screen name="SignIn" component={SignInScreen} />
          <Stack.Screen name="Products" component={ProductsList} />
          <Stack.Screen name="CheckOut" component={CheckOutScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}

export default App;
