import NextAuth, { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        if (!credentials || !credentials.username || !credentials.password) {
          return null
        }

        const user =
          credentials.username === 'demo'
            ? { id: '1', username: 'demo', password: 'demo1234' }
            : null

        if (!user) {
          return null
        }

        if (user.password !== credentials.password) {
          return null
        }

        const { password: _, ...userWithoutPassword } = user

        return userWithoutPassword
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/auth/signin',
  },
}

export default NextAuth(authOptions)
