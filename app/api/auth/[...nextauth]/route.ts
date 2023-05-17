import { prisma } from "@/app/utils/prisma";
import { compare } from "bcryptjs";
import NextAuth from "next-auth";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/authorize/signIn",
  },
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Sign in",
      credentials: {
        Email: {
          label: "Email",
          type: "email",
          placeholder: "example@example.com",
        },
        Password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.Email || !credentials.Password) {
          return null;
        }

        const user = await prisma.applicationUser.findUnique({
          where: {
            Email: credentials.Email,
          },
          include: {
            ApplicationUserMembership: true
          }
        });

        if (!user || !(await compare(credentials.Password, user.ApplicationUserMembership?.Password!))) {
          return null;
        }

        return {
          id: user.Id.toString(),
          email: user.Email,
          name: user.UserName,
          randomKey: "Hey cool",
        };
      },
    }),
  ],
  callbacks: {
    session: ({ session, token }) => {
      return {
        ...session,
        user: {
          ...session.user,
          token: token.id,
          randomKey: token.randomKey,
        },
      };
    },
    jwt: ({ token, user }) => {
      if (user) {
        const u = user as unknown as any;
        return {
          ...token,
          randomKey: u.randomKey,
        };
      }
      return token;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
