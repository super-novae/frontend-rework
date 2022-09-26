import axios from "axios";

const base_url = `${process.env.REACT_APP_BASE_ENDPOINT.toString()}`;

export const getAllVotersInOrganization = async (token, orgId) => {
  const url = `${base_url}/api/v1/voters/?organization_id=${orgId}`;
  try {
    const response = await axios.get(url, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log("GetAllVotersInOrganization: ", response.data);
    return response.data.voters;
  } catch (err) {
    console.log(err);
  }
};
//voterLogin
export const voterLogin = async (body) => {
  const url =`${base_url}/api/v1/voters/login`
  try {
    const response = await axios.post(url, body);
    console.log("voterLogin: ", response.data);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};
 // voterSignUp
export const voterSignUp = async (body) => {
  const url =`${base_url}/api/v1/voters/signup`
  try {
    const response = await axios.post(url, body);
    console.log("voterSignUp: ", response.data);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};
//getSingleVoter
export const getVoterById = async (voterId) => {
  const url =`${base_url}/api/v1/voters/?voter_id=${voterId}`
  try {
    const response = await axios.get(url);
    console.log("getVoterById: ", response.data);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};
//getVoterElections
export const getVoterElectionsById = async (voterId) => {
  const url =`${base_url}/api/v1/voters/?voter_id=${voterId}/elections`
  try {
    const response = await axios.get(url);
    console.log("getVoterElectionsById: ", response.data);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};
