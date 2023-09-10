import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../api/auth/[...nextauth]/route';

export default async function Middleware() {
  const session = await getServerSession(authOptions);

  return (
    <div style={{ textAlign: 'center' }}>
      <p>Hello {session?.user?.name}</p>
      <p>This page is protected by the global middleware in the root folder.</p>
      <p>
        In case the user is not logged in, a form with signing methods will be
        displayed.
      </p>
    </div>
  );
}
