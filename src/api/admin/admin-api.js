import axios from "axios";

export const getAdminOrganization = async (token, adminId) => {
  const url = `${process.env.REACT_APP_BASE_ENDPOINT.toString()}/api/v1/administrators/${adminId}/org`;
  try {
    const response = await axios.get(url, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log("GetAdminOrg: ", response.data);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};
