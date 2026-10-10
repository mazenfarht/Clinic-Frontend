// src/lib/authStorage.ts
// Single place that knows HOW and WHERE the session is stored.

const ACCESS_KEY = "clinic_token";
const REFRESH_KEY = "clinic_refresh_token";
const USER_KEY = "clinic_user";

// The cookie is only a "has a session" flag for middleware.ts (the real
// authentication is the JWT). It must live as long as the REFRESH token
// (JWT_REFRESH_EXPIRES_IN = 30d), otherwise the middleware would kick the user
// out while the refresh token could still renew the session.
const COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 30;

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

function setTokenCookie(accessToken: string) {
  document.cookie = `${ACCESS_KEY}=${accessToken}; path=/; max-age=${COOKIE_MAX_AGE_SECONDS}; SameSite=Lax`;
}

export function getAccessToken(): string | null {
  return localStorage.getItem(ACCESS_KEY);
}

export function getRefreshToken(): string | null {
  return localStorage.getItem(REFRESH_KEY);
}

// Used after a token refresh: updates tokens + cookie, keeps the saved user.
export function saveTokens(tokens: AuthTokens) {
  localStorage.setItem(ACCESS_KEY, tokens.accessToken);
  localStorage.setItem(REFRESH_KEY, tokens.refreshToken);
  setTokenCookie(tokens.accessToken);
}

// Used after login: tokens + user.
export function saveSession(tokens: AuthTokens, user: unknown) {
  saveTokens(tokens);
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

// Used on logout / failed refresh: removes EVERYTHING.
export function clearSession() {
  localStorage.removeItem(ACCESS_KEY);
  localStorage.removeItem(REFRESH_KEY);
  localStorage.removeItem(USER_KEY);
  document.cookie = `${ACCESS_KEY}=; path=/; max-age=0; SameSite=Lax`;
}
