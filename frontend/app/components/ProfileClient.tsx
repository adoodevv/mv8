"use client";

import { useRouter } from "next/navigation";

interface ProfileClientProps {
   session: any;
}

export default function ProfileClient({ session }: ProfileClientProps) {
   const router = useRouter();

   return (
      <div className="flex flex-col">
         <h1 className="text-3xl  md:text-5xl text-white text-center"> Who is watching?</h1>
         <div className="flex items-center justify-center gap-8 mt-10">
            <div onClick={() => router.push("/")}>
               <div className="group flex-row w-44 mx-auto">
                  <div className="
                        w-44
                        h-44
                        rounded-md
                        flex
                        items-center
                        justify-center
                        border-2
                        border-transparent
                        group-hover:border-white
                        group-hover:cursor-pointer
                        overflow-hidden
                        "
                  >
                     <img src="/images/avatar.png" alt="profile" className="w-44 h-44"/>
                  </div>
                  <div className="mt-4 text-gray-400 text-2xl text-center group-hover:text-white">
                     {session.user?.name}                     </div>
               </div>
            </div>
         </div>
      </div>
   );
}
