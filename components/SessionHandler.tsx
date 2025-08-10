'use client';
import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import axios from 'axios';
import { PROJECT_ID } from '@/app/appwrite'; // Asume que exportas PROJECT_ID
//import { publicRoutes } from '@/app/middleware';
const publicRoutes = ['/login', '/signup', '/'];
export function SessionHandler() {
  const router = useRouter();
  const pathname = usePathname();
  const cookieName = `a_session_${PROJECT_ID}`;

  useEffect(() => {
    // Optimización 1: Saltar si ruta es API o estática (evitar llamadas innecesarias)
    if (pathname.startsWith('/api/') || pathname.startsWith('/_next/') || pathname.endsWith('.png')) {
      return;
    }

    // Optimización 3: Solo ejecutar en desarrollo (en producción, cookies funcionan sin localStorage)
    if (process.env.NODE_ENV !== 'development') {
      return;
    }

    const restoreSession = async () => {
      const cookieFallback = localStorage.getItem('cookieFallback');
      if (cookieFallback) {
        try {
          const parsed = JSON.parse(cookieFallback);
          const secret = parsed[cookieName];
          if (secret) {
            const res = await axios.post('/api/restore-session', { secret });
            console.log(res);
            if (res.status === 200 && res.data.ok) {
              console.log('Session restored with HttpOnly cookie');
              // Redirigir si ruta es pública y hay usuario
              if (publicRoutes.includes(pathname) && res.data.user) {
                router.replace('/dashboard'); // replace para evitar loop en back button
              }
            } else {
              console.warn('Could not restore session');
            }
          }
        } catch (err: any) {
          console.error('Error restoring session:', err);
          if (err.response?.status === 401) {
            localStorage.removeItem('cookieFallback');
            router.push('/login');
          }
        }
      }
    };
    restoreSession();
  }, [router, pathname]);

  return null;
}