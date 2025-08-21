import { adaptEventDocuments } from "@/components/Dashboard/Events/utils";
import Footer from "@/components/Footer/Footer";
import PhotoSectionPerEvent from "@/components/Gallery/PhotoSectionPerEvent";
import Header from "@/components/Home/Header";
import ParticlesBackground from "@/components/Home/ParticlesBg";
import { createAdminClient } from "@/lib/server/appwrite";
import { DATABASE_ID, EVENTS_COLLECTION_ID } from "@/lib/server/consts";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Query } from "node-appwrite";

export async function generateStaticParams() {
  const { databases } = await createAdminClient();
  const res = await databases.listDocuments(DATABASE_ID, EVENTS_COLLECTION_ID, [
    Query.select(["slug"]),
  ]);
  const allEvents = adaptEventDocuments(res.documents);

  return allEvents.map((event) => ({ slug: event.slug }));
}

const GalleryPerEvent = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  const { databases } = await createAdminClient();
  const res = await databases.listDocuments(DATABASE_ID, EVENTS_COLLECTION_ID, [
    Query.equal("slug", [slug]),
  ]);
  const allEvents = adaptEventDocuments(res.documents);

  const event = allEvents[0];
  if (!event) {
    return notFound();
  }

  return (
    <main className="min-h-screen flex flex-col">
      <div
        id="home"
        className="relative w-full flex flex-col items-center z-10 bg-[#020416]"
      >
        <Header />
        <div className="relative text-center mb-12 z-10 mt-30">
          <h1 className="font-extrabold text-5xl text-[var(--text-color1)]">
            {event.title}
          </h1>
        </div>
        <Image
          src="/assets/inner-bg.png"
          alt="About Us Background"
          layout="fill"
          priority
          quality={100}
          objectFit="cover"
          className="absolute inset-0 z-0 opacity-70"
        />
        <ParticlesBackground numberOfParticles={5} speed={0.07} bgColor="" />
      </div>
      <PhotoSectionPerEvent event={event} />

      <Footer />
    </main>
  );
};
export default GalleryPerEvent;
