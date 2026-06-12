import { environment } from '../config/environment';



export async function fetchWithTimeout(url: string, options?: RequestInit): Promise<Response> {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), environment.apiTimeout);
    try {
        const response = await fetch(url, { ...options, signal: controller.signal });
        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }
        return response;

    } finally {
        clearTimeout(timeout);
    }
}