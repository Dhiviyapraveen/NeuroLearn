import { useState, useEffect, useCallback } from 'react';

interface User {
  name: string;
  email: string;
  token: string;
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('neuro_token');
    const name = localStorage.getItem('neuro_user_name');
    const email = localStorage.getItem('neuro_user_email');
    if (token && name && email) {
      setUser({ name, email, token });
    }
    setIsLoading(false);
  }, []);

  const login = useCallback((name: string, email: string, token: string) => {
    localStorage.setItem('neuro_token', token);
    localStorage.setItem('neuro_user_name', name);
    localStorage.setItem('neuro_user_email', email);
    setUser({ name, email, token });
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('neuro_token');
    localStorage.removeItem('neuro_user_name');
    localStorage.removeItem('neuro_user_email');
    setUser(null);
  }, []);

  return { user, isLoading, login, logout };
}
