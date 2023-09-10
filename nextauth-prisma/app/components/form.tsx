'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Form() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setLoading(true);
        fetch('/api/auth/signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: e.currentTarget.email.value,
            password: e.currentTarget.password.value,
          }),
        }).then(async (res) => {
          setLoading(false);
          if (res.status === 200) {
            router.push('/api/auth/signin');
          } else {
            const { error } = await res.json();
            console.log(error);
          }
        });
      }}
      style={{ display: 'flex', flexDirection: 'column', padding: '8px' }}
    >
      <div>
        <label htmlFor='email'>Email Address</label>
        <input
          id='email'
          name='email'
          type='email'
          placeholder='somename@mail.com'
          autoComplete='email'
          required={true}
          style={{ paddingBlock: '8px', width: '100%' }}
        />
      </div>
      <div>
        <label htmlFor='password'>Password</label>
        <input
          id='password'
          name='password'
          type='password'
          required={true}
          style={{ paddingBlock: '8px', width: '100%' }}
        />
      </div>
      <button style={{ paddingBlock: '18px' }} disabled={loading}>
        {loading ? 'Loading' : 'Sign Up'}
      </button>

      <p>
        Already have an account?{' '}
        <Link href='/api/auth/signin' style={{ fontWeight: 'bolder' }}>
          Sign in
        </Link>{' '}
        instead.
      </p>
    </form>
  );
}
