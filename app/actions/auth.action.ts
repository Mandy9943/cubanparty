"use server";
import { createAdminClient, createSessionClient } from "@/lib/server/appwrite";
import { SESSION_COOKIE_NAME } from "@/lib/server/consts";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ID } from "node-appwrite";

export const signup = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  console.log({ email, password });

  const { account } = await createAdminClient();

  await account.create(ID.unique(), email, password);
  const session = await account.createEmailPasswordSession(email, password);

  const cookieStore = await cookies();

  cookieStore.set(SESSION_COOKIE_NAME, session.secret, {
    path: "/",
    httpOnly: true,
    sameSite: "strict",
    secure: true,
  });

  redirect("/dashboard");
};

export const signin = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  console.table({ email, password });

  const { account } = await createAdminClient();
  const session = await account.createEmailPasswordSession(email, password);

  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE_NAME, session.secret, {
    path: "/",
    httpOnly: true,
    sameSite: "strict",
    secure: true,
  });

  redirect("/account");
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
