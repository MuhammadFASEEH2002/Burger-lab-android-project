import firebase from 'firebase';
import { Alert } from 'react-native';

class database {
  constructor() {
    if (!firebase.apps.length) {
      firebase.initializeApp({
        apiKey: 'AIzaSyAzzOfYMgmxtUTPCkIv1kAKFJKONwrM_Ow',
        authDomain: 'food-os-edab7.firebaseapp.com',
        databaseURL: 'https://food-os-edab7-default-rtdb.firebaseio.com',
        projectId: 'food-os-edab7',
        storageBucket: 'food-os-edab7.appspot.com',
        messagingSenderId: '1048213222840',
        appId: '1:1048213222840:web:6f7086836ac89d0dbacb4d',
        measurementId: 'G-G3XX5HE3Q1',
      });
    }
  }
  getUid() {
    // console.log(firebase.auth().currentUser)
    try {
      this.userid = firebase.auth().currentUser.uid;
      return this.userid;
    } catch (err) {
      return null;
    }
  }
  //-------------------Authentication Logic --------------------------//
  isAuthenticated(callback) {
    firebase.auth().onAuthStateChanged(callback);
  }
  signIn(email, pass, callback) {
    const promise = firebase.auth().signInWithEmailAndPassword(email, pass);
    promise.then((e) => {
      callback({
        type: 'success',
        message: 'User Logged In',
      });
    });
    promise.catch((e) => {
      callback({
        type: 'failed',
        message: e.message,
      });
    });
  }
  signOut() {
    firebase.auth().signOut();
  }
  signUp(email, pass, name) {
    const promise = firebase.auth().createUserWithEmailAndPassword(email, pass);
    promise.then(function () {
      let userid = firebase.auth().currentUser.uid;
      firebase
        .database()
        .ref('users/' + userid)
        .set({
          name: name,
          email: email,
          pass: pass,
          uid: userid,
        });
      Alert.alert('Account created', 'Login SuccessFull');
    });
    promise.catch(function (error) {
      Alert.alert('Error', error);
    });
  }
  //-------------------Authentication Logic done --------------------------//

  fb() {
    return firebase;
  }
  getKey() {
    return firebase.database().ref().child('estore').push().key;
  }
  update(path, callback) {
    firebase.database().ref(path).update(callback);
  }
  on(path, callback) {
    firebase.database().ref(path).on('child_added', callback);
  }
  onChanged(path, callback) {
    firebase.database().ref(path).on('child_changed', callback);
  }
  add(path, task) {
    firebase.database().ref(path).push(task);
  }
  fset(path, task) {
    firebase.database().ref(path).set(task);
  }
  dlt(path, id) {
    firebase.database().ref(path).child(id).remove();
  }
  off(path) {
    firebase.database().ref(path).off();
  }
  convertTime(time) {
    const d = new Date(time);
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    const output =
      d.getDate() + '/' + months[d.getMonth()] + '/' + d.getFullYear();
    return output;
  }
  convertTime2(time) {
    const d = new Date(time);
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    const output =
      d.getFullYear() + '/' + months[d.getMonth()] + '/' + d.getDate();
    return output;
  }
  getTimeinMilli() {
    var d = new Date();
    return d.getTime();
  }
}
export default new database();
