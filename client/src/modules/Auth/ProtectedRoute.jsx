import React from "react";
import { Route, Redirect } from "react-router-dom";

export const ProtectedRoute = ({ component: Component, user, ...rest }) => {
  return (
    <Route
      user={user}
      {...rest}
      render={(props) => {
        if (user) {
          return <Component user={user} {...rest} {...props} />;
        } else {
          return <Redirect to="/" />;
        }
      }}
    />
  );
};
