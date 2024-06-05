import CredentialsProvider from 'next-auth/providers/credentials'
import NextAuth, { NextAuthOptions } from 'next-auth'

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: {  label: 'Password', type: 'password' }
      },
      async authorize(credentials, req) {
        console.log('---', credentials)
        if (credentials?.username === 'admin' && credentials?.password === 'admin') {
          return { id: '1', name: 'Admin' }
        }
        return null
      }
    })
  ],
  session: {
    strategy: 'jwt'
  },
  jwt: {
    maxAge: 60 * 60 * 24 * 3
  },
  secret: process.env.NEXT_AUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }
      console.log('jwt', user, token)
      return token
    },
    async session({ session, token }) {
      // if (token) {
      //   session.user.id = token.id
      // }
      console.log('===', session, token)
      return session
    }
  },
  pages: {
    signIn: '/login'
  }
}

export default NextAuth(authOptions)