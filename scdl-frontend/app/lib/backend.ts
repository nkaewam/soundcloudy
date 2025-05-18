const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const downloadSoundCloudTrack = async (url: string) => {
  return fetch(`${BACKEND_URL}/download/${url}`);
};
