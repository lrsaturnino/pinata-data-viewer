import axios from 'axios';

const BACKEND_URL = 'http://192.168.18.26:5000'; // Replace with your backend URL

export const fetchLatestCIDs = async () => {
  try {
    const response = await axios.get(`${BACKEND_URL}/api/latest-cids`);
    return response.data;
  } catch (error) {
    console.error('Error fetching latest CIDs:', error);
    throw error;
  }
};

export const fetchPinataData = async (cid) => {
  try {
    const response = await axios.get(`https://blush-mad-ox-324.mypinata.cloud/ipfs/${cid}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching data from Pinata:', error);
    throw error;
  }
};