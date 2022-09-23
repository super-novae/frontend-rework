import axios from "axios";

export const getAllOrganizations = async (token) => {
  const get_all_org_url = `${process.env.REACT_APP_BASE_ENDPOINT.toString()}/api/v1/organization/`;
  try {
    const response = await axios.get(get_all_org_url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("GetAllOrganizations: ", response.data.organizations);
    return response.data.organizations;
  } catch (err) {
    console.log(err);
  }
};

export const getOrganizationById = async (token, id) => {
  const get_org_by_id_url = `${process.env.REACT_APP_BASE_ENDPOINT.toString()}/api/v1/organization/${id}`;
  try {
    const response = await axios.get(get_org_by_id_url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("GetOrganizationById: ", response.data);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const createOrganization = async (token, name) => {
  const create_org_url = `${process.env.REACT_APP_BASE_ENDPOINT.toString()}/api/v1/organization/`;
  try {
    const response = await axios.post(
      create_org_url,
      { name },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("CreateOrganization: ", response.data);
  } catch (err) {
    console.log(err);
  }
};

export const deleteOrganizationById = async (token, id) => {
  const delete_org_url = `${process.env.REACT_APP_BASE_ENDPOINT.toString()}/api/v1/organization/${id}`;
  try {
    const response = await axios.delete(delete_org_url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("DeleteOrganizationById: ", response.data);
  } catch (err) {
    console.log(err);
  }
};

export const updateOrganizationById = async (token, id, name) => {
  const update_org_url = `${process.env.REACT_APP_BASE_ENDPOINT.toString()}/api/v1/organization/${id}`;
  try {
    const response = await axios.put(
      update_org_url,
      { name },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("UpdateOrganizationById: ", response.data);
  } catch (err) {
    console.log(err);
  }
};

export const addAdminToOrganization = async (
  token,
  organizationId,
  adminId
) => {
  const url = `${process.env.REACT_APP_BASE_ENDPOINT.toString()}/api/v1/organization/${organizationId}/administrator`;
  try {
    const response = await axios.post(
      url,
      { administrator_id: adminId },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    console.log("AddAdminToOrganization: ", response.data);
  } catch (err) {
    console.log(err);
  }
};
