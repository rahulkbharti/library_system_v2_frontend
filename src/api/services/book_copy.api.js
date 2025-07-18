import { axiosInstance } from "../axiosInstance"
import { handleApiRequest } from "../apiHandeler";


const bookCopyApi = {
    getBookCopies: async () => {
        return handleApiRequest(() => axiosInstance.get("/library-management/book-copy"));
    },
};

export default bookCopyApi;