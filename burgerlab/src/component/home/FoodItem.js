import * as React from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import COLORS from '../../utils/Colors';
export default function FoodItem({ item , onPress }) {
  return (
    <View style={styles.main}>
      <View style={styles.cardLeft}>
        <Image
          source={{
            uri: item?.productImage
              ? item?.productImage
              : 'https://burgerlab.com.pk/wp-content/uploads/2022/01/quadra.png?c062ef&c062ef',
          }}
          style={{
            width: '100%',
            height: '100%',
            maxHeight: 150,
            resizeMode : "center"
          }}
        />
      </View>
      <View style={styles.cardRight}>
        <Text style={styles.cardTitle}>{item?.productName}</Text>
        <Text>{item?.productDescription} </Text>
        <Text style={styles.cardPrice}>Rs. {item?.productPrice}</Text>
        <View style={styles.listrow}>
          <TouchableOpacity style={styles.cartButton} onPress={onPress}>
            <Text>Add To Cart</Text>
          </TouchableOpacity>

          <MaterialIcons
            name="favorite-border"
            size={24}
            color={COLORS.bgGreen}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    width: '100%',
    height: 200,
    flexDirection: 'row',
    marginVertical: 10,
  },
  cardLeft: {
    width: '50%',
  },
  cardRight: {
    width: '50%',
    padding: 12,
    justifyContent: 'space-between',
  },
  cardTitle: {
    fontSize: 22,
    marginVertical: 5,
  },
  cardPrice: {
    padding: 6,
    backgroundColor: COLORS.textgGrey,
    borderRadius: 20,
    marginVertical: 5,
    color: COLORS.text,
    width : "50%",
    justifyContent : "center",
    alignItems : "center"
  },
  listrow: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    marginVertical: 5,
    alignItems: 'center',
  },
  cartButton: {
    padding: 6,
    borderWidth: 1,
    borderColor: COLORS.bgGreen,
    borderRadius: 8,
  },
});
