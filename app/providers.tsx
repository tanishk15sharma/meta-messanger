"use client";
import { SessionProvider } from "next-auth/react";

function Providers({ session, children }: any) {
  return <SessionProvider session={session}>{children}</SessionProvider>;
}

export { Providers };
