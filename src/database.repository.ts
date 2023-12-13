import { Injectable } from '@nestjs/common';
import { Config, JsonDB } from 'node-json-db';

@Injectable()
export class DatabaseRepository {
  private db: JsonDB;

  constructor() {
    this.db = new JsonDB(new Config('db', true, false));
  }

  create(path, payload) {
    return this.db.push(`/db/${path}/data[]`, payload);
  }

  findAll(path) {
    return this.db.getData(`/db/${path}/data`);
  }

  findOne(path, payload) {
    return this.db.getData(`/db/${path}/data[${payload}]`)
  }

  // detele(payload) {
  //   return this.db.delete(`/db/${this.path}/data[${payload}]`);
  // }
}
