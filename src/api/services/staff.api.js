import { axiosInstance } from "../axiosInstance";
import { handleApiRequest } from "../apiHandeler";

const staffApi = {
  getStaffs: async () => {
    return handleApiRequest(() => axiosInstance.get("/users/staff"));
  },
  addStaff: async (staffData) => {
    return handleApiRequest(() =>
      axiosInstance.post("/users/staff", staffData)
    );
  },
  editStaff: async (staffData) => {
    return handleApiRequest(() => axiosInstance.put("/users/staff", staffData));
  },
  deleteStaff: async (staff_id) => {
    return handleApiRequest(() =>
      axiosInstance.delete(`/users/staff?id=${staff_id}`)
    );
  },
};

export default staffApi;
