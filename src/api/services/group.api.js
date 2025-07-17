import { axiosInstance } from "../axiosInstance"
const groupApi = {
  getGroups: async () => {
     return await axiosInstance.get("/roles/groups");
  }

}

export default groupApi;