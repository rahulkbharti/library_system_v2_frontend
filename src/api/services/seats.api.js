import { axiosInstance } from "../axiosInstance";
import { handleApiRequest } from "../apiHandeler";

const seatApi = {
  getSeats: async () => {
    return handleApiRequest(() =>
      axiosInstance.get("/library-management/seats")
    );
  },
  addSeat: async (seatData) => {
    return handleApiRequest(() =>
      axiosInstance.post("/library-management/seats", seatData)
    );
  },
  editSeat: async (seatData) => {
    return handleApiRequest(() =>
      axiosInstance.put(`/library-management/seats`, seatData)
    );
  },
  deleteSeat: async (seat_id) => {
    return handleApiRequest(() =>
      axiosInstance.delete(`/library-management/seats?id=${seat_id}`)
    );
  },
};

export default seatApi;
