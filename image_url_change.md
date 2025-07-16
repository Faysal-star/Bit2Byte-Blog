# Image URL Transformation Changes

This document tracks all the changes made to implement the global image URL transformation utility for the server migration. The transformation adds `/b2b/` before `/public/` in image URLs when not already present.

## Created Utility

### `lib/utils.ts`
- **Added**: `transformImageUrl()` function
- **Purpose**: Transforms image URLs to include `/b2b/` path before `/public/` if not already present
- **Features**:
  - Handles null/undefined URLs (returns fallback image)
  - Checks if `/b2b/public/` already exists (returns as-is)
  - Transforms `/public/` to `/b2b/public/`
  - Handles relative `public/` paths
  - Preserves external URLs and local asset paths

## Modified Files

### 1. `components/blogs/BlogCard.tsx`
- **Changes**:
  - Imported `transformImageUrl` from `@/lib/utils`
  - Applied transformation to `blog.image` (line 43)
  - Applied transformation to `blog.author_image` (line 62)
- **Impact**: Blog card images and author avatars now use transformed URLs

### 2. `app/pub/blogpost/[slug]/page.tsx`
- **Changes**:
  - Imported `transformImageUrl` from `@/lib/utils`
  - Applied transformation to `data.image` (blog header image, line 155)
  - Modified `convertHtmlToNextImage()` function to transform image URLs in HTML content (line 102)
- **Impact**: Blog post header images and embedded content images now use transformed URLs

### 3. `components/ui/hover-card-with-image.tsx`
- **Changes**:
  - Imported `transformImageUrl` from `@/lib/utils`
  - Applied transformation to `item.image` (line 50)
- **Impact**: Hover card images now use transformed URLs

### 4. `app/pub/events/page.tsx`
- **Changes**:
  - Imported `transformImageUrl` from `@/lib/utils`
  - Applied transformation to `event.image` (line 291)
- **Impact**: Event listing page images now use transformed URLs

### 5. `app/pub/event/[slug]/page.tsx`
- **Changes**:
  - Imported `transformImageUrl` from `@/lib/utils`
  - Applied transformation to `event.image` (hero image, line 174)
  - Applied transformation to `item.image` in event gallery carousel (line 275)
- **Impact**: Individual event page images and gallery images now use transformed URLs

### 6. `components/about/CorouselImage.tsx`
- **Changes**:
  - Imported `transformImageUrl` from `@/lib/utils`
  - Applied transformation to carousel image sources (line 35)
- **Impact**: About page carousel images now use transformed URLs

## Migration Strategy

The implemented solution provides a smooth migration path:

1. **Current State**: All image URLs are transformed to include `/b2b/` path
2. **Future State**: When backend responses already include `/b2b/`, the utility will detect this and return URLs unchanged
3. **Rollback**: The utility can be easily disabled by updating the function to return URLs unchanged

## Testing

After implementation, verify that:
- [ ] Blog card images load correctly
- [ ] Blog post header images load correctly
- [ ] Blog content embedded images load correctly
- [ ] Event listing images load correctly
- [ ] Individual event page images load correctly
- [ ] Event gallery images load correctly
- [ ] Author avatar images load correctly
- [ ] About page carousel images load correctly

## Usage Pattern

```typescript
import { transformImageUrl } from "@/lib/utils";

// Transform any image URL
const safeImageUrl = transformImageUrl(originalImageUrl);

// Use with Next.js Image component
<Image src={transformImageUrl(imageUrl)} alt="..." />
```

## Notes

- The utility handles both absolute and relative URLs
- Fallback image is provided for null/undefined URLs
- External URLs (not containing `/public/`) are preserved unchanged
- Local asset paths (starting with `/` but not containing `/public/`) are preserved unchanged 