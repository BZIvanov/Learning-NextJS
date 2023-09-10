import { getServerSession } from 'next-auth/next';
import { redirect } from 'next/navigation';
import { authOptions } from '../../api/auth/[...nextauth]/route';

export default async function Session() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/api/auth/signin?callbackUrl=/session');
  }

  return (
    <div style={{ textAlign: 'center' }}>
      <p>Hello {session?.user?.name}</p>
      <p>This page is protected by checking the session on the server.</p>
      <p>
        In case the user is not logged in, a form with signing methods will be
        displayed.
      </p>
    </div>
  );
}
