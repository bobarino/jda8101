import firebase from 'react-native-firebase';

export class LoginService {
    static login(email, password) {
        return firebase.auth().signInAndRetrieveDataWithEmailAndPassword(email, password);
    }
    static logout() {
        return firebase.auth().signOut();
    }

    static register(email, password) {
        return firebase.auth().createUserWithEmailAndPassword(email, password);
    }

    static getCurrentUser() {
        return firebase.auth().currentUser;
    }

    static onLoginStateChanged(callback) {
        firebase.auth().onAuthStateChanged(callback);
    }

    static isLoggedIn() {
        return firebase.auth().currentUser !== null;
    }
}