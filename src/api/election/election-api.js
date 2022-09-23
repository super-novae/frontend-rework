import axios from "axios";

const base_url = process.env.REACT_APP_BASE_ENDPOINT.toString();

export const getAllElectionsInOrganization = async (token, orgId) => {
  const url = `${base_url}/api/v1/elections/organization/${orgId}`;
  try {
    const response = await axios.get(url, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log("GetAllElectionsInOrganization: ", response.data.elections);
    return response.data.elections;
  } catch (err) {
    console.log(err);
  }
};

export const createElection = async (token, body) => {
  const url = `${base_url}/api/v1/elections/`;
  try {
    const response = await axios.post(url, body, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log("CreateElection: ", response.data);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const deleteElection = async (token, electionId) => {
  const url = `${base_url}/api/v1/elections/${electionId}`;
  try {
    const response = await axios.delete(url, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log("DeleteElection: ", response.data);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const getElectionOffices = async (token, electionId) => {
  const url = `${base_url}/api/v1/elections/${electionId}/office/`;
  try {
    const response = await axios.get(url, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log("GetElectionOffices: ", response.data.offices);
    return response.data.offices;
  } catch (err) {
    console.log(err);
  }
};

export const createElectionOffice = async (token, electionId, body) => {
  const url = `${base_url}/api/v1/elections/${electionId}/office/`;
  try {
    const response = await axios.post(url, body, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log("CreateElectionOffice: ", response.data);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const deleteElectionOffice = async (token, electionId, officeId) => {
  const url = `${base_url}/api/v1/elections/${electionId}/office/${officeId}`;
  try {
    const response = await axios.delete(url, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log("DeleteElectionOffice: ", response.data);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const getCandidatesByOffice = async (token, electionId, officeId) => {
  const url = `${base_url}/api/v1/elections/${electionId}/office/${officeId}/candidates`;
  try {
    const response = await axios.get(url, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log("GetCandidatesByoffice: ", response.data.candidates);
    return response.data.candidates;
  } catch (err) {
    console.log(err);
  }
};
