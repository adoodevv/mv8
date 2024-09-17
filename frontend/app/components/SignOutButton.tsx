'use client';

import { signOut } from "next-auth/react";

export default function SignOutButton() {
   return (
      <button className="h-10 w-full bg-white" onClick={() => signOut()}>
         Sign out
      </button>
   );
}