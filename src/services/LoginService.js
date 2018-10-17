import firebase from "react-native-firebase";
import { Users, Teams } from "../entities";

async function login(email, password) {
  // will throw an error if authentication fails
  const userCredential = await firebase.auth().signInAndRetrieveDataWithEmailAndPassword(email, password);
  let user = await Users.getByID(userCredential.user.id);

  // in case someone doesn't have a profile already
  if (!user) {
    user = { team: undefined, curProgram: undefined, curProramStart: undefined };
    Users.setByID(userCredential.user.id, user);
  }

  return user;
}

async function logout() {
  return firebase.auth().signOut();
}

async function register(first, last, email, password, teamCode) {
  const team = Teams.getByID(teamCode);

  if (teamCode && !team) {
    throw new Error("Error: Invalid Team Code");
  }

  // get firebase auth object
  const userCredential = await firebase.auth().createUserAndRetrieveDataWithEmailAndPassword(email, password);

  const user = {
    first,
    last,
    team,
    curProgram: undefined,
    curProramStart: undefined,
    uid: userCredential.user.id
  };

  // update record in firestore
  Users.setByID(userCredential.user.email, user);
  return user;
}

function getCurrentUserCredential() {
  return firebase.auth().currentUser;
}

function getCurrentUser() {
  return Users.getByID(getCurrentUserCredential().email);
}

function onLoginStateChanged(callback) {
  return firebase.auth().onAuthStateChanged(callback);
}

function isLoggedIn() {
  return firebase.auth().currentUser !== null;
}

function sendPasswordResetEmail(email) {
  return firebase.auth().sendPasswordResetEmail(email);
}

export default { login, register, logout, getCurrentUserCredential, getCurrentUser, onLoginStateChanged, isLoggedIn, sendPasswordResetEmail };