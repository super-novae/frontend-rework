import axios from "axios";

const base_url = `${process.env.REACT_APP_BASE_ENDPOINT.toString()}`;

export const getResults = async () => {
  const url = `${base_url}/api/v1/data`;
  try {
    const response = await axios.get(url);
    console.log("GetResults: ", response.data);
    return response;
  } catch (err) {
    console.log(err);
  }
};