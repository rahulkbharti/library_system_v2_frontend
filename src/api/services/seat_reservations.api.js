import { axiosInstance } from "../axiosInstance"
import { handleApiRequest } from "../apiHandeler";
const seatReservations = {
   getReservedSeats: async () => {
      return handleApiRequest(() => axiosInstance.get("/library-management/book"));
   },
   
}

export default seatReservations;