import firebase from "react-native-firebase";

export default class Exercises {

  static getList() {
    return new Promise((resolve) => {
      const ref = firebase.firestore().collection("exercises");
      const unsubscribe = ref.onSnapshot((snap) => {
        unsubscribe();
        resolve(snap.docs.map((doc) => {
          const { exName, exStart, exAct, exType } = doc.data();
          return {
            exName,
            exStart,
            exAct,
            exType,
          };
        }));
      });
    });
  }
}