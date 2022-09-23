import axios from "axios";

export const administratorSignUp = async (token, body) => {
  const admin_signup_url = `${process.env.REACT_APP_BASE_ENDPOINT.toString()}/api/v1/administrators/signup`;
  try {
    const response = await axios.post(admin_signup_url, body, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (response) {
      console.log("AdministratorSignUp: ", response.data);
      return response.data;
    }
  } catch (err) {
    console.log(err);
  }
};

export const administratorLogin = async (email, password) => {
  const admin_login_url = `${process.env.REACT_APP_BASE_ENDPOINT.toString()}/api/v1/administrators/login`;
  try {
    const response = await axios.post(admin_login_url, { email, password });
    console.log("AdminLogin: ", response.data);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const getAdministratorById = async (token, id) => {
  const get_admin_by_id_url = `${process.env.REACT_APP_BASE_ENDPOINT.toString()}/api/v1/administrators/${id}`;
  try {
    const response = await axios.get(get_admin_by_id_url, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log("GetAdminById: ", response.data);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const deleteAdminById = async (token, id) => {
  const url = `${process.env.REACT_APP_BASE_ENDPOINT.toString()}/api/v1/administrators/${id}`;
  try {
    const response = await axios.delete(url, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log(response.data);
  } catch (err) {
    console.log(err);
  }
};
