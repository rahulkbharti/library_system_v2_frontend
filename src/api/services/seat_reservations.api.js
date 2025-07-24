import { axiosInstance } from "../axiosInstance";
import { handleApiRequest } from "../apiHandeler";

const seatReservationApi = {
  getReservations: async () => {
    return handleApiRequest(() =>
      axiosInstance.get("/library-management/seats-reservations")
    );
  },
  addReservation: async (reservationData) => {
    return handleApiRequest(() =>
      axiosInstance.post(
        "/library-management/seats-reservations",
        reservationData
      )
    );
  },
  editReservation: async (reservationData) => {
    return handleApiRequest(() =>
      axiosInstance.put(
        "/library-management/seats-reservations",
        reservationData
      )
    );
  },
  deleteReservation: async (reservation_id) => {
    return handleApiRequest(() =>
      axiosInstance.delete(
        `/library-management/seats-reservations?id=${reservation_id}`
      )
    );
  },
};

export default seatReservationApi;
