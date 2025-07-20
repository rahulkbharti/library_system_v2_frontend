import { axiosInstance } from "../axiosInstance";
import { handleApiRequest } from "../apiHandeler";

const bookCopyApi = {
    getBookCopies: async () => {
        return handleApiRequest(() => axiosInstance.get("/library-management/book-copy"));
    },
    addBookCopy: async (copyData) => {
        return handleApiRequest(() => axiosInstance.post("/library-management/book-copy", copyData));
    },
    editBookCopy: async (copy_id, copyData) => {
        return handleApiRequest(() => axiosInstance.put(`/library-management/book-copy`, { copy_id, update: copyData }));
    },
    deleteBookCopy: async (copy_id) => {
        return handleApiRequest(() => axiosInstance.delete(`/library-management/book-copy?id=${copy_id}`));
    },
};

export default bookCopyApi;