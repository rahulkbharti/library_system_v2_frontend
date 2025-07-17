import { axiosInstance } from "../axiosInstance"
const staffApi = {
  getStaffs: async () => {
     return await axiosInstance.get("/users/staff");
  }

}

export default staffApi;