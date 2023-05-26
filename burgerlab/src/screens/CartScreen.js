import React from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Button,
} from 'react-native';
import Icon from 'react-native-vector-icons/EvilIcons';
import Cache from '../utils/Cache';

function replaceItemAtIndex(arr, index, newValue) {
  return [...arr.slice(0, index), newValue, ...arr.slice(index + 1)];
}
function removeItemAtIndex(arr, index) {
  return [...arr.slice(0, index), ...arr.slice(index + 1)];
}

const Total = (data) => {
  let temp = 0;
  data.map((e) => {
    let sub_total = parseFloat(e.qty) * parseFloat(e.productPrice);
    const current_total = parseFloat(temp + sub_total);
    temp = current_total;
  });
  return temp;
};

const CartTab = ({ navigation }) => {
  const [items, setItems] = React.useState([]);
  const [total, setTotal] = React.useState(0);

  React.useEffect(() => {
    let userCart = Cache.getSessionValue('usercart', Cache.JSON) || [];
    setItems(userCart);
  }, []);
  React.useEffect(() => {
    setTotal(Total(items));
  }, [items]);

  return (
    <>
      <View
        style={{
          justifyContent: 'space-between',
          flexDirection: 'row',
          alignItems: 'center',
          height: 60,
          backgroundColor: '#0DAC50',
        }}>
        <Text
          style={{
            marginHorizontal: 17,
            fontSize: 22,
            fontWeight: 'bold',
            color: 'white',
          }}>
          Cart
        </Text>
      </View>

      <ScrollView style={{ backgroundColor: '#fff' }}>
        {items.map((e) => {
          {
            /* READY CHECK MENU */
          }
          return (
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
                  justifyContent: 'space-between',
                }}>
                <View style={{ flexDirection: 'row' }}>
                  <Icon
                    name={'minus'}
                    size={30}
                    color={'#0DAC50'}
                    onPress={() => {
                      const index = items.findIndex(
                        (listItem) => listItem.productId === e.productId
                      );
                      const exists = items.find(
                        (i) => i.productId === e.productId
                      );
                      if (exists) {
                        if (e.qty > 1) {
                          e.qty -= 1;
                          const newList = replaceItemAtIndex(items, index, e);
                          setItems(newList);
                          Cache.setSessionValue(
                            'usercart',
                            newList,
                            Cache.JSON
                          );
                        }
                      }
                    }}
                  />
                  <Text style={{ paddingLeft: 5, fontSize: 22 }}>{e.qty}</Text>
                  <Icon
                    style={{ paddingLeft: 5 }}
                    name={'plus'}
                    size={30}
                    onPress={() => {
                      const index = items.findIndex(
                        (listItem) => listItem.productId === e.productId
                      );
                      const exists = items.find(
                        (i) => i.productId === e.productId
                      );
                      if (exists) {
                        e.qty += 1;
                        const newList = replaceItemAtIndex(items, index, e);
                        setItems(newList);
                        Cache.setSessionValue('usercart', newList, Cache.JSON);
                      }
                    }}
                    color={'#0DAC50'}
                  />
                </View>

                <View>
                  <Icon
                    style={{ paddingRight: 10 }}
                    name={'trash'}
                    size={30}
                    color={'#0DAC50'}
                    onPress={() => {
                      const index = items.findIndex(
                        (listItem) => listItem.productId === e.productId
                      );
                      const newList = removeItemAtIndex(items, index);
                      setItems(newList);
                      Cache.setSessionValue('usercart', newList, Cache.JSON);
                    }}
                  />
                </View>
              </View>
            </View>
          );
        })}
      </ScrollView>

      <View style={{ backgroundColor: '#0DAC50' }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingTop: 10,
            marginHorizontal: 17,
            height: 30,
          }}>
          <Text style={{ fontSize: 16, color: 'white', fontWeight: 'bold' }}>
            Total
          </Text>
          <Text style={{ fontSize: 16, color: 'white', fontWeight: 'bold' }}>
            {total}
          </Text>
        </View>
        <View style={{ alignItems: 'center' }}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('CheckOut');
            }}
            style={{
              width: 200,
              height: 45,
              borderRadius: 6,
              backgroundColor: 'white',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 10,
              marginBottom: 10,
            }}>
            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>CHECKOUT</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default CartTab;
