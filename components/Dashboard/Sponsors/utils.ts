import { SponsorDocument } from "@/swr/useSponsors";
export type Sponsor = {
  id: string;
  name: string;
  image: string;
  link?: string | null;
};
export const adaptSponsorDocuments = (sponsors: SponsorDocument[]): Sponsor[] =>
  sponsors.map((d) => ({
    id: d.$id,
    name: d.name,
    image: d.image,
    link: d.link ?? undefined,
  }));
