import { API_BASE } from './config';

export async function getCurrentUser() {
    const response = await fetch(`${API_BASE}/users/me`, {
        credentials: 'include'
    });
    if (response.status === 401 || response.status === 403) {
        return null;                       // not logged in
    }
    if (!response.ok) {
        throw new Error(`Failed to load profile: ${response.status}`);
    }
    const result = await response.json();
    return result.user;
}

export async function updateCurrentUser(payload) {
    const response = await fetch(`${API_BASE}/users/me`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(payload)
    });
    if (!response.ok) {
        throw new Error(await response.text() || 'Profile update failed');
    }
    const result = await response.json();
    return result.user;
}

export async function logout() {
    await fetch(`${API_BASE}/users/logout`, {
        method: 'POST',
        credentials: 'include'
    });
}