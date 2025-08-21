"use server";

import { createSessionClient } from "@/lib/server/appwrite";
import { DATABASE_ID, STAFF_COLLECTION_ID } from "@/lib/server/consts";
import { revalidatePath } from "next/cache";
import { ID } from "node-appwrite";

export type StaffCreatePayload = {
  name: string;
  role: string;
  image: string | null; // por ahora será null
  socials: string[]; // URLs
  status: boolean; // true activo, false inactivo
};

export const createStaffMember = async (data: StaffCreatePayload) => {
  const { databases } = await createSessionClient();
  const created = await databases.createDocument(
    DATABASE_ID,
    STAFF_COLLECTION_ID,
    ID.unique(),
    {
      name: data.name,
      role: data.role,
      image: data.image,
      socials: data.socials,
      status: data.status,
    }
  );

  revalidatePath("/");

  return created;
};

export type StaffUpdatePayload = Partial<StaffCreatePayload>;

export const updateStaffMember = async (
  id: string,
  data: StaffUpdatePayload
) => {
  const { databases } = await createSessionClient();
  const updated = await databases.updateDocument(
    DATABASE_ID,
    STAFF_COLLECTION_ID,
    id,
    {
      ...(data.name !== undefined ? { name: data.name } : {}),
      ...(data.role !== undefined ? { role: data.role } : {}),
      // Imagen por ahora se mantiene en null si viene undefined
      ...(data.image !== undefined ? { image: data.image } : {}),
      ...(data.socials !== undefined ? { socials: data.socials } : {}),
      ...(data.status !== undefined ? { status: data.status } : {}),
    }
  );
  revalidatePath("/");

  return updated;
};

export const deleteStaffMember = async (id: string) => {
  const { databases } = await createSessionClient();
  await databases.deleteDocument(DATABASE_ID, STAFF_COLLECTION_ID, id);

  revalidatePath("/");

  return { ok: true } as const;
};
