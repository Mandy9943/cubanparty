import { AuthForm } from "@/components/ui/login-form";
import { redirect } from "next/navigation";
import { getLoggedInUser } from "../actions/auth.action";

export default async function SignupPage() {
  const user = await getLoggedInUser();
  if (user) redirect("/dashboard");

  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <AuthForm mode="signup" />
      </div>
    </div>
  );
}
