export const handleApiRequest = async (apiCall) => {
  try {
    const response = await apiCall();
    return response.data;
  } catch (error) {
    if (error.status === 404) {
      console.log("Resource not found:", error);
      return [];
    }
    console.error("API Error:", error);
    const message =
      error.response?.data?.error ||
      "An unexpected error occurred. Please try again.";
    // alert(message);
    return { error: true, message: message };
  }
};
