import Image from "next/image";
import React, { useState } from "react";

interface Sponsor {
  id: number;
  image: string;
  alt: string;
  link: string;
}

const initialSponsors: Sponsor[] = [
  {
    id: 1,
    image: "/assets/sponsors/1.png",
    alt: "Patrocinador 1",
    link: "https://www.instagram.com/yosbelitogarcia?igsh=MXFoampobHJkczY1cg%3D%3D",
  },
  {
    id: 2,
    image: "/assets/sponsors/2.webp",
    alt: "Patrocinador 2",
    link: "https://www.instagram.com/dondelola.uy?igsh=dzdseGgzeXJvMXVn",
  },
  {
    id: 3,
    image: "/assets/sponsors/3.png",
    alt: "Patrocinador 3",
    link: "https://www.instagram.com/justo_refuerzos?igsh=N3ZibXUzM2oxOWE5",
  },
  {
    id: 4,
    image: "/assets/sponsors/4.png",
    alt: "Patrocinador 4",
    link: "https://www.instagram.com/dulcesfermin?igsh=cHh1ODd5eDJicnNs",
  },
];

const SponsorsManager = () => {
  const [sponsors, setSponsors] = useState<Sponsor[]>(initialSponsors);
  const [newSponsor, setNewSponsor] = useState({
    alt: "",
    link: "",
    image: "",
    file: null as File | null,
  });

  // Add new sponsor
  const handleAddSponsor = () => {
    if (!newSponsor.alt || !newSponsor.link || !newSponsor.file) return;
    const url = URL.createObjectURL(newSponsor.file);
    setSponsors((prev) => [
      ...prev,
      {
        id: prev.length ? prev[prev.length - 1].id + 1 : 1,
        alt: newSponsor.alt,
        link: newSponsor.link,
        image: url,
      },
    ]);
    setNewSponsor({ alt: "", link: "", image: "", file: null });
  };

  // Remove sponsor
  const handleRemoveSponsor = (id: number) => {
    setSponsors((prev) => prev.filter((s) => s.id !== id));
  };

  // Handle image upload
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setNewSponsor((prev) => ({ ...prev, file }));
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Gestionar Patrocinadores</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center mb-8">
        {sponsors.map((sponsor) => (
          <div
            key={sponsor.id}
            className="group relative bg-[#181c2a] rounded-lg border border-gray-700 hover:border-blue-400 transition-all duration-300 p-3 sm:p-8 w-full h-40 flex items-center justify-center hover:bg-[#23263a] shadow-md"
          >
            <a
              href={sponsor.link}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full h-full flex items-center justify-center"
            >
              <div className="relative w-full h-full flex items-center justify-center">
                <Image
                  src={sponsor.image}
                  alt={sponsor.alt}
                  fill
                  className="object-contain filter brightness-0 invert group-hover:brightness-100 group-hover:invert-0 group-hover:scale-110 transition-all duration-300"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
            </a>
            <button
              className="absolute top-2 right-2 bg-red-500 text-white rounded-full px-2 text-xs opacity-80 hover:opacity-100"
              onClick={() => handleRemoveSponsor(sponsor.id)}
              title="Eliminar patrocinador"
            >
              ×
            </button>
          </div>
        ))}
      </div>
      <div className="bg-white p-6 rounded-lg shadow mb-8">
        <h3 className="font-semibold mb-2">Agregar nuevo patrocinador</h3>
        <input
          type="text"
          placeholder="Nombre/alt del patrocinador"
          className="border p-2 rounded w-full mb-2"
          value={newSponsor.alt}
          onChange={(e) =>
            setNewSponsor((prev) => ({ ...prev, alt: e.target.value }))
          }
        />
        <input
          type="text"
          placeholder="Link del patrocinador"
          className="border p-2 rounded w-full mb-2"
          value={newSponsor.link}
          onChange={(e) =>
            setNewSponsor((prev) => ({ ...prev, link: e.target.value }))
          }
        />
        <div className="border-2 border-dashed border-blue-400 rounded-lg p-4 text-center cursor-pointer mb-2">
          <p className="mb-2">Selecciona la imagen del patrocinador</p>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            id="sponsor-image-upload"
            onChange={handleImageChange}
          />
          <label
            htmlFor="sponsor-image-upload"
            className="bg-blue-600 text-white px-4 py-2 rounded cursor-pointer"
          >
            Subir Imagen
          </label>
        </div>
        {newSponsor.file && (
          <div className="flex flex-wrap gap-2 mb-2">
            <img
              src={URL.createObjectURL(newSponsor.file)}
              alt="preview"
              className="w-16 h-16 object-cover rounded"
            />
          </div>
        )}
        <button
          className="bg-green-600 text-white px-4 py-2 rounded"
          onClick={handleAddSponsor}
          disabled={!newSponsor.alt || !newSponsor.link || !newSponsor.file}
        >
          Agregar Patrocinador
        </button>
      </div>
    </div>
  );
};

export default SponsorsManager;
