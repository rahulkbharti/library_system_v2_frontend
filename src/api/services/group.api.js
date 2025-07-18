import { axiosInstance } from "../axiosInstance";
import { handleApiRequest } from "../apiHandeler";

const groupApi = {
  getGroups: async () => {
    return handleApiRequest(() => axiosInstance.get("/roles/groups"));
  }
};

export default groupApi;