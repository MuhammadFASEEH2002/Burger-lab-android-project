import * as React from 'react';
import {
  View,
  useWindowDimensions,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { Entypo } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import MyCrousel from '../component/home/Crousal';
import FoodItem from '../component/home/FoodItem';
import COLORS from '../utils/Colors';
import firebase from '../utils/firebase';
import Cache from '../utils/Cache';
const FirstRoute = () => {
  const [items, setItems] = React.useState([]);
  React.useEffect(() => {
    firebase.on('food/burger', (snapshot) => {
      setItems((food) => [...food, snapshot.val()]);
    });
  }, []);
  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <FlatList
        data={items}
        keyExtractor={(item) => item.productId}
        renderItem={({ item }) => (
          <FoodItem
            item={item}
            onPress={() => {
              let userCart =
                Cache.getSessionValue('usercart', Cache.JSON) || [];
              const exists = userCart.find(
                (i) => i.productId === item.productId
              );
              if (!exists) {
                item.qty = 1;
                userCart.push(item);
                Cache.setSessionValue('usercart', userCart, Cache.JSON);
                ToastAndroid.show('Added To Cart', ToastAndroid.LONG);
              } else {
                ToastAndroid.show('Already Added To Cart', ToastAndroid.LONG);
              }
            }}
          />
        )}
      />
    </View>
  );
};

const SecondRoute = () => {
  const [items, setItems] = React.useState([]);
  React.useEffect(() => {
    firebase.on('food/pizza', (snapshot) => {
      setItems((food) => [...food, snapshot.val()]);
    });
  }, []);
  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <FlatList
        data={items}
        keyExtractor={(item) => item.productId}
        renderItem={({ item }) => (
          <FoodItem
            item={item}
            onPress={() => {
              let userCart =
                Cache.getSessionValue('usercart', Cache.JSON) || [];
              const exists = userCart.find(
                (i) => i.productId === item.productId
              );
              if (!exists) {
                item.qty = 1;
                userCart.push(item);
                Cache.setSessionValue('usercart', userCart, Cache.JSON);
                ToastAndroid.show('Added To Cart', ToastAndroid.LONG);
              } else {
                ToastAndroid.show('Already Added To Cart', ToastAndroid.LONG);
              }
            }}
          />
        )}
      />
    </View>
  );
};
const ThirdRoute = () => {
  const [items, setItems] = React.useState([]);
  React.useEffect(() => {
    firebase.on('food/drinks', (snapshot) => {
      setItems((food) => [...food, snapshot.val()]);
    });
  }, []);
  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <FlatList
        data={items}
        keyExtractor={(item) => item.productId}
        renderItem={({ item }) => (
          <FoodItem
            item={item}
            onPress={() => {
              let userCart =
                Cache.getSessionValue('usercart', Cache.JSON) || [];
              const exists = userCart.find(
                (i) => i.productId === item.productId
              );
              if (!exists) {
                item.qty = 1;
                userCart.push(item);
                Cache.setSessionValue('usercart', userCart, Cache.JSON);
                ToastAndroid.show('Added To Cart', ToastAndroid.LONG);
              } else {
                ToastAndroid.show('Already Added To Cart', ToastAndroid.LONG);
              }
            }}
          />
        )}
      />
    </View>
  );
};

const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute,
  third: ThirdRoute,
});
const renderTabBar = (props) => (
  <TabBar
    {...props}
    activeColor={'#000'}
    inactiveColor={'grey'}
    style={{ backgroundColor: '#fff' }}
  />
);

export default function HomeScreen({ navigation }) {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'Burgers' },
    { key: 'second', title: 'Pizza' },
    { key: 'third', title: 'Drinks' },
  ]);

  return (
    <View style={styles.main}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity onLongPress={() => navigation.navigate('SignIn')}>
            <Text style={styles.headerTitle}>BurgerLab</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity onPress={() => navigation.push('Cart')}>
            <Entypo name="shopping-bag" size={24} color={COLORS.bgGreen} />
          </TouchableOpacity>
        </View>
      </View>
      <MyCrousel />
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        renderTabBar={renderTabBar}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  headerRight: {
    width: '10%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerLeft: {
    width: '90%',
  },
  header: {
    width: '100%',
    backgroundColor: COLORS.bgLight,
    flexDirection: 'row',
    padding: 8,
    paddingVertical: 15,
  },
  headerTitle: {
    fontWeight: 'bold',
    fontSize: 26,
  },
});
