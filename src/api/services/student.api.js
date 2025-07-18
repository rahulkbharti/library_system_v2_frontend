import { axiosInstance } from "../axiosInstance";
import { handleApiRequest } from "../apiHandeler";

const studentApi = {
  getStudents: async () => {
    return handleApiRequest(() => axiosInstance.get("/users/student"));
  }
};

export default studentApi;