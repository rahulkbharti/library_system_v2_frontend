import { axiosInstance } from "../axiosInstance";
import { handleApiRequest } from "../apiHandeler";

const groupPermissionApi = {
    getGroupPermissions: async () => {
        return handleApiRequest(() => axiosInstance.get("/roles/group-permissions"));
    },
    updateGroupPermission: async (data) => {
        return handleApiRequest(() => axiosInstance.put(`/roles/group-permissions`, data));
    },
};

export default groupPermissionApi;
