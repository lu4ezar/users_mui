import { useMutation, useQuery } from "@apollo/react-hooks";
import { GET_USERS, UPDATE_USER, DELETE_USER } from "../../apolloClient";

export const useFetch = () => {
  const { loading, error, data, fetchMore: fetchMoreUseQuery } = useQuery(
    GET_USERS
  );
  const updateQuery = (prev, { fetchMoreResult }) => {
    if (!fetchMoreResult.usersQuery.users.length) {
      return prev;
    }
    return {
      ...fetchMoreResult,
      usersQuery: {
        ...fetchMoreResult.usersQuery,
        users: [...prev.usersQuery.users, ...fetchMoreResult.usersQuery.users],
      },
    };
  };
  const fetchMore = () => {
    fetchMoreUseQuery({
      variables: {
        skip: data.usersQuery.users.length,
      },
      updateQuery,
    });
  };

  return { fetchMore, data, loading, error };
};

export const useUpdateMutation = () => {
  const [updateUser] = useMutation(UPDATE_USER);
  return updateUser;
};

export const useDeleteMutation = (id) => {
  const [deleteUser] = useMutation(DELETE_USER, {
    variables: {
      id,
    },
    update(cache, { data: { deleteUser: deletedUserId } }) {
      const cachedQuery = cache.readQuery({
        query: GET_USERS,
      });
      const { users: cachedUsers } = cachedQuery.usersQuery;
      const users = cachedUsers.filter(({ _id }) => _id !== deletedUserId);
      cache.writeQuery({
        query: GET_USERS,
        data: {
          usersQuery: {
            ...cachedQuery.usersQuery,
            users,
          },
        },
      });
    },
  });
  return deleteUser;
};
