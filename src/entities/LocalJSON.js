import { jsonDB } from ".";

export class LocalJSONSnapshot {
  constructor(data) {
    this._data = data;
  }

  data() {
    return this._data;
  }
}

export class LocalJSONRef {
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
    return new LocalJSONSnapshot(cur);
  }
}

export class LocalJSON {
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