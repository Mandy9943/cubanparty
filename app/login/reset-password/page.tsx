import ResetPasswordForm from "@/components/ui/ResetPasswordForm";
export const runtime = "edge";
const ResetPasswordPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ userId?: string; secret?: string }>;
}) => {
  const { userId, secret } = await searchParams;
  if (!userId || !secret) {
    return <p>Link inválido o vencido. Solicita otro email de recuperación.</p>;
  }
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <ResetPasswordForm userId={userId} secret={secret} />
      </div>
    </div>
  );
};
export default ResetPasswordPage;
