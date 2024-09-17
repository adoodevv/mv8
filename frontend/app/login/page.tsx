"use client"
import Input from "@/app/components/input";
import axios from "axios";
import { signIn } from "next-auth/react"
import { useCallback, useState } from "react";

import { FcGoogle } from "react-icons/fc";

function LoginPage() {
   const [email, setEmail] = useState("");
   const [username, setUsername] = useState("");
   const [password, setPassword] = useState("");

   const [variant, setVariant] = useState("login");

   const toggleVariant = useCallback(() => {
      setVariant((currentVariant) => (currentVariant === "login" ? "register" : "login"));
   }, []);

   const login = useCallback(async () => {
      try {
         const result = await signIn("credentials", {
            email,
            password,
            redirect: false,
         });

         if (result?.error) {
            console.error("Login error:", result.error);
         } else {
            window.location.href = '/profiles';
         }
      } catch (error) {
         console.log("Unexpected Error:", error);
      }
   }, [email, password]);


   const register = useCallback(async () => {
      try {
         await axios.post("/api/register", {
            email,
            username,
            password
         });

         login();
      } catch (error) {
         if (axios.isAxiosError(error)) {
            console.error('Registration error:', error.response?.data || error.message);
         } else {
            console.error('An unexpected error occurred:', error);
         }
      }
   }, [email, username, password, login]);

   return (
      <div className="h-full w-full bg-[url(/images/hero.jpg)] bg-no-repeat bg-center bg-fixed bg-cover" >
         <div className="bg-black lg:bg-opacity-50 h-full w-full">
            <nav className="px-12 py-5">
               <img src="/images/logo.svg" alt="NLogo" className="h-12" />
            </nav>
            <div className="flex justify-center">
               <div className="bg-black bg-opacity-70 px-16 py-16 self-center mt-2 lg:w-2/5 lg-max-w-md rounded-md w-full">
                  <h2 className="text-white text-4xl mb-8 font-semibold">
                     {variant === "login" ? "Sign in" : "Register"}
                  </h2>
                  <div className="flex flex-col gap-4">
                     {variant === "register" && (
                        <Input
                           id="username"
                           label="Username"
                           value={username}
                           onChange={(ev: any) => setUsername(ev.target.value)}
                        />
                     )}
                     <Input
                        id="email"
                        label="Email"
                        value={email}
                        onChange={(ev: any) => setEmail(ev.target.value)}
                        type="email"
                     />
                     <Input
                        id="password"
                        label="Password"
                        value={password}
                        onChange={(ev: any) => setPassword(ev.target.value)}
                        type="password"
                     />
                  </div>
                  <button onClick={variant === 'login' ? login : register} className="bg-red-600 text-white rounded-md py-3 mt-10 w-full hover:bg_red-700 transition">
                     {variant === "login" ? "Login" : "Sign up"}
                  </button>
                  <div className="flex flex-row items-center justify-center gap-4 mt-8 jusify-center">
                     <div onClick={() => signIn('google', { callbackUrl: '/profiles' })} className="w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition">
                        <FcGoogle size={30} />
                     </div>
                  </div>
                  <p className="text-neutral-500 text-center mt-8">
                     {variant === "login" ? "Don't have an account?" : "Already have an account?"}{" "}
                     <span onClick={toggleVariant} className="text-white cursor-pointer">
                        {variant === "login" ? "Create an account" : "Login"}
                     </span>
                  </p>
               </div>
            </div>
         </div>
      </div>
   );
}

export default LoginPage;