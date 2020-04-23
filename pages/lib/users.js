import fetch from "isomorphic-unfetch";

const url =
  "https://gist.githubusercontent.com/lu4ezar/fedc080ab29a9211ee1df3e6ac4e3235/raw/53ad3f5d9106b9d60270d0d64ae5b8eb27e51c94/users";

export const getUsers = async () => {
  const response = await fetch(url);
  const { users } = await response.json();
  return users;
};

export const getAllUserIds = async () => {
  const users = await getUsers();
  return users.map(({ id }) => ({ params: { id } }));
};

export const getUser = async (id) => {
  const users = await getUsers();
  const user = users.find((usr) => usr.id === id);
  return {
    id,
    ...user,
  };
};
