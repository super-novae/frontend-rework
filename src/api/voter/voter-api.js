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

export const voterLogin = async (email, password) => {
  const url = `${base_url}/api/v1/voters/login`;
  try {
    const response = await axios.post(url, { email, password });
    console.log("voterLogin: ", response.data);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const resetVoterPassword = async (email) => {
  const url = `${base_url}/api/v1/voters/password_reset`;
  try {
    const response = await axios.post(url, { email });
    console.log("ResetVoterPassword: ", response.data);
  } catch (err) {
    console.log(err);
  }
};

export const getVoterElections = async (token, voterId, organizationId) => {
  const url = `${base_url}/api/v1/voters/${voterId}/organization/${organizationId}/elections`;
  try {
    const response = await axios.get(url, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log("GetVoterElections: ", response.data);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const getElectionCandidatesByElectionId = async (token, electionId) => {
  const url = `${base_url}/api/v1/elections/${electionId}/candidates/`;
  try {
    const response = await axios.get(url, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log("GetElectionCandidatesByElectionId: ", response.data);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const voterCastVotes = async (token, voterId, body) => {
  const url = `${base_url}/api/v1/voters/${voterId}/vote`;
  try {
    const response = await axios.post(url, body, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log("VoterCastVotes: ", response.data);
  } catch (err) {
    console.log(err);
  }
};
