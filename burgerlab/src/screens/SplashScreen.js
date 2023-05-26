import * as React from 'react';
import { View, Image, StyleSheet, ActivityIndicator } from 'react-native';
import COLORS from '../utils/Colors';
function SplashScreen({ navigation }) {
  React.useEffect(() => {
    setTimeout(() => navigation.replace('Home'), 2000);
  });
  return (
    <View style={styles.main}>
      <Image
        source={{
          uri: 'https://burgerlab.com.pk/wp-content/uploads/2022/02/Burger-lab-Logo.png?c062ef&c062ef',
        }}
        style={{
          width : 200,
          height :200
        }}
      />
      <ActivityIndicator color={COLORS.text} />
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.bgGreen,
  },
});
export default SplashScreen;
