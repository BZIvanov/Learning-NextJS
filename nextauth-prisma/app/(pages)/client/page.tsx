'use client';

// AuthProvider will give us access to the session
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

export default function Client() {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect('/api/auth/signin?callbackUrl=/client');
    },
  });

  return (
    <div style={{ textAlign: 'center' }}>
      <p>Hello {session?.user?.name}</p>
      <p>This page is protected by checking the session on the client.</p>
      <p>
        In case the user is not logged in, a form with signing methods will be
        displayed.
      </p>
    </div>
  );
}
