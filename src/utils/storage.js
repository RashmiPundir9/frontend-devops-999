// storage.js

const STORAGE_KEYS = {
  TOKEN: "auth_token",
  USER: "auth_user",
  REMEMBER: "auth_remember",
};



// =============================
// TOKEN
// =============================

export const getAuthToken = () => {
  return localStorage.getItem(STORAGE_KEYS.TOKEN);
};

export const setAuthToken = (token) => {
  if (!token) return;
  localStorage.setItem(STORAGE_KEYS.TOKEN, token);
};

export const removeAuthToken = () => {
  localStorage.removeItem(STORAGE_KEYS.TOKEN);
};



// =============================
// USER
// =============================

export const getUser = () => {
  try {
    const user = localStorage.getItem(STORAGE_KEYS.USER);
    return user ? JSON.parse(user) : null;
  } catch {
    return null;
  }
};

export const setUser = (user) => {
  if (!user) return;
  localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
};

export const removeUser = () => {
  localStorage.removeItem(STORAGE_KEYS.USER);
};



// =============================
// REMEMBER ME
// =============================

export const getRememberMe = () => {
  return localStorage.getItem(STORAGE_KEYS.REMEMBER) === "true";
};

export const setRememberMe = (remember) => {
  localStorage.setItem(STORAGE_KEYS.REMEMBER, remember ? "true" : "false");
};

export const removeRememberMe = () => {
  localStorage.removeItem(STORAGE_KEYS.REMEMBER);
};



// =============================
// SET FULL AUTH DATA (LOGIN)
// =============================

export const setAuthData = ({ token, user, remember }) => {
  setAuthToken(token);
  setUser(user);
  setRememberMe(remember);
};



// =============================
// CLEAR AUTH DATA (LOGOUT)
// =============================

export const clearAuthData = () => {
  removeAuthToken();
  removeUser();
  removeRememberMe();
};



// =============================
// AUTH STATUS
// =============================

export const isAuthenticated = () => {
  return !!getAuthToken();
};



// =============================
// AUTH HEADER (for axios)
// =============================

export const getAuthHeader = () => {
  const token = getAuthToken();

  if (!token) return {};

  return {
    Authorization: `Bearer ${token}`,
  };
};
