import { useEffect, useState } from "react";
import { account } from "../appwrite";
import { NextResponse } from "next/server";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sessionValid, setSessionValid] = useState<Boolean|null>(null);
  useEffect(() => {
    async function ValidateSession() {
      try {
        const session = await account.get();
        console.log()
        if(session){setSessionValid(true)}
      } catch {
        (err: Error) => {
          setSessionValid(false);
          NextResponse.redirect('/login');
        };
      }
    }
    ValidateSession()
  }, []);
  return (
    <body>
      {/* Layout UI */}
      {/* Place children where you want to render a page or nested layout */}
      <main>{children}</main>
    </body>
  );
}