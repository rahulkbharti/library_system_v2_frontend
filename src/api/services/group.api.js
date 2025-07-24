import { axiosInstance } from "../axiosInstance";
import { handleApiRequest } from "../apiHandeler";

const groupApi = {
  getGroups: async () => {
    return handleApiRequest(() => axiosInstance.get("/roles/groups"));
  },
  addGroup: async (groupData) => {
    return handleApiRequest(() =>
      axiosInstance.post("/roles/groups", groupData)
    );
  },
  editGroup: async (groupData) => {
    return handleApiRequest(() =>
      axiosInstance.put(`/roles/groups`, groupData)
    );
  },
  deleteGroup: async (group_id) => {
    return handleApiRequest(() =>
      axiosInstance.delete(`/roles/groups?id=${group_id}`)
    );
  },
};

export default groupApi;
