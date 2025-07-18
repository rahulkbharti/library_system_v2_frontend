
export const handleApiRequest = async (apiCall) => {
  try {
    const response = await apiCall();
    return response.data;
  } catch (error) {
    console.error(
      "API Error:",
      error.response ? error.response.data : error.message
    );
    const message = error.response?.data?.message || "An unexpected error occurred. Please try again.";
    return { error: true, message: message };
  }
};