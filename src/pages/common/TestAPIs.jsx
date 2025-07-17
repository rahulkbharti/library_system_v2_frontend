import { Button } from "@mui/material";
import { axiosInstance } from "../../api/axiosInstance"; // Ensure this path is correct
const TestAPIs = () => {
  const getDAta = async () => {
    try {
      const result = await axiosInstance.get("http://localhost:3000/library-management/book");
      console.log(result.data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  }
  return (
    <div>
      <h1>Test APIs Page</h1>
      <p>This page is used for testing various APIs.</p>
      <Button onClick={getDAta}>Click Me to Test</Button>
    </div>
  );
}

export default TestAPIs;