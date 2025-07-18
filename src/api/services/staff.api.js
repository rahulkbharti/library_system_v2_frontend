import { axiosInstance } from "../axiosInstance";
import { handleApiRequest } from "../apiHandeler";

const staffApi = {
  getStaffs: async () => {
    return handleApiRequest(() => axiosInstance.get("/users/staff"));
  }
};

export default staffApi;