import React, { FC } from "react";
import { Route, Redirect } from "react-router-dom";
import { User } from '../../types';

export interface ProtectedRouteProps {
  component: any;
  user: any;
  path: string;
  setUser: (user: User) => void;
  exact?: boolean;
}

export const ProtectedRoute: FC<ProtectedRouteProps> = ({ component: Component, user, ...rest }) => {
  return (
    <Route
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
