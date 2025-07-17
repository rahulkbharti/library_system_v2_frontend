import { axiosInstance } from "../axiosInstance"
const bookApi = {
  getBooks: async () => {
     return await axiosInstance.get("/library-management/book");
  }

}

export default bookApi;