"use client";
import { changePassword } from "@/app/actions/auth.action";
import { useActionState, useEffect, useState } from "react";

export default function SettingsPage() {
  const [state, formAction, pending] = useActionState(
    changePassword,
    undefined
  );
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if ((state as any)?.success) {
      setMessage("Contraseña actualizada correctamente");
      setError(null);
    } else if ((state as any)?.error) {
      setError((state as any).error);
      setMessage(null);
    }
  }, [state]);

  return (
    <div className="max-w-xl w-full mx-auto p-4 sm:p-6">
      <h1 className="text-2xl font-semibold mb-6">Configuración</h1>
      <div className="bg-white shadow rounded-lg p-4 sm:p-6">
        <h2 className="text-lg font-medium mb-4">Cambiar contraseña</h2>
        <form action={formAction} className="space-y-4">
          <div>
            <label
              htmlFor="currentPassword"
              className="block text-sm font-medium text-gray-700"
            >
              Contraseña actual
            </label>
            <input
              id="currentPassword"
              name="currentPassword"
              type="password"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-900 focus:ring-gray-900"
            />
          </div>
          <div>
            <label
              htmlFor="newPassword"
              className="block text-sm font-medium text-gray-700"
            >
              Nueva contraseña
            </label>
            <input
              id="newPassword"
              name="newPassword"
              type="password"
              required
              minLength={8}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-900 focus:ring-gray-900"
            />
          </div>
          <div>
            <label
              htmlFor="confirmNewPassword"
              className="block text-sm font-medium text-gray-700"
            >
              Confirmar nueva contraseña
            </label>
            <input
              id="confirmNewPassword"
              name="confirmNewPassword"
              type="password"
              required
              minLength={8}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-900 focus:ring-gray-900"
            />
          </div>

          {message && <p className="text-green-600 text-sm">{message}</p>}
          {error && <p className="text-red-600 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={pending}
            className="inline-flex items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-white hover:bg-gray-800 disabled:opacity-50 w-full sm:w-auto"
          >
            {pending ? "Guardando..." : "Guardar"}
          </button>
        </form>
      </div>
    </div>
  );
}
