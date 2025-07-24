import { axiosInstance } from "../axiosInstance";
import { handleApiRequest } from "../apiHandeler";

const organizationApi = {
  getOrganizations: async (created_by_admin) => {
    if (created_by_admin) {
      console.log("Fetching organizations for admin ID:", created_by_admin);
      return handleApiRequest(() =>
        axiosInstance.get("/organizations", {
          params: { id: created_by_admin },
        })
      );
    }
    return handleApiRequest(() => axiosInstance.get("/organizations"));
  },
  addOrganization: async (organizationData) => {
    return handleApiRequest(() =>
      axiosInstance.post("/organizations", organizationData)
    );
  },
  editOrganization: async (organizationData) => {
    return handleApiRequest(() =>
      axiosInstance.put("/organizations", organizationData)
    );
  },
  deleteOrganization: async (organization_id) => {
    return handleApiRequest(() =>
      axiosInstance.delete(`/organizations?id=${organization_id}`)
    );
  },
};

export default organizationApi;
