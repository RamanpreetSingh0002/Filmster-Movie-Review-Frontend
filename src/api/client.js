import axios from "axios";

// http://localhost:8000/api ---> instead of this use live server link after deploying
const client = axios.create({
  baseURL: "https://filmster-movie-review-backend.onrender.com/api",
});

export default client;
