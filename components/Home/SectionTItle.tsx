import Image from "next/image";

interface SectionTItleProps {
  subtitle: string;
  title: string;
}

const SectionTItle = ({ subtitle, title }: SectionTItleProps) => {
  return (
    <div className="relative z-10">
      <span className="text-color1 text-2xl mb-1 font-extrabold uppercase leading-[26.4px]">
        {subtitle}
      </span>
      <h2 className="text-6xl text-white font-extrabold leading-[66px] uppercase">
        {title}
      </h2>
      <Image
        src="/assets/line.png"
        alt="Section Title Divider"
        width={81}
        height={15}
        className="mx-auto"
      />
    </div>
  );
};

export default SectionTItle;
