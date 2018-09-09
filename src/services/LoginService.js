import firebase from "react-native-firebase";

export default class LoginService {
  static login(email, password) {
    return firebase.auth().signInAndRetrieveDataWithEmailAndPassword(email, password);
  }
  static logout() {
    return firebase.auth().signOut();
  }

  static register(email, password) {
    return firebase.auth().createUserAndRetrieveDataWithEmailAndPassword(email, password);
  }

  static getCurrentUser() {
    return firebase.auth().currentUser;
  }

  static onLoginStateChanged(callback) {
    return firebase.auth().onAuthStateChanged(callback);
  }

  static isLoggedIn() {
    return firebase.auth().currentUser !== null;
  }

  static sendPasswordResetEmail(email) {
      return firebase.auth().sendPasswordResetEmail(email);
  }
}