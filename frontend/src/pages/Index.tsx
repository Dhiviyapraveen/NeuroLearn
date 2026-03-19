import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Index() {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem('neuro_token');
    navigate(token ? '/dashboard' : '/auth');
  }, [navigate]);
  return null;
}
