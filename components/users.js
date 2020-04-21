import { useEffect, useState } from "react";
import Link from "next/link";
import Layout from "./layout";
import useFetchUsers from "../hooks/useFetchUsers";

const Users = () => {
  const users = useFetchUsers();
  return (
    <div>
      <h1>Users</h1>
      {users.map((user) => (
        <div key={user.id}>
          <span>{user.name}</span> <span>{user.email}</span>
        </div>
      ))}
    </div>
  );
};

export default Users;
