import { createAdminClient } from "@/lib/server/appwrite";
import { DATABASE_ID, EVENTS_COLLECTION_ID } from "@/lib/server/consts";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { Query } from "node-appwrite";
import { adaptEventDocuments } from "../Dashboard/Events/utils";
import "./LatestPhotos.css"; // Assuming you have a CSS file for styles

const rotations = ["-rotate-6", "rotate-1", "rotate-7"]; // Puedes variar más si quieres
const offsets = ["top-2 left-2", "top-4 left-4", "top-6 left-6"]; // O usa Tailwind arbitrario
const zIndexes = ["z-10", "z-20", "z-30"]; // para que no se tapen mal
const LatestPhotos = async () => {
  const { databases } = await createAdminClient();
  const res = await databases.listDocuments(DATABASE_ID, EVENTS_COLLECTION_ID, [
    Query.orderDesc("date"),
    Query.limit(100),
  ]);
  const allEvents = adaptEventDocuments(
    res.documents.filter((e) => new Date(e.date) <= new Date())
  );

  return (
    <div className="container flex my-10 z-10 gap-10 justify-center place-content-center">
      {allEvents.map((event, i) => (
        <div key={i} className="relative aspect-square w-full max-w-[400px]">
          {new Array(3).fill(null).map((_, j) => (
            <div
              key={j}
              className={cn(
                "group overflow-hidden shadow-lg hover:cursor-pointer transition-transform duration-300 absolute",
                rotations[j],
                offsets[j],
                zIndexes[j]
              )}
            >
              <Link href={`/gallery/${event.slug}`}>
                <Image
                  height={400}
                  width={400}
                  src={event.imgPerEvent[j] || event.image} // Fallback to first image if not enough images
                  alt={`${event.title} ${i}-${j}`}
                  className="w-full h-48 object-cover"
                  quality={100}
                />
                <div className="overlay"></div>
                <div className="title">{event.title}</div>
              </Link>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default LatestPhotos;
