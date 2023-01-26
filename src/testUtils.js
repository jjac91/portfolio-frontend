import React from "react";
import UserContext from "./auth/UserContext";

const demoUser = {
  username: "testuser",
  name: "first",
  locations: [],
};

const UserProvider =
    ({ children, currentUser = demoUser}) => (
    <UserContext.Provider value={{ currentUser}}>
      {children}
    </UserContext.Provider>
);

export { UserProvider };
