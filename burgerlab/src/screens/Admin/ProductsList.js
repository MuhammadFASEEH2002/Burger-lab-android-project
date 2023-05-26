import React from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  ToastAndroid,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/EvilIcons';
import COLORS from '../../utils/Colors';
import firebase from '../../utils/firebase';

export default ({ navigation }) => {
  const [items, setItems] = React.useState([]);
  React.useEffect(() => {
    firebase.on('food/drinks', (snapshot) => {
      setItems((food) => [...food, snapshot.val()]);
    });
    firebase.on('food/pizza', (snapshot) => {
      setItems((food) => [...food, snapshot.val()]);
    });
    firebase.on('food/burger', (snapshot) => {
      setItems((food) => [...food, snapshot.val()]);
    });
  }, []);
  return (
    <View style={styles.main}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.headerTitle}>BurgerLab Admin</Text>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity onPress={() => navigation.navigate('AddProduct')}>
            <Ionicons name="ios-add-circle" size={24} color={COLORS.bgGreen} />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView>
        {items.map((e) => (
          <View
            style={{
              paddingBottom: 10,
              marginHorizontal: 10,
              borderWidth: 1,
              borderRadius: 4,
              borderColor: '#ddd',
              borderRightWidth: 0,
              borderUpWidth: 0,
              borderLeftWidth: 0,
            }}>
            <View style={{ flexDirection: 'row', height: 60, marginTop: 10 }}>
              <View
                style={{
                  width: 90,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Image
                  style={{
                    width: 60,
                    height: 60,
                    borderRadius: 5,
                    marginLeft: 20,
                    resizeMode : "center"
                  }}
                  source={{
                    uri: e.productImage
                      ? e.productImage
                      : 'https://t4.ftcdn.net/jpg/04/70/29/97/360_F_470299797_UD0eoVMMSUbHCcNJCdv2t8B2g1GVqYgs.jpg',
                  }}
                />
              </View>

              <View
                style={{
                  justifyContent: 'space-between',
                  padding: 15,
                  flex: 1,
                }}>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: 'bold',
                    height: '100%',
                  }}>
                  {e.productName}
                </Text>
                <Text style={{ fontSize: 12 }}>{e.productDescription}</Text>
              </View>
              <View style={{ width: 60, justifyContent: 'center' }}>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: 'bold',
                    color: 'green',
                  }}>
                  Rs. {e.productPrice}
                </Text>
              </View>
            </View>
            {/* READY BUTTON PLUS */}
            <View
              style={{
                marginHorizontal: 19,
                marginTop: 10,
                flexDirection: 'row',
                justifyContent: 'flex-end',
              }}>
              <View>
                <Icon
                  style={{ paddingRight: 10 }}
                  name={'trash'}
                  size={30}
                  color={'#0DAC50'}
                  onPress={() => {
                    firebase.dlt(`food/${e.category}/`, e.productId)
                    ToastAndroid.show("Item Removed Please Reload" , ToastAndroid.LONG)
                  }}
                />
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: COLORS.bgLight,
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
