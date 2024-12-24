import { AuthCredentialsDto } from '../types/auth';

const API_URL = 'http://localhost:3001';

export async function signIn(credentials: AuthCredentialsDto) {
  const response = await fetch(`${API_URL}/auth/signin`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to sign in');
  }

  return response.json();
}
export async function signUp(credentials: AuthCredentialsDto) {
  const response = await fetch(`${API_URL}/auth/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });
  if (response.status === 201) {
    console.log('Sign Up Successful');
    return {} ; 
  }
  if (!response.ok) {
    const error = await response.json();    
    throw new Error(error.message || 'Failed to sign up');
  }

  return response.json();
}