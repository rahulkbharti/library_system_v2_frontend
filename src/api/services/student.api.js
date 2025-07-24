import { axiosInstance } from "../axiosInstance";
import { handleApiRequest } from "../apiHandeler";

const studentApi = {
  getStudents: async () => {
    return handleApiRequest(() => axiosInstance.get("/users/student"));
  },
  addStudent: async (studentData) => {
    return handleApiRequest(() =>
      axiosInstance.post("/users/student", studentData)
    );
  },
  editStudent: async (studentData) => {
    return handleApiRequest(() =>
      axiosInstance.put(`/users/student`, studentData)
    );
  },
  deleteStudent: async (student_id) => {
    return handleApiRequest(() =>
      axiosInstance.delete(`/users/student?id=${student_id}`)
    );
  },
};

export default studentApi;
