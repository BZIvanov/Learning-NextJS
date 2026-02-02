export { default } from 'next-auth/middleware';

// this global middleware will protect all pages matching the following url pattern
export const config = {
  matcher: ['/middleware/:path*'],
};
