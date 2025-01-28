import { jwtDecode } from "jwt-decode";

const isTokenExpired = (token) => {
  try {
    const { exp } = jwtDecode(token); // Decode the JWT token
    if (Date.now() >= exp * 1000) {
      return true;
    }
    return false;
  } catch (error) {
    console.error(error);
    return true; // Consider token invalid if decoding fails
  }
};

export default isTokenExpired;
