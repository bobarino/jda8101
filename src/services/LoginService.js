import firebase from 'react-native-firebase';

export class LoginService {
    static logout() {
        firebase.auth().signOut()
            .then(() => this.props.navigation.navigate('Welcome'));
    }

    static isLoggedIn() {
        return firebase.auth().currentUser !== null;
    }
}