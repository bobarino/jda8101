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
const LOCAL_JSON_FOLDER = "../../local_database";

let Exercises, Workouts, Programs, Teams, Users;

let jsonDB = null;

class LocalJSONRef {
  constructor(path, ) {
    this.path = path;
  }

  async get() {
    const pathSplit = this.path.split("/");
    let cur = jsonDB;

    for (const path of pathSplit) {
      if (!cur) throw new Error(`Invalid Reference: ${this.path}`);
      cur = cur[path];
    }
    return cur;
  }
}

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

if (USE_LOCAL_JSON) {
  const totalDB = {};
  totalDB.exercises = require(`${LOCAL_JSON_FOLDER}/exercises.json`);
  totalDB.workouts = require(`${LOCAL_JSON_FOLDER}/workouts.json`);
  totalDB.programs = require(`${LOCAL_JSON_FOLDER}/programs.json`);
  totalDB.teams = require(`${LOCAL_JSON_FOLDER}/teams.json`);
  totalDB.users = require(`${LOCAL_JSON_FOLDER}/users.json`);

  console.log("before:", totalDB);

  const transformDB = (db) => {
    Object.entries(db).forEach(([key, value]) => {
      if (typeof value === "object") {
        db[key] = transformDB(value);
      } else if (typeof value === "string") {
        if (value.startsWith("__ref:")) {
          db[key] = new LocalJSONRef(value.split(":")[1]);
        }
        if (value.startsWith("__date:")) {
          db[key] = new Date(value);
        }
      }
    });
    return db;
  };

  jsonDB = transformDB(totalDB);

  console.log("after:", jsonDB);
  Exercises = new LocalJSON(jsonDB.exercises);
  Workouts = new LocalJSON(jsonDB.workouts);
  Programs = new LocalJSON(jsonDB.programs);
  Teams = new LocalJSON(jsonDB.teams);
  Users = new LocalJSON(jsonDB.users);
} else {
  Exercises = new Firestore("exercises", ["exName", "exStart", "exAct", "exType"]);
  // Workouts = new Firestore("workouts", []);
  Programs = new Firestore("programs", ["level", "pid", "sport", "weeks"]);
  Teams = new Firestore("teams", ["school", "sport"]);
  Users = new Firestore("users", ["team", "curProgram", "curProgramStart"]);
}

export { Exercises, Workouts, Programs, Teams, Users };