export default {
  Query: {
    users: (_, __, { dataSources }) => dataSources.users.getAllUsers(),
    user: (_, { id }, { dataSources }) => dataSources.users.getUser(id),
  },
  Mutation: {
    createUser: (_, { input: { name, email } }, { dataSources }) =>
      dataSources.users.createUser(name, email),
    updateUser: (_, { id, input: { name, email } }, { dataSources }) =>
      dataSources.users.updateUser(id, name, email),
    deleteUser: (_, { id }, { dataSources }) =>
      dataSources.users.deleteUser(id),
  },
};
