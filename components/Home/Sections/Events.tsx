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
        <div className="space-y-6 md:space-y-8">
          {upcomingEvents.map((event, index) => (
            <a
              key={event.id}
              className="group flex flex-col lg:flex-row gap-4 md:gap-6 lg:gap-8 hover:bg-white/5 transition-all duration-300  p-3 md:p-4 lg:p-6"
              href={event.buyTicketLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              {/* Mobile Layout: Date + Image Row */}
              <div className="flex lg:hidden gap-4 mb-4">
                {/* Date Section - Mobile */}
                <div className="flex-shrink-0 text-center w-16">
                  <div className="bg-[var(--text-color2)]/10 border border-[var(--text-color2)]/30  p-2">
                    <div className="text-lg font-bold text-[var(--text-color2)]">
                      {new Date(event.date).getDate()}
                    </div>
                    <div className="text-xs text-[var(--text-color2)] uppercase font-semibold">
                      {new Date(event.date).toLocaleDateString("es-ES", {
                        month: "short",
                      })}
                    </div>
                  </div>
                </div>

                {/* Image Section - Mobile */}
                <div className="flex-grow h-32">
                  <div className="relative w-full h-full overflow-hidden">
                    <Image
                      src={event.image}
                      alt={event.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 768px) 80vw, 320px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                  </div>
                </div>
              </div>

              {/* Desktop Date Section */}
              <div className="hidden lg:flex flex-shrink-0 text-center w-20 h-fit">
                <div className="bg-[var(--text-color2)]/10 border border-[var(--text-color2)]/30  p-4">
                  <div className="text-3xl font-bold text-[var(--text-color2)]">
                    {new Date(event.date).getDate()}
                  </div>
                  <div className="text-sm text-[var(--text-color2)] uppercase font-semibold">
                    {new Date(event.date).toLocaleDateString("es-ES", {
                      month: "short",
                    })}
                  </div>
                  <div className="text-xs text-gray-400">
                    {new Date(event.date).getFullYear()}
                  </div>
                </div>
              </div>

              {/* Content Section */}
              <div className="flex-grow">
                {/* Date and Time Info */}
                <div className="text-xs md:text-sm text-[var(--text-color2)] mb-2">
                  {new Date(event.date).toLocaleDateString("es-ES", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}{" "}
                  • {event.time}
                </div>

                {/* Event Title */}
                <h3 className="text-xl md:text-2xl lg:text-3xl font-bold mb-2 md:mb-3 group-hover:text-[var(--text-color2)] transition-colors duration-300">
                  {event.title}
                </h3>

                {/* Venue Info */}
                <div className="flex items-center gap-2 mb-1">
                  <div className="text-[var(--text-color2)] font-semibold text-sm md:text-base">
                    {event.venue}
                  </div>
                  <MapButton address={event.address} />
                </div>
                <div className="text-gray-400 text-xs md:text-sm mb-3 md:mb-4">
                  {event.address}
                </div>

                {/* Event Description */}
                <p className="text-gray-300 mb-3 md:mb-4 leading-relaxed text-sm md:text-base">
                  {event.description}
                </p>

                {/* Event Details */}
                <div className="flex flex-wrap items-center gap-3 md:gap-4 text-xs md:text-sm">
                  <div className="flex items-center gap-1 md:gap-2">
                    <span className="text-[var(--text-color2)]">🕐</span>
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center gap-1 md:gap-2">
                    <span className="text-[var(--text-color2)]">💰</span>
                    <span className="font-semibold">{event.price}</span>
                  </div>
                </div>

                {/* Special Pricing */}
                {event.pricing && (
                  <div className="mt-3 md:mt-4 p-3 bg-white/5  border border-[var(--text-color2)]/20">
                    <div className="text-xs md:text-sm text-[var(--text-color2)] font-semibold mb-2">
                      Precios de entrada:
                    </div>
                    <div className="space-y-1 text-xs md:text-sm">
                      {event.id === 1 ? (
                        <>
                          <div className="flex justify-between">
                            <span className="text-gray-300">
                              Lote 1 General:
                            </span>
                            <span className="font-semibold">
                              {event.pricing.general}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-300">Mesa 4 VIP:</span>
                            <span className="font-semibold">
                              {event.pricing.mesa4vip}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-300">Mesa 3 VIP:</span>
                            <span className="font-semibold">
                              {event.pricing.mesa3vip}
                            </span>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="flex justify-between">
                            <span className="text-gray-300">Preventa:</span>
                            <span className="font-semibold text-red-400">
                              {event.pricing.preventa}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-300">1er Lote:</span>
                            <span className="font-semibold text-red-400">
                              {event.pricing.lote1}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-300">2do Lote:</span>
                            <span className="font-semibold">
                              {event.pricing.lote2}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-300">
                              Ticket VIP 5 personas:
                            </span>
                            <span className="font-semibold">
                              {event.pricing.vip5personas}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-300">
                              Ticket VIP Palco 12 personas:
                            </span>
                            <span className="font-semibold">
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
                )}
              </div>

              {/* Desktop Image Section */}
              <div className="hidden lg:block flex-shrink-0 w-70 h-80">
                <div className="relative w-full h-full overflow-hidden">
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="320px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Events;
