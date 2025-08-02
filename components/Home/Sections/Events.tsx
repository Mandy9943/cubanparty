import Image from "next/image";
import SectionTitle from "../SectionTItle";
import MapButton from "./MapButton";

const Events = () => {
  const upcomingEvents = [
    {
      id: 1,
      title: "Nostalgia a lo Cubano",
      description:
        "Quieres vivir la experiencia de una Noche de la Nostalgia diferente, ven con nosotros que no te vas a arrepentir, te esperamos este 15 de Agosto.",
      date: "August 15, 2025",
      time: "23:50",
      venue: "L Club",
      address: "Uruguay 1136, Montevideo, Centro",
      image: "/assets/events/nostalgia.jpg",
      price: "Desde $350",
      pricing: {
        general: "$350",
        mesa4vip: "$2500 (4 personas)",
        mesa3vip: "$3000 (5 personas)",
      },
      buyTicketLink:
        "https://www.passline.com/eventos/nostalgia-a-lo-cubano?fbclid=PAZXh0bgNhZW0CMTEAAafqmJZ_0tZx7zO5wPW2wE6M6nivvUTLYv7wmm8LRgUZvhfwwyy4JHyiDCPKIQ_aem_7bboxqvfcP5flxiRfX7v1g",
    },
    {
      id: 2,
      title: "Adolescentes en Concierto por primera vez en Uruguay",
      description:
        "Los ex adolescentes, voces originales se reúnen para hacer sus grandes éxitos mundiales por primera vez en la historia en Uruguay. Tendremos una noche increíble de música en vivo y fiesta latina que quedará marcada en la historia.",
      date: "September 13, 2025",
      time: "23:00",
      venue: "L Club Montevideo",
      address: "Av. Uruguay 1136, 11100 Montevideo, Depto",
      image: "/assets/events/adolescentes.jpg",
      price: "Desde $1060",
      pricing: {
        preventa: "$1060 (Agotado)",
        lote1: "$1360 (Agotado)",
        lote2: "$1560",
        vip5personas: "$11300 ($2260 cada una)",
        vippalco12personas: "$24720 ($2060 cada una)",
      },
      buyTicketLink:
        "https://redtickets.uy/evento/Adolescentes-en-Concierto-por-primera-vez-en-Uruguay/22726/",
    },
  ];

  return (
    <section
      id="events"
      className="relative w-full bg-[#0a0d1a] text-white flex flex-col items-center justify-center py-20"
    >
      <div className="container text-center">
        <SectionTitle
          title="Eventos"
          subtitle="No te pierdas nuestras fiestas"
        />
        <p className="mt-6 max-w-2xl mx-auto text-gray-400 font-sans text-sm md:text-base px-4 md:px-0 mb-12">
          Descubre los mejores eventos de música latina en Uruguay. Reserva tu
          entrada y vive una experiencia inolvidable.
        </p>
      </div>

      {/* Events List */}
      <div className="container px-4 md:px-0 font-sans">
        <div className="grid gap-6 md:grid-cols-2">
          {upcomingEvents.map((event) => (
            <div
              key={event.id}
              className="bg-white/5 border border-[var(--text-color2)]/20 overflow-hidden hover:bg-white/10 transition-all duration-300 has-[:checked]:[&_.expand-content]:grid-rows-[1fr] has-[:checked]:[&_.toggle-text]:hidden has-[:checked]:[&_.toggle-text-close]:block h-fit"
            >
              {/* Hidden checkbox for CSS toggle */}
              <input
                type="checkbox"
                id={`event-toggle-${event.id}`}
                className="sr-only"
              />

              {/* Card Header - Always Visible */}
              <div className="relative h-48">
                <Image
                  src={event.image}
                  alt={event.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                {/* Date Badge */}
                <div className="absolute top-4 left-4 bg-[var(--text-color2)] text-black px-3 py-2 text-center">
                  <div className="text-lg font-bold">
                    {new Date(event.date).getDate()}
                  </div>
                  <div className="text-xs uppercase font-semibold">
                    {new Date(event.date).toLocaleDateString("es-ES", {
                      month: "short",
                    })}
                  </div>
                </div>

                {/* Price Badge */}
                <div className="absolute top-4 right-4 bg-black/70 text-white px-3 py-1 text-sm font-semibold">
                  {event.price}
                </div>

                {/* Basic Info Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <h3 className="text-xl font-bold mb-1 line-clamp-2">
                    {event.title}
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-gray-200 mb-2">
                    <span className="text-[var(--text-color2)]">📍</span>
                    <span>{event.venue}</span>
                    <span className="text-[var(--text-color2)]">🕐</span>
                    <span>{event.time}</span>
                  </div>
                </div>
              </div>

              {/* Card Content */}
              <div className="p-4">
                {/* Description Preview */}
                <p className="text-gray-300 text-sm mb-4 line-clamp-2">
                  {event.description}
                </p>

                {/* Action Buttons */}
                <div className="flex gap-2 mb-4">
                  <a
                    href={event.buyTicketLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-[var(--text-color2)] text-black px-4 py-2 font-semibold text-center hover:bg-[var(--text-color2)]/90 transition-colors duration-300"
                  >
                    Comprar Entradas
                  </a>
                  <label
                    htmlFor={`event-toggle-${event.id}`}
                    className="px-4 flex justify-center items-center py-2 border border-[var(--text-color2)]/30 text-[var(--text-color2)] hover:bg-[var(--text-color2)]/10 transition-colors duration-300 cursor-pointer select-none"
                  >
                    <span className="toggle-text">Más info</span>
                    <span className="toggle-text-close hidden">Menos</span>
                  </label>
                </div>

                {/* Expanded Details - CSS Animation */}
                <div className="expand-content grid grid-rows-[0fr] transition-[grid-template-rows] duration-500 ease-in-out">
                  <div className="overflow-hidden">
                    <div className="border-t border-gray-700 pt-4 space-y-4">
                      {/* Event Details */}
                      <div>
                        <h4 className="text-[var(--text-color2)] font-semibold mb-2">
                          Detalles del evento
                        </h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-400">Fecha:</span>
                            <span className="text-gray-200">
                              {new Date(event.date).toLocaleDateString(
                                "es-ES",
                                {
                                  weekday: "long",
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                }
                              )}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Hora:</span>
                            <span className="text-gray-200">{event.time}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-gray-400">Ubicación:</span>
                            <div className="flex items-center gap-2">
                              <span className="text-gray-200">
                                {event.address}
                              </span>
                              <MapButton address={event.address} />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Pricing Details */}
                      {event.pricing && (
                        <div>
                          <h4 className="text-[var(--text-color2)] font-semibold mb-2">
                            Precios de entrada
                          </h4>
                          <div className="bg-black/30 p-3 border border-[var(--text-color2)]/10">
                            <div className="space-y-1 text-sm">
                              {event.id === 1 ? (
                                <>
                                  <div className="flex justify-between">
                                    <span className="text-gray-300">
                                      Lote 1 General:
                                    </span>
                                    <span className="font-semibold text-white">
                                      {event.pricing.general}
                                    </span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-gray-300">
                                      Mesa 4 VIP:
                                    </span>
                                    <span className="font-semibold text-white">
                                      {event.pricing.mesa4vip}
                                    </span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-gray-300">
                                      Mesa 3 VIP:
                                    </span>
                                    <span className="font-semibold text-white">
                                      {event.pricing.mesa3vip}
                                    </span>
                                  </div>
                                </>
                              ) : (
                                <>
                                  <div className="flex justify-between">
                                    <span className="text-gray-300">
                                      Preventa:
                                    </span>
                                    <span className="font-semibold text-red-400">
                                      {event.pricing.preventa}
                                    </span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-gray-300">
                                      1er Lote:
                                    </span>
                                    <span className="font-semibold text-red-400">
                                      {event.pricing.lote1}
                                    </span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-gray-300">
                                      2do Lote:
                                    </span>
                                    <span className="font-semibold text-white">
                                      {event.pricing.lote2}
                                    </span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-gray-300">
                                      VIP 5 personas:
                                    </span>
                                    <span className="font-semibold text-white">
                                      {event.pricing.vip5personas}
                                    </span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-gray-300">
                                      VIP Palco 12 personas:
                                    </span>
                                    <span className="font-semibold text-white">
                                      {event.pricing.vippalco12personas}
                                    </span>
                                  </div>
                                </>
                              )}
                            </div>
                            <div className="text-xs text-gray-400 mt-2 italic">
                              * Precios online, pueden variar en el local
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Events;
