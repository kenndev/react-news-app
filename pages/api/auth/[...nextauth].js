import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth";
import axios from "axios";

export const authOptions = {
  
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: {
          label: "email",
          type: "text",
          placeholder: "jsmith@gmail.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const { email, password } = credentials;
    

        const result = await axios.post(
          "http://localhost/api/login",
          JSON.stringify({
            email,
            password,
          }),
          {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          }
        );
        const user = await result.data;
        if ((result.status== 200) && user) {
          return user;
        } else {
          return null;
        }
      },
    }),

    // ...add more providers here
  ],

  callbacks: {
    session: async ({ session, token }) => {
      session.id = token.id;
      session.jwt = token.jwt;
      session.user.name = token.name;
      session.user.accesstoken = token.accesstoken;
      return Promise.resolve(session);
    },
    jwt: async ({ token, user }) => {
      if (user) {
        token.id = user.id;
        token.jwt = user.jwt;
        token.name = user.name;
        token.accesstoken = user.accesstoken;
      }
      return Promise.resolve(token);
    },
  },

  pages: {
    signIn:"/auth/login"
  }
};
export default NextAuth(authOptions);
