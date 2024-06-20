import { jwtVerify } from 'jose';

const secretKey = new TextEncoder().encode(process.env.REACT_APP_SECRET_KEY);

export async function isAuthenticated(token) {
  if (typeof token !== 'string' && !(token instanceof Uint8Array)) {
    console.error('Token must be a string or Uint8Array');
    return false;
  }

  try {
    const { payload } = await jwtVerify(token, secretKey);
    const currentTimestamp = Math.floor(Date.now() / 1000);
    return payload.exp > currentTimestamp;
  } catch (error) {
    console.error('Error verifying token:', error);
    return false;
  }
}

export function setToken(token) {
  localStorage.setItem('jwt', token);
}

export function getToken() {
  return localStorage.getItem('jwt');
}

export function removeToken() {
  localStorage.removeItem('jwt');
}
