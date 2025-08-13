"use client";
import { Button } from "./button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
//import { cn } from "@/lib/utils";
import { useActionState, useEffect, useState } from "react";
import { resetPassword } from "@/app/actions/auth.action";
import { useRouter } from "next/navigation";

const ResetPasswordForm = ({userId, secret}: {userId:string, secret:string})=> {
  const [state, action, pending] = useActionState(resetPassword, undefined);
  const [visibleError, setVisibleError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    if(state?.success){
        router.push('/login');
    }
    if (state?.error) {
      setVisibleError(state.error);
      const timer = setTimeout(() => setVisibleError(null), 10000);
      return () => clearTimeout(timer);
    }
  }, [state?.error,state?.success]);

  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader className="text-center">
          <CardTitle>Restablecer contraseña</CardTitle>
          <CardDescription>
            Ingresa y confirma tu nueva contraseña para completar el proceso de recuperación.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={action}>
            <div className="grid gap-6">
              <div className="grid gap-3">
                <Label htmlFor="newPassword">Nueva Contraseña</Label>
                <Input
                  id="newPassword"
                  name="newPassword"
                  type="password"
                  placeholder="nueva contraseña..."
                  required
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="confirmNewPassword">Confirma nueva contraseña</Label>
                <Input
                  id="confirmNewPassword"
                  name="confirmNewPassword"
                  type="password"
                  placeholder="confirma nueva contraseña"
                  required
                />
                <Input
                  name="userId"
                  value={userId}
                  hidden={true}
                  readOnly={true}
                />
                <Input
                  name="secret"
                  value={secret}
                  hidden={true}
                  readOnly={true}
                />
              </div>
              {visibleError && (
                <span className="text-red-500 text-sm">{visibleError}</span>
              )}
              <Button disabled={pending} className="w-full" type="submit">
                {pending? 'Enviando':'Cambiar Contraseña'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default ResetPasswordForm;