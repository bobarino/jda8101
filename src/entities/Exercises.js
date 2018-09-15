import firebase from "react-native-firebase";

export default class Exercises {

  static transformDoc(doc) {
    const { exName, exStart, exAct, exType } = doc.data();
    return { exName, exStart, exAct, exType };
  }

  static getList() {
    return firebase.firestore().collection("exercises").get()
      .then((snap) => snap.docs.map((doc) => this.transformDoc(doc)));
  }
}