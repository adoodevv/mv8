import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import ProfileClient from "../components/ProfileClient"; // Import the client component

export default async function Profiles() {
   const session = await getServerSession(authOptions);

   if (!session) {
      redirect("/login");
   }

   return (
      <div className="flex items-center h-full justify-center">
            <ProfileClient session={session} />
      </div>
   );
}
