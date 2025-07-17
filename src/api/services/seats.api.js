import { axiosInstance } from "../axiosInstance";

const seatApi = {
   getSeats : async ()=>{
     return axiosInstance.get("/library-management/seats");
   }
}

export default seatApi;