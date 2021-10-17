import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export default NextAuth({
  providers: [
    Credentials({
      id: "credentials",
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        let user = { id: 1, name: "John Doe", role: "ADMIN" };
        if (user) {
          return user;
        }
        return null;
      }
    })
  ],
  pages: {
    signIn: "/auth/login"
  },
  jwt: {
    signingKey: process.env.JWT_SIGNING_PRIVATE_KEY
  },
  callbacks: {
    async jwt({ token, user }) {
      // Add the role to the JWT token data
      if (user?.role) token.role = user.role;
      return token;
    },
    async session({ session, token }) {
      // Explicitly forward the role from the token
      if (token?.role) session.user.role = token.role;
      return session;
    }
  }
});
