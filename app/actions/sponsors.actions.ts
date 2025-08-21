"use server";

import { createSessionClient } from "@/lib/server/appwrite";
import { DATABASE_ID, SPONSORS_COLLECTION_ID } from "@/lib/server/consts";
import { revalidatePath } from "next/cache";
import { ID } from "node-appwrite";

export type SponsorCreatePayload = {
  name: string; // alt/name
  image: string; // url
  link?: string; // optional URL
};

export const createSponsor = async (data: SponsorCreatePayload) => {
  const { databases } = await createSessionClient();
  const created = await databases.createDocument(
    DATABASE_ID,
    SPONSORS_COLLECTION_ID,
    ID.unique(),
    {
      name: data.name,
      image: data.image,
      link: data.link || null,
    }
  );

  revalidatePath("/");

  return created;
};

export type SponsorUpdatePayload = Partial<SponsorCreatePayload>;

export const updateSponsor = async (id: string, data: SponsorUpdatePayload) => {
  const { databases } = await createSessionClient();
  const updated = await databases.updateDocument(
    DATABASE_ID,
    SPONSORS_COLLECTION_ID,
    id,
    {
      ...(data.name !== undefined ? { name: data.name } : {}),
      ...(data.image !== undefined ? { image: data.image } : {}),
      ...(data.link !== undefined ? { link: data.link } : {}),
    }
  );

  revalidatePath("/");

  return updated;
};

export const deleteSponsor = async (id: string) => {
  const { databases } = await createSessionClient();
  await databases.deleteDocument(DATABASE_ID, SPONSORS_COLLECTION_ID, id);

  revalidatePath("/");

  return { ok: true } as const;
};
