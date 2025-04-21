// api/journal.js
import axios from 'axios';

const API_URL = 'http://localhost:8081/journal/user';

export const getJournals = async (token) => {
  const res = await axios.get(API_URL, {
    headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}
  });
  localStorage.setItem("token", res.data.token);
  console.log(res.data);
  return res.data;
};
