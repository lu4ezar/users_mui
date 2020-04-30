/* eslint-disable no-underscore-dangle */
import { DataSource } from "apollo-datasource";
import { ObjectId } from "mongodb";
import User from "./model";

class UsersAPI extends DataSource {
  constructor(collection) {
    super();
    this.collection = collection;
  }

  getUser(userId) {
    return this.collection.findOne({ _id: ObjectId(userId) });
  }

  getAllUsers() {
    return this.collection.find();
  }

  createUser(name, email) {
    this.user = new User({ name, email });
    return this.user.save();
  }

  async updateUser(id, name, email) {
    this.user = await this.getUser(id);
    this.user.name = name;
    this.user.email = email;
    return this.user.save();
  }

  async deleteUser(id) {
    const user = await this.collection.findOne({ _id: ObjectId(id) });
    await this.collection.deleteOne({ _id: ObjectId(id) });
    return user;
  }
}

export default UsersAPI;
