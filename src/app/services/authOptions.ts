import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import axios from "axios";

export const options: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
      profile(profile) {
        return {
          ...profile,
          role: profile.role ?? "user",
          id: profile.sub?.toString(),
          image: profile.picture,
        };
      },
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {
          label: "Username:",
          type: "text",
          placeholder: "your-cool-username",
        },
        password: {
          label: "Password:",
          type: "password",
          placeholder: "your-awesome-password",
        },
      },
      async authorize(credentials) {
        if (!credentials) {
          console.error("No credentials provided");
          return null;
        }

        try {
          const response = await axios.post("http://localhost:5000/api/v1/Login", {
            email: credentials.username,
            password: credentials.password,
          });

          const user = response.data;

          if (user) {
            return {
              id: user.id,
              name: user.name,
              role: user.role,
              image: user.image || "",
            };
          } else {
            console.error("User data not found in response");
            return null;
          }
        } catch (error: any) {
          console.error("Error during login:", error.response?.data || error.message);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.role = token.role;
      }
      return session;
    },
  },
  pages: {
    signIn: "/", // Custom login page
    signOut: "/", // Redirect to login page after sign out
    error: "/auth/error", // Error page
    verifyRequest: "/auth/verify-request", // Email verification page
    newUser: undefined, // If set, new users will be directed here on first sign in
  },
  events: {
    async signOut(message) {
      // Callback to handle additional logic on sign out
      console.log("User signed out", message);
    },
  },
};

import NextAuth from "next-auth";
