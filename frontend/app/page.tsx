import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import SignOutButton from "./components/SignOutButton";
import Navbar from "./components/Navbar";

async function getUserEmail() {
  const session = await getServerSession(authOptions);
  return session?.user?.email;
}

export default async function Home() {
  const userEmail = await getUserEmail();

  if (!userEmail) {
    redirect("/login");
  }

  return (
    <>
      <Navbar />
    </>
  );
}