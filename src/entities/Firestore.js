import firebase from "react-native-firebase";

export class Firestore {

  constructor(collection, fields) {
    this.db = firebase.firestore();
    this.collection = collection;
    this.fields = fields;
  }

  makeEntity(doc) {
    const entity = {};
    const data = doc.data();
    this.fields.forEach((value) => entity[value] = (data[value]));
    entity.id = doc.id;
    return entity;
  }

  makeDoc(entity) {
    const doc = {};
    this.fields.forEach((value) => doc[value] = entity[value]);
    return doc;
  }

  async getList() {
    return this.db.collection(this.collection).get()
      .then((snap) => snap.docs.map((doc) => this.makeEntity(doc)));
  }

  async getByID(id) {
    const doc = await this.db.collection(this.collection).doc(id).get();

    if (doc.exists) {
      return this.makeEntity(doc, id);
    }

    return undefined;
  }

  async setByID(id, value) {
    return this.db.collection(this.collection).doc(id).set(this.makeDoc(value));
  }

}
