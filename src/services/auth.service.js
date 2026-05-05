import api from "./axios";

export const loginUser = async ({ email, password }) => {
  const payload = {
    email,
    password,
    portal: "admin", // required as per your API
  };

  const response = await api.post("/user/login", payload);

  return response.response;
};