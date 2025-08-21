import { adaptStaffDocuments } from "@/components/Dashboard/Staff/utils";
import { createAdminClient } from "@/lib/server/appwrite";
import { DATABASE_ID, STAFF_COLLECTION_ID } from "@/lib/server/consts";
import Image from "next/image";
import { Query } from "node-appwrite";

const Managers = async () => {
  const { databases } = await createAdminClient();

  const res = await databases.listDocuments(DATABASE_ID, STAFF_COLLECTION_ID, [
    Query.limit(100),
  ]);

  const staff = adaptStaffDocuments(res.documents);

  return (
    <section id="promoters" className=" w-full bg-color1 pt-20 md:pt-30">
      <div className="text-center relative z-10 md:mt-16 mb-8">
        <span className="text-black tex-xl sm:text-2xl mb-1 font-extrabold uppercase leading-[26.4px]">
          Detras del proyecto
        </span>
        <h2 className=" text-4xl sm:text-6xl text-white font-extrabold leading-8 sm:leading-[66px] uppercase">
          Promotores
        </h2>
        <Image
          src="/assets/line_-white.png"
          alt="Section Title Divider"
          width={81}
          height={15}
          className="mx-auto"
        />
      </div>

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 sm:flex sm:flex-wrap justify-center gap-4 sm:gap-8 my-8 sm:my-16">
          {staff.map((member, index) => (
            <div
              key={index}
              className={`group relative w-full sm:w-[240px] flex flex-col items-center ${
                staff.length % 2 !== 0 && index === staff.length - 1
                  ? "col-span-2"
                  : ""
              }`}
            >
              <div className="relative rounded-full border-4 sm:border-2 hover:border-6 hover:p-0 border-color2 overflow-hidden aspect-square  sm:p-2 bg-black w-32 h-32 sm:w-60 sm:h-60 mx-auto">
                <Image
                  src={member.image}
                  alt={member.name}
                  width={280}
                  height={280}
                  className="object-cover rounded-full w-full h-full transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="text-center mt-2 sm:mt-4">
                <h3 className="text-[#00ffff] text-lg sm:text-3xl font-bold">
                  {member.name}
                </h3>
                <p className="text-white text-base sm:text-2xl mt-1">
                  {member.role}
                </p>
              </div>
              <div className="flex justify-center gap-1 sm:gap-4 mt-1 sm:mt-2">
                {member.socials.map((social, idx) => {
                  const IconComponent = social.icon;
                  return (
                    <a
                      key={idx}
                      href={social.url}
                      className="text-white hover:text-[#00ffff] transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <IconComponent className="w-4 h-4 sm:w-6 sm:h-6" />
                    </a>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Managers;
