import React from "react";
import { Redirect, Route } from "react-router-dom";
import { getUserFromLocalStorage } from "../../utils/localStorage";

function PrivateWithProfile({ component: Component, ...restOfProps }) {
  const user = getUserFromLocalStorage();
  return (
    <Route
      {...restOfProps}
      render={(props) =>
        (user && !user.profile && user.userType === "expert") ? (
          <Component {...props} />
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );
}

export default PrivateWithProfile;