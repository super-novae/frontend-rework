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
