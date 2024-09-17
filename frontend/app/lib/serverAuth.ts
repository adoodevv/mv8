import { NextApiRequest } from "next";
import { getSession } from "next-auth/react";
import prismadb from "@/app/lib/prismadb";

const serverAuth = async (req: NextApiRequest) => {
   const session = await getSession({ req });

   if (!session?.user?.email) {
      throw new Error("You need to sign in");
   }

   const currentUser = await prismadb.user.findUnique({
      where: {
         email: session.user.email,
      },
   });

   if (!currentUser) {
      throw new Error("User not found");
   }

   return { currentUser };
};

export default serverAuth;