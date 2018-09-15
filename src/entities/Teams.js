import firebase from "react-native-firebase";

export default class Teams {

  static db = firebase.firestore();

  static transformDoc(doc) {
    const { school, sport } = doc.data();
    return { id: doc.id, school, sport };
  }

  static async getList() {
    return this.db.collection("teams").get()
      .then((snap) => snap.docs.map((doc) => this.transformDoc(doc)));
  }

  static async getByID(id) {
    const doc = await this.db.collection("teams").doc(id);

    if (doc.exists) {
      return this.transformDoc(doc);
    }

    return undefined;
  }

  static async setByID(id, value) {
    const { school, sport } = value;
    return this.db.collection("teams").doc(id).set({ school, sport });
  }

}