"use client";

import { Session } from "next-auth";
import { useSession, signIn, signOut } from "next-auth/react";
import { useEffect } from "react";

interface CustomSession extends Session {
 error?: string;
}

async function keycloakSessionLogOut(): Promise<void> {
 try {
   await fetch(`/api/auth/logout`, { method: "GET" });
 } catch (err) {
   console.error(err);
 }
}

export default function AuthStatus(): JSX.Element {
 const { data: session, status } = useSession();
 const customSession = session as CustomSession;

 useEffect(() => {
   if (
     status !== "loading" &&
     customSession &&
     customSession?.error === "RefreshAccessTokenError"
   ) {
     signOut({ callbackUrl: "/" });
   }
 }, [customSession, status]);

 if (status === "loading") {
   return <div className="my-3">Loading...</div>;
 } else if (customSession) {
   return (
     <div className="my-3">
       Logged in as{" "}
       <span className="text-yellow-100">{customSession.user?.email}</span>{" "}
       <button
         className="bg-blue-900 font-bold text-white py-1 px-2 rounded border border-gray-50"
         onClick={() => {
           keycloakSessionLogOut().then(() => signOut({ callbackUrl: "/" }));
         }}
       >
         Log out
       </button>
     </div>
   );
 }

 return (
   <div className="my-3">
     Not logged in.{" "}
     <button
       className="bg-blue-900 font-bold text-white py-1 px-2 rounded border border-gray-50"
       onClick={() => signIn("keycloak")}
     >
       Log in
     </button>
   </div>
 );
}