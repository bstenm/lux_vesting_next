// @ts-nocheck
import { cert } from 'firebase-admin/app';
import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { FirestoreAdapter } from '@auth/firebase-adapter';

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
        })
    ],
    adapter: FirestoreAdapter({
        credential: cert({
            projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID as string,
            privateKey: process.env.FIREBASE_PRIVATE_KEY as string,
            clientEmail: process.env.FIREBASE_CLIENT_EMAIL as string
        })
    }),
    callbacks: {
        async signIn({ account, profile }) {
            console.log('ACCOUNT', account);
            console.log('PROFILE', profile);
            return true;
        }
    }
});

export { handler as GET, handler as POST };
