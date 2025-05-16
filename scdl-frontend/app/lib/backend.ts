const BACKEND_URL = "http://localhost:8000";

export const downloadSoundCloudTrack = async (url: string) => {
  return fetch(`${BACKEND_URL}/download/${url}`);
};
