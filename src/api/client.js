import axios from "axios";

// http://localhost:8000/api ---> instead of this use live server link after deploying
const client = axios.create({ baseURL: "http://localhost:8000/api" });

export default client;
