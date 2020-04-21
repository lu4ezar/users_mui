import { useState, useEffect } from "react";

const url =
  "https://gist.githubusercontent.com/lu4ezar/fedc080ab29a9211ee1df3e6ac4e3235/raw/53ad3f5d9106b9d60270d0d64ae5b8eb27e51c94/users";

export default function useFetchUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const data = await fetch(url);
      const { users } = await data.json();
      setUsers(users);
    };
    fetchUsers();
  }, []);
  return users;
}
