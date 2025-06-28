// Utility to handle basePath for GitHub Pages deployment
export const getAssetPath = (path: string): string => {
  // In production (GitHub Pages), add the basePath prefix
  // In development, use the path as-is
  const basePath = process.env.NODE_ENV === 'production' ? '/demo_heroxshorts2' : '';
  
  // Ensure path starts with /
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  
  return `${basePath}${normalizedPath}`;
}; 