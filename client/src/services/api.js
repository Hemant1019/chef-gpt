const BASE_URL = process.env.REACT_APP_API_URL;

// Example usage:
fetch(`${BASE_URL}/auth/login`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ email, password }),
});
