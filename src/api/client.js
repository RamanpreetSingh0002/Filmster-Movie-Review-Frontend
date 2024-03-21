import axios from "axios";

// http://localhost:8000/api ---> instead of this use live server link after deploying
const client = axios.create({
  baseURL: "https://filmster-backend.netlify.app/api",
});

export default client;
