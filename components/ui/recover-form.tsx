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
import { useActionState, useEffect, useState } from "react";
import { sendRecoveryPassword } from "@/app/actions/auth.action";

export function RecoverPasswordForm(){
  const [state, action, pending] = useActionState(sendRecoveryPassword, undefined);
  const [visibleError, setVisibleError] = useState<string | null>(null);

  useEffect(() => {
    if (state?.error) {
      setVisibleError(state.error);
      const timer = setTimeout(() => setVisibleError(null), 10000);
      return () => clearTimeout(timer);
    }
  }, [state?.error]);

  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader className="text-center">
          <CardTitle>Recupera contraseña</CardTitle>
          <CardDescription>
            Ingresa tu correo electrónico y te enviaremos un enlace para restablecer tu contraseña.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={action}>
            <div className="grid gap-6">
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="m@example.com"
                  required
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
