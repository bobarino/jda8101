import firebase from "react-native-firebase";

export default class Programs {

  static getList() {
    return new Promise((resolve) => {
      const ref = firebase.firestore().collection("programs");
      const unsubscribe = ref.onSnapshot((snap) => {
        unsubscribe();
        resolve(snap.docs.map((doc) => {
          const { level, pid, sport, weeks } = doc.data();
          return {
            level,
            pid,
            sport,
            weeks,
          };
        }));
      });
    });
  }
}