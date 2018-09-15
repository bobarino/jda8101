import firebase from "react-native-firebase";
import Users from "../entities/Users";
import Teams from "../entities/Teams";

export default class LoginService {
  static auth = firebase.auth();

  static async login(email, password) {
    // will throw an error if authentication fails
    const userCredential = await this.auth().signInAndRetrieveDataWithEmailAndPassword(email, password);
    let user = await Users.getByID(userCredential.user.uid);

    // in case someone doesn't have a profile already
    if (!user) {
      user = { team: undefined, curProgram: undefined, curProramStart: undefined };
      Users.setByID(userCredential.user.uid, user);
    }

    return user;
  }

  static async logout() {
    return this.auth().signOut();
  }

  static async register(email, password, teamCode) {
    const team = Teams.getByID(teamCode);

    if (teamCode && !team) {
      throw new Error("Error: Invalid Team Code");
    }

    const userCredential = await this.auth().createUserAndRetrieveDataWithEmailAndPassword(email, password);

    const user = { team: undefined, curProgram: undefined, curProramStart: undefined };
    Users.setByID(userCredential.user.uid, user);

    return user;
  }

  static getCurrentUser() {
    return this.auth().currentUser;
  }

  static getCurrentUserCredential() {
    return this.auth().currentUser;
  }

  static onLoginStateChanged(callback) {
    return this.auth().onAuthStateChanged(callback);
  }

  static isLoggedIn() {
    return this.auth().currentUser !== null;
  }

  static sendPasswordResetEmail(email) {
    return this.auth().sendPasswordResetEmail(email);
  }
}