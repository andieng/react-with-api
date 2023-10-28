import "dotenv/config";

export const UNSPLASH_ACCESS_KEY = process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY;
export const UNSPLASH_AUTH_HEADER = `Client-ID ${UNSPLASH_ACCESS_KEY}`;
export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
export const GET_URL = `${BASE_URL}/photos`;
export const SEARCH_URL = `${BASE_URL}/search/photos`;
