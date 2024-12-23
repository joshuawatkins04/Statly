import axios from 'axios';

const spotifyApi = axios.create({
  baseURL: "http://localhost:5000/music/spotify",
  withCredentials: true
});

spotifyApi.interceptors.response.use(
  response => response,
  error => {
    console.error("Spotify API error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export const getSpotifyStatus = async () => {
  try {
    const response = await spotifyApi.get("/status");
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to check Spotify status"
    );
  }
};

export const getSpotifyPlaylists = async () => {
  try {
    const response = await spotifyApi.get("/playlists");
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch Spotify playlists"
    );
  }
};

export const connectToSpotify = () => {
  window.location.href = "http://localhost:5000/music/spotify/auth/spotify";
};