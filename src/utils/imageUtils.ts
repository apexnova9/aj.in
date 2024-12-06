const BASE_URL = import.meta.env.BASE_URL;

export const getImageUrl = (imagePath: string | null): string => {
  if (!imagePath) return '';
  
  // If the path already starts with http/https, return as is
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }

  // If the path starts with /uploads, append it to API_URL
  if (imagePath.startsWith('/uploads/')) {
    return `${BASE_URL}${imagePath}`;
  }

  // If the path doesn't start with /uploads, add it
  return `${BASE_URL}/uploads/${imagePath}`;
};
