import { axiosInstance } from "../axiosInstance"
const studentApi = {
  getStudents: async () => {
     return await axiosInstance.get("/users/student");
  }

}

export default studentApi;