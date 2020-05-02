import axios from "axios";

export const signup = (username, password) => {
  console.log(username, password);
  return axios
    .post("/api/auth/signup", { username, password })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err.response.data;
    });
};

export const login = (username, password) => {
  console.log(username, password);
  return axios
    .post("/api/auth/login", { username, password })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err.response.data;
    });
};

export const logout = () => {
  return axios
    .delete("/api/auth/logout")
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err.response.data;
    });
};
