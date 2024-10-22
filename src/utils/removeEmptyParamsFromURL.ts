import { universalState } from "..";

export function removeEmptyParamsFromURL(url: string): string {
    try {
        const parsedUrl = new URL(url, universalState.endpoint);
        const params = new URLSearchParams(parsedUrl.search);

        for (const [key, value] of params) {
            if (value === '') {
                params.delete(key);
            }
        }

        const cleanedPathname = parsedUrl.pathname || '/'; // Default to '/' if pathname is empty
        const cleanedSearch = params.toString() ? `?${params.toString()}` : ''; // Only add '?' if there are params

        return `${parsedUrl.protocol}//${parsedUrl.host}${cleanedPathname}${cleanedSearch}`;
    } catch (error) {
        console.error("Invalid URL provided:", error);
        return '';
    }
}
