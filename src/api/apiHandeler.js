
export const handleApiRequest = async (apiCall) => {
  try {
    const response = await apiCall();
    return response.data;
  } catch (error) {
    console.error(
      "API Error:",
      error
    );
    const message = error.response?.data?.error || "An unexpected error occurred. Please try again.";
    alert(message);
    return { error: true, message: message };
  }
};