"use server";
import { createAdminClient, createSessionClient } from "@/lib/server/appwrite";
import { SESSION_COOKIE_NAME } from "@/lib/server/consts";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ID } from "node-appwrite";

export const signup = async (initialState: any, formData: FormData): Promise<{error:string|undefined}> => {
  const email = formData.get('email');
  const password = formData.get('password');
  const confirmPassword = formData.get('confirmPassword');
  
  console.log({ email, password });
  if(password !== confirmPassword){
    return {error:'Las contraseñas no coinciden'};
  }
  try{
    const { account } = await createAdminClient();

  await account.create(ID.unique(), String(email), String(password));
  const session = await account.createEmailPasswordSession(String(email), String(password));

  const cookieStore = await cookies();

  cookieStore.set(SESSION_COOKIE_NAME, session.secret, {
    path: "/",
    httpOnly: true,
    sameSite: "strict",
    secure: true,
    expires: new Date(session.expire),
  });

  redirect("/dashboard");
  }catch (err: any){
    return {error: err?.message}
  }
};

export const signin = async (state: any,formData: FormData) => {
  const email = formData.get('email');
  const password = formData.get('password');
  
  console.table({ email, password });

  try{
    const { account } = await createAdminClient();
  const session = await account.createEmailPasswordSession(String(email), String(password));

  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE_NAME, session.secret, {
    path: "/",
    httpOnly: true,
    sameSite: "strict",
    secure: true,
  });

  redirect("/dashboard");
  }catch(error: any){
    return {error: 'Error al iniciar sesión, email/contraseña inválidos'}
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
