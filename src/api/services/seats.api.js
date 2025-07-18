import { axiosInstance } from "../axiosInstance";
import { handleApiRequest } from "../apiHandeler";

const seatApi = {
  getSeats: async () => {
    return handleApiRequest(() => axiosInstance.get("/library-management/seats"));
  },
};

export default seatApi;