import * as React from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import COLORS from '../../utils/Colors';
import firebase from '../../utils/firebase';
export default () => {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(null);
  const [items, setItems] = React.useState([
    { label: 'DRINKS', value: 'drinks' },
    { label: 'BURGER', value: 'burger' },
    { label: 'PIZZA', value: 'pizza' },
  ]);
  const [product, setProduct] = React.useState({
    productImage: '',
    productName: '',
    productDescription: '',
    productPrice: '',
  });

  const onSubmit = () => {
    if (value) {
      if (
        product.productPrice.length == 0 ||
        product.productName.length < 8 ||
        product.productImage.length < 8 ||
        product.productDescription.length < 8
      ) {
        alert('Please Fill Details');
      } else {
        const key = firebase.getKey();
        firebase.fset(`food/${value}/${key}`, {
          productId: key,
          category: value,
          productName: product.productName,
          productPrice: product.productPrice,
          productImage: product.productImage,
          productDescription: product.productDescription,
        });
        console.log('product Added');
      }
    } else {
      alert('Please Select the Category');
    }
  };
  return (
    <View style={styles.main}>
      <Image
        source={{
          uri: 'https://burgerlab.com.pk/wp-content/uploads/2022/02/Burger-lab-Logo.png?c062ef&c062ef',
        }}
        style={{
          width: 200,
          height: 200,
        }}
      />
      <View style={styles.inputCard}>
        <Text style={styles.title}>Product Image</Text>
        <TextInput
          placeholder={'Enter Prdouct Image URL'}
          style={styles.inputStyle}
          value={product.productImage}
          onChangeText={(text) =>
            setProduct({ ...product, productImage: text })
          }
        />
      </View>
      <View style={styles.inputCard}>
        <Text style={styles.title}>Product Name</Text>
        <TextInput
          placeholder={'Enter Prdouct Name'}
          style={styles.inputStyle}
          value={product.productName}
          onChangeText={(text) => setProduct({ ...product, productName: text })}
        />
      </View>
      <View style={styles.inputCard}>
        <Text style={styles.title}>Product Description</Text>
        <TextInput
          placeholder={'Enter Prdouct Description'}
          style={styles.inputStyle}
          value={product.productDescription}
          onChangeText={(text) =>
            setProduct({ ...product, productDescription: text })
          }
        />
      </View>
      <View style={styles.inputCard}>
        <Text style={styles.title}>Product Price</Text>
        <TextInput
          placeholder={'Enter Product Price'}
          style={styles.inputStyle}
          value={product.productPrice}
          onChangeText={(text) =>
            setProduct({ ...product, productPrice: text })
          }
        />
      </View>
      <View style={styles.inputCard}>
        <DropDownPicker
          open={open}
          items={items}
          value={value}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          multiple={false}
          mode="BADGE"
          badgeDotColors={[
            '#e76f51',
            '#00b4d8',
            '#e9c46a',
            '#e76f51',
            '#8ac926',
            '#00b4d8',
            '#e9c46a',
          ]}
        />
      </View>
      <TouchableOpacity style={styles.btn} onPress={onSubmit}>
        <Text style={styles.btnText}>Add Product</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.bgLight,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  inputCard: {
    width: '100%',
    padding: 10,
  },
  inputStyle: {
    borderBottomColor: COLORS.textgGrey,
    borderBottomWidth: 1,
    padding: 5,
  },
  btn: {
    padding: 8,
    paddingVertical: 15,
    backgroundColor: COLORS.bgGreen,
    borderRadius: 50,
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  btnText: {
    color: COLORS.text,
  },
});
