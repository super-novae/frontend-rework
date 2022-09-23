import axios from "axios";

const login_url = `${process.env.REACT_APP_BASE_ENDPOINT.toString()}/api/v1/superuser/login`;

export const superuser_login = async (username, password) => {
  try {
    const user = await axios.post(login_url, { username, password });
    if (user.data) {
      console.log(user.data);
      return user.data;
    }
  } catch (err) {
    console.log(err.message);
    return err.message;
  }
};
