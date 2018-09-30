import firebase from "react-native-firebase";

export class Firestore {

  constructor(collection, fields) {
    this.db = firebase.firestore();
    this.collection = collection;
    this.fields = fields;
  }

  makeEntity(doc) {
    const data = doc.data();
    const entity = Object.assign({}, data);
    entity.id = doc.id;
    return entity;
  }

  makeDoc(entity) {
    const doc = {};
    this.fields.forEach((value) => doc[value] = entity[value]);
    return doc;
  }

  async getList() {
    const snap = await this.db.collection(this.collection).get();
    const ret = [];
    for (const doc of snap.docs) {
      ret.push(await this.makeEntity(doc));
    }
    return ret;
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
