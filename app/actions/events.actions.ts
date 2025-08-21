"use server";

import { createSessionClient } from "@/lib/server/appwrite";
import { DATABASE_ID, EVENTS_COLLECTION_ID } from "@/lib/server/consts";
import { ID } from "node-appwrite";

export type EventCreatePayload = {
  title: string;
  description: string;
  date: string; // ISO datetime string or date-only
  time?: string; // Optional HH:mm
  venue: string;
  address: string;
  image: string; // url
  price: string;
  pricing?: Record<string, string>;
  buyTicketLink: string;
  status: "upcoming" | "ongoing" | "completed" | "cancelled" | boolean;
  category: string;
  capacity?: number;
  attendees?: number;
  slug: string;
  imgPerEvent?: string[];
};

export const createEvent = async (data: EventCreatePayload) => {
  const { databases } = await createSessionClient();
  // Merge date + time to ISO if time provided
  let isoDate = data.date;
  if (data.time && data.date && !data.date.includes("T")) {
    // assume date is YYYY-MM-DD
    isoDate = new Date(`${data.date}T${data.time}:00.000Z`).toISOString();
  }
  // Convert UI status to boolean (true=active/upcoming, false=cancelled)
  const statusBool =
    typeof data.status === "boolean"
      ? data.status
      : data.status !== "cancelled";
  // Stringify pricing for DB
  const pricingStr = data.pricing ? JSON.stringify(data.pricing) : "{}";
  const created = await databases.createDocument(
    DATABASE_ID,
    EVENTS_COLLECTION_ID,
    ID.unique(),
    {
      title: data.title,
      description: data.description,
      date: isoDate,
      venue: data.venue,
      address: data.address,
      image: data.image,
      price: data.price,
      pricing: pricingStr,
      buyTicketLink: data.buyTicketLink,
      status: statusBool,
      category: data.category,
      capacity: data.capacity ?? 0,
      attendees: data.attendees ?? 0,
      slug: data.slug,
      imgPerEvent: data.imgPerEvent || [],
    }
  );
  return created;
};

export type EventUpdatePayload = Partial<EventCreatePayload>;

export const updateEvent = async (id: string, data: EventUpdatePayload) => {
  const { databases } = await createSessionClient();
  // Prepare partial updates, converting fields to DB representation
  const updateBody: Record<string, any> = {};
  if (data.title !== undefined) updateBody.title = data.title;
  if (data.description !== undefined) updateBody.description = data.description;
  if (data.date !== undefined || data.time !== undefined) {
    // If either provided, recompute ISO
    const baseDate = data.date || new Date().toISOString();
    if (data.time) {
      const dateOnly = baseDate.includes("T")
        ? baseDate.substring(0, 10)
        : baseDate;
      updateBody.date = new Date(
        `${dateOnly}T${data.time}:00.000Z`
      ).toISOString();
    } else if (data.date) {
      updateBody.date = baseDate;
    }
  }
  if (data.venue !== undefined) updateBody.venue = data.venue;
  if (data.address !== undefined) updateBody.address = data.address;
  if (data.image !== undefined) updateBody.image = data.image;
  if (data.price !== undefined) updateBody.price = data.price;
  if (data.pricing !== undefined)
    updateBody.pricing = JSON.stringify(data.pricing || {});
  if (data.buyTicketLink !== undefined)
    updateBody.buyTicketLink = data.buyTicketLink;
  if (data.status !== undefined) {
    updateBody.status =
      typeof data.status === "boolean"
        ? data.status
        : data.status !== "cancelled";
  }
  if (data.category !== undefined) updateBody.category = data.category;
  if (data.capacity !== undefined) updateBody.capacity = data.capacity;
  if (data.attendees !== undefined) updateBody.attendees = data.attendees;
  if (data.slug !== undefined) updateBody.slug = data.slug;
  if (data.imgPerEvent !== undefined) updateBody.imgPerEvent = data.imgPerEvent;
  const updated = await databases.updateDocument(
    DATABASE_ID,
    EVENTS_COLLECTION_ID,
    id,
    updateBody
  );
  return updated;
};

export const deleteEvent = async (id: string) => {
  const { databases } = await createSessionClient();
  await databases.deleteDocument(DATABASE_ID, EVENTS_COLLECTION_ID, id);
  return { ok: true } as const;
};
