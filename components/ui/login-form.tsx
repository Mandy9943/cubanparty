"use client";
import { signin, signup } from "@/app/actions/auth.action";
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
import { cn } from "@/lib/utils";
import { useActionState, useEffect, useState } from "react";

type Mode = "signin" | "signup";

export function AuthForm({ className, ...props }: React.ComponentProps<"div">) {
  const [mode, setMode] = useState<Mode>("signin");
  const actionFn = mode === "signin" ? signin : signup;
  const [state, action, pending] = useActionState(actionFn, undefined);
  const [visibleError, setVisibleError] = useState<string | null>(null);

  useEffect(() => {
    if (state?.error) {
      setVisibleError(state.error);
      const timer = setTimeout(() => setVisibleError(null), 10000);
      return () => clearTimeout(timer);
    }
  }, [state?.error]);

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">
            {mode === "signin" ? "Bienvenido de nuevo" : "Crea tu cuenta"}
          </CardTitle>
          <CardDescription>
            {mode === "signin"
              ? "Inicia sesión con tu email y contraseña"
              : "Regístrate con tu email y una contraseña"}
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
              <div className="grid gap-3">
                <Label htmlFor="password">Contraseña</Label>
                <a
                    href="/login/forgot-password"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                <Input id="password" name="password" type="password" placeholder="contraseña..." required />
              </div>

              {mode === "signup" && (
                <div className="grid gap-3">
                  <Label htmlFor="confirmPassword">Confirmar Password</Label>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    required
                  />
                </div>
              )}

              {visibleError && (
                <span className="text-red-500 text-sm">{visibleError}</span>
              )}

              <Button disabled={pending} className="w-full" type="submit">
                {pending
                  ? mode === "signin"
                    ? "Iniciando..."
                    : "Registrando..."
                  : mode === "signin"
                  ? "Iniciar sesión"
                  : "Registrarse"}
              </Button>

              <div className="text-center text-sm">
                {mode === "signin" ? (
                  <>
                    ¿No tienes una cuenta?{" "}
                    <button
                      type="button"
                      onClick={() => setMode("signup")}
                      className="underline underline-offset-4 hover:cursor-pointer"
                    >
                      Regístrate
                    </button>
                  </>
                ) : (
                  <>
                    ¿Ya tienes una cuenta?{" "}
                    <button
                      type="button"
                      onClick={() => setMode("signin")}
                      className="underline underline-offset-4 hover:cursor-pointer"
                    >
                      Inicia sesión
                    </button>
                  </>
                )}
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

