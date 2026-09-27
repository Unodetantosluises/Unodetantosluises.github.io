/**
 * src/data/blogPosts.js
 * 
 * Módulo de datos para publicaciones del blog.
 * Conectado directamente con el motor Headless CMS (src/utils/contentResolver.js).
 * Se han eliminado los placeholders y datos mock de prueba.
 */

import { getBlogPosts, getBlogPostBySlug } from '../utils/contentResolver';

export const BLOG_POSTS = getBlogPosts();
export const getRecentBlogPosts = (limit = 3) => getBlogPosts().slice(0, limit);
export { getBlogPostBySlug };
export default BLOG_POSTS;
