interface User {
  id: string;
  name: string;
  role: string;
  image?: string;
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
  error: string | null;
}
