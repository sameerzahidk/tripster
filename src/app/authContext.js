"use client";

import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";


export default function AuthContext({ children ,session}) {
  return <SessionProvider>{children}</SessionProvider>;
}