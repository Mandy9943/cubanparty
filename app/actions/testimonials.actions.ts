"use server";

import { createSessionClient } from "@/lib/server/appwrite";
import { DATABASE_ID, TESTIMONIALS_COLLECTION_ID } from "@/lib/server/consts";
import { ID } from "node-appwrite";

export type TestimonialCreatePayload = {
  name: string;
  image: string; // public URL
  text: string;
};

export const createTestimonial = async (data: TestimonialCreatePayload) => {
  const { databases } = await createSessionClient();
  const created = await databases.createDocument(
    DATABASE_ID,
    TESTIMONIALS_COLLECTION_ID,
    ID.unique(),
    {
      name: data.name,
      image: data.image,
      text: data.text,
    }
  );
  return created;
};

export type TestimonialUpdatePayload = Partial<TestimonialCreatePayload>;

export const updateTestimonial = async (
  id: string,
  data: TestimonialUpdatePayload
) => {
  const { databases } = await createSessionClient();
  const updated = await databases.updateDocument(
    DATABASE_ID,
    TESTIMONIALS_COLLECTION_ID,
    id,
    {
      ...(data.name !== undefined ? { name: data.name } : {}),
      ...(data.image !== undefined ? { image: data.image } : {}),
      ...(data.text !== undefined ? { text: data.text } : {}),
    }
  );
  return updated;
};

export const deleteTestimonial = async (id: string) => {
  const { databases } = await createSessionClient();
  await databases.deleteDocument(DATABASE_ID, TESTIMONIALS_COLLECTION_ID, id);
  return { ok: true } as const;
};
