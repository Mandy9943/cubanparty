import Header from "@/components/Home/Header";
import Image from "next/image";
import { modifiedEvents } from "@/lib/events";
import { notFound } from "next/navigation";
import PhotoSectionPerEvent from "@/components/Gallery/PhotoSectionPerEvent";

export async function generateStaticParams() {
  return modifiedEvents.map((event) => ({ slug: event.slug }));
}

const GalleryPerEvent = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  const event = modifiedEvents.find((event) => event.slug === slug);
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
            {event.eventName}
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
      </div>
      <PhotoSectionPerEvent event={event}/>
      
    </main>
  );
};
export default GalleryPerEvent;