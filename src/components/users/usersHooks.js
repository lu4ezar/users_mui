import { useMutation, useQuery } from "@apollo/react-hooks";
import {
  GET_USERS,
  UPDATE_USER,
  DELETE_USER,
} from "../../apolloClient/queries";

export const useFetch = () => {
  const { loading, error, data, fetchMore: fetchMoreUseQuery } = useQuery(
    GET_USERS,
    {
      notifyOnNetworkStatusChange: true,
      errorPolicy: "all",
      onError: (err) => err,
    }
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
    return fetchMoreUseQuery({
      variables: {
        skip: data.usersQuery.users.length,
      },
      updateQuery,
    });
  };

  return { fetchMore, data, loading, error };
};

export const useUpdateMutation = () => {
  const [updateUser, { error }] = useMutation(UPDATE_USER, {
    onError: () => {},
  });
  return { updateUser, error };
};

export const useDeleteMutation = (id) => {
  const [deleteUser, { error }] = useMutation(DELETE_USER, {
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
  return { deleteUser, error };
};
