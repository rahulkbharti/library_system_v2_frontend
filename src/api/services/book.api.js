import { axiosInstance } from "../axiosInstance"
import { handleApiRequest } from "../apiHandeler";
const bookApi = {
   getBooks: async () => {
      return handleApiRequest(() => axiosInstance.get("/library-management/book"));
   },
   
}

export default bookApi;