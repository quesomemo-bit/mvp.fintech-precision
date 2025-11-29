// components/Header.tsx
import { useRouter } from 'next/navigation';

export default function Header() {
  const router = useRouter();
  const userRaw = typeof window !== 'undefined' ? localStorage.getItem('precision_user') : null;
  const user = userRaw ? JSON.parse(userRaw) : { name: 'Invitado' };

  const logout = () => {
    localStorage.removeItem('precision_session');
    localStorage.removeItem('precision_user');
    router.push('/login');
  };

  return (
    <header className="flex items-center justify-between px-6 py-4 border-b bg-white">
      <div className="text-sm text-gray-700">Hola, {user.name}</div>
      <div className="flex items-center gap-3">
        <button onClick={logout} className="text-sm px-3 py-1 border rounded">Cerrar sesión</button>
      </div>
    </header>
  );
}

