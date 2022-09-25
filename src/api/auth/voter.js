import axios from "axios";

const base_url = process.env.REACT_APP_BASE_ENDPOINT.toString();

export const adminRegisterVoter = async (token, body) => {
  const url = `${base_url}/api/v1/voters/signup`;
  try {
    const response = await axios.post(url, body, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log("AdminRegisterVoter: ", response.data);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};
