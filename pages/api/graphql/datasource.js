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

  async getUsers(skip = 0, limit = 5) {
    const users = await this.collection.find().skip(skip).limit(limit).exec();
    const totalUsers = await this.collection.countDocuments();
    const hasNext = users.length + skip < totalUsers;
    return {
      users,
      hasNext,
    };
  }

  createUser(name, email) {
    this.user = new User({ name, email });
    return this.user.save();
  }

  async updateUser(id, name, email) {
    const user = await this.collection.findOne({ _id: id });
    user.name = name;
    user.email = email;
    return user.save();
  }

  async deleteUser(id) {
    await this.collection.deleteOne({ _id: ObjectId(id) });
    return id;
  }
}

export default UsersAPI;
