import firebase from "react-native-firebase";

export default class Programs {

  static transformDoc(doc) {
    const { level, pid, sport, weeks } = doc.data();
    return { level, pid, sport, weeks };
  }

  static getList() {
    return firebase.firestore().collection("programs").get()
      .then((snap) => snap.docs.map((doc) => this.transformDoc(doc)));
  }

}