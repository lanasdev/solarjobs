"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Link from "next/link";
import Image from "next/image";
import SectionContainer from "@/components/SectionContainer";
import HeroImg from "@/public/images/heroimg.png";
import { Balancer } from "react-wrap-balancer";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [view, setView] = useState("sign-in");
  const router = useRouter();
  const supabase = createClientComponentClient();

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${location.origin}/auth/callback`,
      },
    });
    setView("check-email");
  };

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await supabase.auth.signInWithPassword({
      email,
      password,
    });
    router.push("/");
    router.refresh();
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col justify-center md:flex-row md:items-center">
      <Image
        src={HeroImg}
        alt="Hero Image"
        className="h-[50ch] w-full object-cover md:h-[100ch] md:w-1/2"
      />
      <div className="mx-auto mt-8 flex w-full flex-[2_2_0%] flex-col justify-center gap-2 px-8 sm:max-w-md md:mt-0">
        <Link
          href="/"
          className="group flex w-24 items-center rounded-md bg-btn-background px-4 py-2 text-sm text-foreground no-underline hover:bg-btn-background-hover md:mb-16"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>{" "}
          Back
        </Link>
        <h1 className="pb-8 text-center text-2xl font-bold text-foreground md:text-left">
          <Balancer>
            {view === "sign-in" ? "Sign In" : "Sign Up"} to your account
          </Balancer>
        </h1>
        {view === "check-email" ? (
          <p className="text-center text-foreground">
            Check <span className="font-bold">{email}</span> to continue signing
            up
          </p>
        ) : (
          <form
            className="flex w-full flex-1 flex-col justify-center gap-2 text-foreground"
            onSubmit={view === "sign-in" ? handleSignIn : handleSignUp}
          >
            <label className="text-md" htmlFor="email">
              Email
            </label>
            <input
              className="mb-6 rounded-md border bg-inherit px-4 py-2"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              placeholder="you@example.com"
            />
            <label className="text-md" htmlFor="password">
              Password
            </label>
            <input
              className="mb-6 rounded-md border bg-inherit px-4 py-2"
              type="password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              placeholder="••••••••"
            />
            {view === "sign-in" && (
              <>
                <button className="mb-6 rounded bg-green-700 px-4 py-2 text-white">
                  Sign In
                </button>
                <p className="text-center text-sm">
                  Don't have an account?
                  <button
                    className="ml-1 underline"
                    onClick={() => setView("sign-up")}
                  >
                    Sign Up Now
                  </button>
                </p>
              </>
            )}
            {view === "sign-up" && (
              <>
                <button className="mb-6 rounded bg-green-700 px-4 py-2 text-white">
                  Sign Up
                </button>
                <p className="text-center text-sm">
                  Already have an account?
                  <button
                    className="ml-1 underline"
                    onClick={() => setView("sign-in")}
                  >
                    Sign In Now
                  </button>
                </p>
              </>
            )}
          </form>
        )}
        <div className="flex w-full flex-row justify-around gap-2 text-foreground">
          <button
            className="group flex w-24 items-center rounded-md bg-slate-900 px-4 py-2 text-sm text-foreground text-slate-100 no-underline hover:bg-btn-background-hover "
            onClick={async () => {
              const { data, error } = await supabase.auth.signInWithOAuth({
                provider: "github",
              });
              console.log(data, error);
            }}
          >
            GitHub
          </button>
          <button
            className="group flex w-24 items-center rounded-md bg-btn-background px-4 py-2 text-sm text-foreground no-underline hover:bg-btn-background-hover"
            onClick={async () => {
              const { data, error } = await supabase.auth.signInWithOAuth({
                provider: "google",
              });
              console.log(data, error);
            }}
          >
            Google
          </button>
        </div>
      </div>
    </div>
  );
}
