import firebase from "react-native-firebase";

class Firestore {

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

const USE_LOCAL_JSON = true;
const LOCAL_JSON_FILE = "../../local_database.json";

class LocalJSON {
  constructor(jsonDB) {
    this.db = jsonDB;
  }

  makeEntity(id) {
    const entity = {};
    Object.assign(entity, this.db[id]);
    entity.id = id;
    return entity;
  }

  async getList() {
    return Object.keys(this.db).map((value) => this.makeEntity(value));
  }

  async getByID(id) {
    const val = this.db[Object.keys(this.db).find((value) => value === id)];
    if (!val) return undefined;

    val.id = id;
    return val;
  }

  async setByID(id, value) {
    delete value.id;
    this.db[id] = value;
  }
}

let Exercises, Programs, Teams, Users;

if (USE_LOCAL_JSON) {
  const jsonDB = require(LOCAL_JSON_FILE);
  Exercises = new LocalJSON(jsonDB["exercises"]);
  Programs = new LocalJSON(jsonDB["programs"]);
  Teams = new LocalJSON(jsonDB["teams"]);
  Users = new LocalJSON(jsonDB["users"]);
} else {
  Exercises = new Firestore("exercises", ["exName", "exStart", "exAct", "exType"]);
  Programs = new Firestore("programs", ["level", "pid", "sport", "weeks"]);
  Teams = new Firestore("teams", ["school", "sport"]);
  Users = new Firestore("users", ["team", "curProgram", "curProgramStart"]);
}

export { Exercises, Programs, Teams, Users };