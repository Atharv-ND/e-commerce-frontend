// app/sign-in/page.tsx or pages/sign-in.tsx
"use client";

import { SignIn } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";
import { useRouter } from "next/navigation"; // or "next/router" for pages dir

export default function SignInPage() {
  const { isSignedIn } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isSignedIn) {
      router.push("/"); // or redirect to dashboard/cart etc.
    }
  }, [isSignedIn]);

  if (isSignedIn) return null; // prevent flicker

  return <SignIn />;
}
