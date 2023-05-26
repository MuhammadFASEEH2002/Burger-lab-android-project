import * as React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import COLORS from '../utils/Colors';
import firebase from '../utils/firebase';
import Cache from '../utils/Cache';

export default ({ navigation }) => {
  const [order, setOrder] = React.useState([]);
  const [customerDetail, setCustomerDetail] = React.useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
  });
  React.useEffect(() => {
    let userCart = Cache.getSessionValue('usercart', Cache.JSON) || [];
    setOrder(userCart);
    firebase.on('order', (snap) => console.log(snap.val()));
  }, []);

  const onSubmit = () => {
    if (customerDetail.firstName.length < 5) {
      alert('Please Enter First Name');
      return;
    }
    if (customerDetail.lastName.length < 5) {
      alert('Please Enter Last Name');
      return;
    }
    if (customerDetail.address.length < 8) {
      alert('Please Enter Address');
      return;
    }
    if (customerDetail.email.length < 12) {
      alert('Please Enter Email');
      return;
    }
    if (customerDetail.phone.length < 11) {
      alert('Please Enter Phone No');
      return;
    }
    if (customerDetail.city.length < 5) {
      alert('Please Enter City');
      return;
    }
    const key = firebase.getKey();
    firebase.fset(`order/${key}`, {
      orderId: key,
      customerDetail,
      orderDetail: order,
    });
     
    Cache.clearSession(); 
    alert("Order Complete!! You will get a confirmation call soon"); 
    navigation.popToTop();

  };

  return (
    <View style={styles.main}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Details</Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder={'First Name'}
          style={styles.input}
          value={customerDetail.firstName}
          onChangeText={(text) =>
            setCustomerDetail({ ...customerDetail, firstName: text })
          }
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder={'Last Name'}
          style={styles.input}
          value={customerDetail.lastName}
          onChangeText={(text) =>
            setCustomerDetail({ ...customerDetail, lastName: text })
          }
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder={'Phone'}
          style={styles.input}
          value={customerDetail.phone}
          onChangeText={(text) =>
            setCustomerDetail({ ...customerDetail, phone: text })
          }
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder={'Email'}
          style={styles.input}
          value={customerDetail.email}
          onChangeText={(text) =>
            setCustomerDetail({ ...customerDetail, email: text })
          }
        />
      </View>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Billing Address</Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder={'Address'}
          style={styles.input}
          value={customerDetail.address}
          onChangeText={(text) =>
            setCustomerDetail({ ...customerDetail, address: text })
          }
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder={'City'}
          style={styles.input}
          value={customerDetail.city}
          onChangeText={(text) =>
            setCustomerDetail({ ...customerDetail, city: text })
          }
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder={'Postal Code'}
          style={styles.input}
          value={customerDetail.postalCode}
          onChangeText={(text) =>
            setCustomerDetail({ ...customerDetail, postalCode: text })
          }
        />
      </View>
      <TouchableOpacity style={styles.btn} onPress={onSubmit}>
        <Text>Proceed</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: COLORS.bgLight,
    alignItems: 'center',
  },
  header: {
    backgroundColor: COLORS.textgGrey,
    padding: 8,
    width: '100%',
  },
  headerTitle: {
    color: COLORS.text,
  },
  inputContainer: {
    padding: 8,
    marginVertical: 4,
    width: '100%',
  },
  input: {
    borderColor: COLORS.textgGrey,
    borderWidth: 1,
    borderRadius: 4,
    padding: 8,
    color: COLORS.textgGrey,
  },
  btn: {
    padding: 8,
    paddingVertical: 12,
    marginVertical: 4,
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: COLORS.textgGrey,
    borderWidth: 1,
    borderRadius: 4,
  },
});
