export interface AuthCredentialsDto {
  email: string;
  password: string;
}

export interface AuthResponse {
  accessToken: string;
}

export interface AuthContextType {
  user: string | null;
  loading: boolean;
  signIn: (credentials: AuthCredentialsDto) => Promise<void>;
  signUp: (credentials: AuthCredentialsDto) => Promise<void>;
  signOut: () => void;
}