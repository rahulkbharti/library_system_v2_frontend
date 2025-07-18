//{{base}}/roles/permissions
import { axiosInstance } from "../axiosInstance";
import { handleApiRequest } from "../apiHandeler";

const permissionApi = {
  getPermissons: async () => {
    return handleApiRequest(() => axiosInstance.get("/roles/permissions"));
  }
};

export default permissionApi;