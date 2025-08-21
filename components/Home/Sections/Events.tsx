import { adaptEventDocuments } from "@/components/Dashboard/Events/utils";
import { createAdminClient } from "@/lib/server/appwrite";
import { DATABASE_ID, EVENTS_COLLECTION_ID } from "@/lib/server/consts";
import clsx from "clsx";
import Image from "next/image";
import { Query } from "node-appwrite";
import SectionTitle from "../SectionTItle";
import MapButton from "./MapButton";

const Events = async () => {
  const { databases } = await createAdminClient();
  const res = await databases.listDocuments(DATABASE_ID, EVENTS_COLLECTION_ID, [
    Query.orderDesc("date"),
    Query.limit(100),
  ]);
  const allEvents = adaptEventDocuments(res.documents);
  const now = new Date();
  const upcomingEvents = allEvents.filter((e) => {
    try {
      return new Date(e.date) >= now && e.status !== "cancelled";
    } catch {
      return false;
    }
  });
  const listToRender = upcomingEvents.length ? upcomingEvents : allEvents;

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

      <div className="container px-4 md:px-0 font-sans">
        <div
          className={clsx(
            "grid gap-6",
            listToRender.length === 1
              ? "grid-cols-1 justify-items-center"
              : "md:grid-cols-2"
          )}
        >
          {listToRender.map((event) => (
            <div
              key={event.id}
              className="bg-white/5 border border-[var(--text-color2)]/20 overflow-hidden hover:bg-white/10 transition-all duration-300 has-[:checked]:[&_.expand-content]:grid-rows-[1fr] has-[:checked]:[&_.toggle-text]:hidden has-[:checked]:[&_.toggle-text-close]:block h-fit"
            >
              <input
                type="checkbox"
                id={`event-toggle-${event.id}`}
                className="sr-only"
              />

              <div className="relative h-64">
                <Image
                  src={event.image}
                  alt={event.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

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

                <div className="absolute top-4 right-4 bg-black/70 text-white px-3 py-1 text-sm font-semibold">
                  {event.price}
                </div>

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

              <div className="p-4">
                <p className="text-gray-300 text-sm mb-4 line-clamp-2">
                  {event.description}
                </p>

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

                <div className="expand-content grid grid-rows-[0fr] transition-[grid-template-rows] duration-500 ease-in-out">
                  <div className="overflow-hidden">
                    <div className="border-t border-gray-700 pt-4 space-y-4">
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

                      {event.pricing &&
                        Object.keys(event.pricing).length > 0 && (
                          <div>
                            <h4 className="text-[var(--text-color2)] font-semibold mb-2">
                              Precios de entrada
                            </h4>
                            <div className="bg-black/30 p-3 border border-[var(--text-color2)]/10">
                              <div className="space-y-1 text-sm">
                                {Object.entries(event.pricing).map(
                                  ([label, value]) => {
                                    const text = String(value ?? "");
                                    const valueClass = text
                                      .toLowerCase()
                                      .includes("agotado")
                                      ? "text-red-400"
                                      : "text-white";
                                    return (
                                      <div
                                        key={label}
                                        className="flex justify-between"
                                      >
                                        <span className="text-gray-300">
                                          {label}:
                                        </span>
                                        <span
                                          className={`font-semibold ${valueClass}`}
                                        >
                                          {text}
                                        </span>
                                      </div>
                                    );
                                  }
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
