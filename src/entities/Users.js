import firebase from "react-native-firebase";

export default class Users {

  static db = firebase.firestore();

  static transformDoc(doc) {
    const { team, curProgram, curProgramStart } = doc.data();
    return { id: doc.id, team, curProgram, curProgramStart };
  }

  static async getList() {
    return this.db.collection("users").get()
      .then((snap) => snap.docs.map((doc) => this.transformDoc(doc)));
  }

  static async getByID(id) {
    const doc = await this.db.collection("users").doc(id);

    if (doc.exists) {
      return this.transformDoc(doc);
    }

    return undefined;
  }

  static async setByID(id, value) {
    const { team, curProgram, curProgramStart } = value;
    return this.db.collection("users").doc(id).set({ team, curProgram, curProgramStart });
  }

}