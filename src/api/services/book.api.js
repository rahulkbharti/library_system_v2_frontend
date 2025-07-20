import { axiosInstance } from "../axiosInstance"
import { handleApiRequest } from "../apiHandeler";
const bookApi = {
   getBooks: async () => {
      return handleApiRequest(() => axiosInstance.get("/library-management/book"));
   },
   AddBook : async (bookData) => {
      return handleApiRequest(() => axiosInstance.post("/library-management/book", bookData));
   },
   EditBook: async (book_id, bookData) => {
      return handleApiRequest(() => axiosInstance.put(`/library-management/book`, { book_id, update : bookData }));
   },
   DeleteBook: async (book_id) => {
      return handleApiRequest(() => axiosInstance.delete(`/library-management/book?id=${book_id}`));
   },
}

export default bookApi;