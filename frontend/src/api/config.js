export const API_BASE = 'http://localhost:8080';
export async function apiFetch(path, options = {}){
    return fetch(`${API_BASE}${path}`, { credentials: 'include', ...options });
}