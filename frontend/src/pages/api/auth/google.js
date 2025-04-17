// pages/api/auth/google.js
import axios from "axios";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    // Log the token being sent to the backend for debugging
    console.log(
      "Forwarding token to backend:",
      req.body.token ? "Token exists" : "No token"
    );
    // Make sure CORS headers are properly set
    console.log(req.body);
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    const response = await axios.post(
      "http://localhost:5050/api/auth/google",
      req.body,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log("Response from backend:", response.data);
    return res.status(response.status).json(response.data);
  } catch (error) {
    console.error("Error details:", error.message);
    if (error.response) {
      console.error("Error response data:", error.response.data);
      console.error("Error response status:", error.response.status);
    }

    const status = error.response?.status || 500;
    const data = error.response?.data || { error: "Internal server error" };
    return res.status(status).json(data);
  }
}
