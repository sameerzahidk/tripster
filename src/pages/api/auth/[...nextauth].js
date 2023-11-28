import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter"
import clientPromise from "../../../lib/mongodb"

export const authOptions = {
    secret: process.env.SECRET,
    site: process.env.NEXT_URL,
    session: {
        strategy: 'jwt',
        maxAge: 24 * 60 * 60,
        updateAge: 24 * 60 * 60
    },
    adapter: MongoDBAdapter(clientPromise),
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Username", type: "email", placeholder: "jsmith" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                const client = await clientPromise;
                let users = await client.db("db_tripster").collection("users");
                const result = await users.findOne({
                    email: credentials.email,
                });
                //Not found - send error res
                if (!result) {
                    throw new Error("no user found")
                }
                return { email: result.email, role: result.role, firstName: result.firstName, middleName: result.middleName, lastName: result.lastName, id: result._id, macAddress: result.macAddress, mobile: result.mobile, parentId: result.parentId };
            }
        }),
    ],
    jwt: {
        encryption: true
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token = {
                    ...user,
                    accessToken: user.jwt,
                }
            }

            return token
        },
        async session(seshProps) {
            return seshProps
        },
        async redirect({ url }) {
            return url
        }
    }

}
export default NextAuth(
    authOptions
)

