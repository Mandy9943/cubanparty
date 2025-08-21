import { adaptTestimonials } from "@/components/Dashboard/Comments/utils";
import AnimatedButton from "@/components/ui/CustomeButton";
import { createAdminClient } from "@/lib/server/appwrite";
import { DATABASE_ID, TESTIMONIALS_COLLECTION_ID } from "@/lib/server/consts";
import Image from "next/image";
import { Query } from "node-appwrite";
import SectionTItle from "../SectionTItle";
import TestimonialCarousel from "../TestimonialCarousel";

const Testimonials = async () => {
  const { databases } = await createAdminClient();

  const res = await databases.listDocuments(
    DATABASE_ID,
    TESTIMONIALS_COLLECTION_ID,
    [Query.limit(100)]
  );

  const testimonials = adaptTestimonials(res.documents as any[]);

  console.log(testimonials);

  return (
    <section
      id="testimonials"
      className="relative py-16 md:px-10 bg-[#0c0f22] text-white text-center flex flex-col items-center justify-center"
    >
      <Image
        src="/assets/parallax-2.jpg"
        alt="A radio img as a background"
        layout="fill"
        priority
        quality={100}
        objectFit="cover"
        className="absolute inset-0 z-0 opacity-70"
      />
      <SectionTItle
        title="Testimonios"
        subtitle="Esto es lo q opinan quienes nos visitan"
      />
      <TestimonialCarousel testimonials={testimonials} />
      <a
        href="https://www.instagram.com/p/DMf-oduOS_l/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <AnimatedButton className="!z-10" text="Leer Más" />
      </a>
    </section>
  );
};
export default Testimonials;
