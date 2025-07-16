import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Transforms image URLs to include /b2b/ path before /public/ if not already present
 * This is a migration utility for server migration
 * @param imageUrl - The original image URL
 * @returns Transformed image URL with /b2b/ path
 */
export function transformImageUrl(imageUrl: string | undefined | null): string {
  // Return fallback image if URL is empty or null
  if (!imageUrl) {
    return "/images/blogimg.jpg";
  }

  // If it's already a local path (starts with /), return as is
  if (imageUrl.startsWith('/') && !imageUrl.includes('/public/')) {
    return imageUrl;
  }

  // If URL already contains /b2b/public/, return as is
  if (imageUrl.includes('/b2b/public/')) {
    return imageUrl;
  }

  // If URL contains /public/ but not /b2b/, add /b2b/ before /public/
  if (imageUrl.includes('/public/')) {
    return imageUrl.replace('/public/', '/b2b/public/');
  }

  // If it's a relative public path, make it absolute with b2b
  if (imageUrl.startsWith('public/')) {
    return `/${imageUrl.replace('public/', 'b2b/public/')}`;
  }

  // For any other case, return as is (might be external URL)
  return imageUrl;
}
