import { options } from '@/constants/auth';
import NextAuth from 'next-auth/next';

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const handler = NextAuth(options);

export { handler as GET, handler as POST };
