import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { compare } from "bcrypt";
import prismadb from "@/app/lib/prismadb";

export const authOptions: AuthOptions = {
   callbacks: {
      async jwt({ token, user }) {
         if (user) {
            token.id = user.id;
         }
         return token;
      },
      async session({ session, token }) {
         if (session.user) {
            (session.user as any).id = token.id as string;
         }
         return session;
      },
      async redirect({ url, baseUrl }) {
         if (url.startsWith(baseUrl)) return url;
         else if (url.startsWith("/")) return new URL(url, baseUrl).toString();
         return baseUrl;
      },
   },
   providers: [
      GoogleProvider({
         clientId: process.env.GOOGLE_CLIENT_ID || '',
         clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
      }),
      CredentialsProvider({
         name: "Credentials",
         credentials: {
            email: { label: "Email", type: "text" },
            password: { label: "Password", type: "password" },
         },
         async authorize(credentials) {
            if (!credentials?.email || !credentials?.password) {
               throw new Error("Email and password are required");
            }

            const user = await prismadb.user.findUnique({
               where: { email: credentials.email },
            });

            if (!user || !user.hashedPassword) {
               throw new Error("Invalid email or password");
            }

            const passwordsMatch = await compare(credentials.password, user.hashedPassword);

            if (!passwordsMatch) {
               throw new Error("Incorrect password");
            }

            return user;
         },
      }),
   ],
   pages: {
      signIn: "/login",
   },
   debug: process.env.NODE_ENV === "development",
   adapter: PrismaAdapter(prismadb),
   session: {
      strategy: "jwt",
   },
   jwt: {
      secret: process.env.NEXTAUTH_JWT_SECRET,
   },
   secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };