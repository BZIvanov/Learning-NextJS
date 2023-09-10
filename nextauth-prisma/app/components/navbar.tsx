'use client';

import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { signOut } from 'next-auth/react';

export default function Navbar() {
  const { data: session } = useSession();

  const handleSignOut = async () => {
    await signOut({ callbackUrl: 'http://localhost:3000' });
  };

  return (
    <nav style={{ margin: '30px' }}>
      <ul style={{ display: 'flex', justifyContent: 'space-evenly' }}>
        <li style={{ backgroundColor: 'orange', padding: '10px' }}>
          <Link href='/'>Home</Link>
        </li>
        <li style={{ backgroundColor: 'orange', padding: '10px' }}>
          <Link href='/client'>Client Page</Link>
        </li>
        <li style={{ backgroundColor: 'orange', padding: '10px' }}>
          <Link href='/middleware'>Middleware Page</Link>
        </li>
        <li style={{ backgroundColor: 'orange', padding: '10px' }}>
          <Link href='/session'>Session Page</Link>
        </li>
        {!session ? (
          <>
            <li style={{ backgroundColor: 'orange', padding: '10px' }}>
              <Link href='/signup'>Sign Up</Link>
            </li>
            <li style={{ backgroundColor: 'orange', padding: '10px' }}>
              <Link href='/api/auth/signin'>Sign In</Link>
            </li>
          </>
        ) : (
          <li
            style={{
              backgroundColor: 'orange',
              padding: '10px',
              cursor: 'pointer',
            }}
            onClick={handleSignOut}
          >
            Sign Out
          </li>
        )}
      </ul>
    </nav>
  );
}
