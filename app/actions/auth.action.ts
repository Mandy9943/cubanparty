"use server";
import { createAdminClient, createSessionClient } from "@/lib/server/appwrite";
import { ALLOWED_EMAILS, SESSION_COOKIE_NAME } from "@/lib/server/consts";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ID } from "node-appwrite";

export const signup = async (
  initialState: any,
  formData: FormData
): Promise<{ error: string | undefined }> => {
  const email = formData.get("email");
  const password = formData.get("password");
  const confirmPassword = formData.get("confirmPassword");

  if (password !== confirmPassword) {
    return { error: "Las contraseñas no coinciden" };
  }
  // Restringe el registro solo a correos en la lista permitida
  if (!email || !ALLOWED_EMAILS.includes(String(email).toLowerCase())) {
    return { error: "Registro restringido. Contacta al administrador." };
  }
  try {
    const { account } = await createAdminClient();

    await account.create(ID.unique(), String(email), String(password));
    const session = await account.createEmailPasswordSession(
      String(email),
      String(password)
    );

    const cookieStore = await cookies();

    cookieStore.set(SESSION_COOKIE_NAME, session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
      expires: new Date(session.expire),
    });

    redirect("/dashboard");
  } catch (err: any) {
    return { error: err?.message };
  }
};

export const signin = async (state: any, formData: FormData) => {
  const email = formData.get("email");
  const password = formData.get("password");

  try {
    // Restringe el acceso solo a correos en la lista permitida
    if (!email || !ALLOWED_EMAILS.includes(String(email).toLowerCase())) {
      return { error: "Acceso restringido. Contacta al administrador." };
    }
    const { account } = await createAdminClient();
    const session = await account.createEmailPasswordSession(
      String(email),
      String(password)
    );

    const cookieStore = await cookies();
    cookieStore.set(SESSION_COOKIE_NAME, session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });

    redirect("/dashboard");
  } catch (error: any) {
    return { error: "Error al iniciar sesión, email/contraseña inválidos" };
  }
};

export const signout = async () => {
  const { account } = await createSessionClient();
  const cookieStore = await cookies();

  cookieStore.delete(SESSION_COOKIE_NAME);
  await account.deleteSession("current");

  redirect("/login");
};

export async function getLoggedInUser() {
  try {
    const { account } = await createSessionClient();
    return await account.get();
  } catch (error) {
    return null;
  }
}

export async function changePassword(state: any, formData: FormData) {
  const currentPassword = formData.get("currentPassword");
  const newPassword = formData.get("newPassword");
  const confirmNewPassword = formData.get("confirmNewPassword");

  if (!currentPassword || !newPassword || !confirmNewPassword) {
    return { error: "Todos los campos son obligatorios" };
  }
  if (String(newPassword).length < 8) {
    return { error: "La nueva contraseña debe tener al menos 8 caracteres" };
  }
  if (newPassword !== confirmNewPassword) {
    return { error: "Las contraseñas no coinciden" };
  }

  try {
    const { account } = await createSessionClient();

    await account.updatePassword(String(newPassword), String(currentPassword));
    return { success: true } as any;
  } catch (err: any) {
    // Common errors: invalid credentials, rate limits, etc.
    return { error: err?.message || "No se pudo cambiar la contraseña" };
  }
}

export async function sendRecoveryPassword(state: any, formData: FormData) {
  const email = formData.get("email");
  try {
    const { account } = await createAdminClient();
    await account.createRecovery(
      String(email),
      "http://localhost:3000/login/reset-password"
    );
  } catch (err: any) {
    return { error: err.message || "Error enviando el email" };
  }
}
export async function resetPassword(state: any, formData: FormData) {
  const newPassword = formData.get("newPassword");
  const confirmNewPassword = formData.get("confirmNewPassword");
  const userId = formData.get("userId");
  const secret = formData.get("secret");

  if (newPassword !== confirmNewPassword) {
    return { error: "Las contraseñás no coinciden" };
  }
  try {
    const { account } = await createAdminClient();
    await account.updateRecovery(
      String(userId),
      String(secret),
      String(newPassword)
    );
    return { success: true };
  } catch (err: any) {
    return { error: err?.message };
  }
}
