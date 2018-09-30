import { Firestore } from "./Firestore";
import { LocalJSON, LocalJSONRef } from "./LocalJSON";

let Exercises, Workouts, Programs, Teams, Users;

const USE_LOCAL_JSON = false;
const LOCAL_JSON_FOLDER = "../../local_database";

export let jsonDB = null;

if (USE_LOCAL_JSON) {
  const totalDB = {};
  totalDB.exercises = require(`${LOCAL_JSON_FOLDER}/exercises.json`);
  totalDB.workouts = require(`${LOCAL_JSON_FOLDER}/workouts.json`);
  totalDB.programs = require(`${LOCAL_JSON_FOLDER}/programs.json`);
  totalDB.teams = require(`${LOCAL_JSON_FOLDER}/teams.json`);
  totalDB.users = require(`${LOCAL_JSON_FOLDER}/users.json`);

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