"use client";
import { useGetEvents } from "@/swr/useEvents";
import useSession from "@/swr/useSession";
import { useGetSponsors } from "@/swr/useSponsors";
import { useGetStaff } from "@/swr/useStaff";
import { useGetTestimonials } from "@/swr/useTestimonials";
import {
  Award,
  Calendar,
  Image as ImageIcon,
  MessageCircle,
  Users,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

function StatCard({
  title,
  value,
  icon: Icon,
  href,
}: {
  title: string;
  value: number | string;
  icon: any;
  href?: string;
}) {
  const content = (
    <div className="flex items-center justify-between bg-white rounded-lg shadow p-5 hover:shadow-md transition-shadow">
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-2xl font-semibold text-gray-900">{value}</p>
      </div>
      <div className="p-3 rounded-full bg-gray-100 text-gray-700">
        <Icon className="w-5 h-5" />
      </div>
    </div>
  );
  return href ? (
    <Link href={href} className="block">
      {content}
    </Link>
  ) : (
    content
  );
}

export default function Dashboard() {
  const { user } = useSession();
  const { events, isLoading: loadingEvents } = useGetEvents();
  const { sponsors, isLoading: loadingSponsors } = useGetSponsors();
  const { staff, isLoading: loadingStaff } = useGetStaff();
  const { testimonials, isLoading: loadingTestimonials } = useGetTestimonials();
  const [onlyUpcoming, setOnlyUpcoming] = useState(true);

  const totalEvents = loadingEvents ? "–" : events.length;
  const totalSponsors = loadingSponsors ? "–" : sponsors.length;
  const totalStaff = loadingStaff ? "–" : staff?.total ?? 0;
  const totalTestimonials = loadingTestimonials ? "–" : testimonials.length;

  const recentEvents = useMemo(() => {
    const list = onlyUpcoming
      ? events.filter((e) => {
          const d = new Date(e.date).getTime();
          const now = Date.now() - 24 * 60 * 60 * 1000; // tolerancia 1 día
          return d >= now;
        })
      : events;
    return list.slice(0, 5);
  }, [events, onlyUpcoming]);
  const recentTestimonials = testimonials.slice(0, 4);
  const recentSponsors = sponsors.slice(0, 8);

  return (
    <div className="p-6 md:p-8 space-y-8">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
          {user?.name ? `Hola, ${user.name}` : "Dashboard"}
        </h1>
        <p className="text-gray-600 mt-1">
          Resumen de actividad y accesos rápidos
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Eventos"
          value={totalEvents}
          icon={Calendar}
          href="/dashboard/eventos"
        />
        <StatCard
          title="Staff"
          value={totalStaff}
          icon={Users}
          href="/dashboard/staff"
        />
        <StatCard
          title="Patrocinadores"
          value={totalSponsors}
          icon={Award}
          href="/dashboard/patrocinadores"
        />
        <StatCard
          title="Comentarios"
          value={totalTestimonials}
          icon={MessageCircle}
          href="/dashboard/comentarios"
        />
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            title: "Gestionar eventos",
            desc: "Crear y editar eventos",
            href: "/dashboard/eventos",
            icon: Calendar,
          },
          {
            title: "Gestionar staff",
            desc: "Miembros y roles",
            href: "/dashboard/staff",
            icon: Users,
          },
          {
            title: "Gestionar comentarios",
            desc: "Testimonios y feedback",
            href: "/dashboard/comentarios",
            icon: MessageCircle,
          },
          {
            title: "Gestionar patrocinadores",
            desc: "Logos y enlaces",
            href: "/dashboard/patrocinadores",
            icon: Award,
          },
        ].map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="group bg-white rounded-lg shadow p-5 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-gray-900 group-hover:text-gray-800">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-500 mt-1">{item.desc}</p>
              </div>
              <div className="p-2 rounded-md bg-gray-100 text-gray-700">
                <item.icon className="w-5 h-5" />
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Lists */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Events */}
        <div className="bg-white rounded-lg shadow p-5 lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Eventos</h2>
            <div className="flex items-center gap-3">
              <label className="flex items-center gap-2 text-sm text-gray-600">
                <input
                  type="checkbox"
                  checked={onlyUpcoming}
                  onChange={(e) => setOnlyUpcoming(e.target.checked)}
                  className="rounded border-gray-300 text-gray-900 focus:ring-gray-900"
                />
                Solo próximos
              </label>
              <Link
                href="/dashboard/eventos"
                className="text-sm text-gray-600 hover:text-gray-900"
              >
                Ver todos
              </Link>
            </div>
          </div>
          <ul className="divide-y divide-gray-100">
            {loadingEvents && (
              <li className="py-4 text-sm text-gray-500">Cargando eventos…</li>
            )}
            {!loadingEvents && recentEvents.length === 0 && (
              <li className="py-4 text-sm text-gray-500">No hay eventos aún</li>
            )}
            {recentEvents.map((ev) => (
              <li
                key={ev.$id}
                className="py-3 flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3 min-w-0">
                  {ev.image ? (
                    <div className="relative w-12 h-12 flex-shrink-0 rounded overflow-hidden bg-gray-100">
                      <Image
                        src={ev.image}
                        alt={ev.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-12 h-12 flex items-center justify-center rounded bg-gray-100 text-gray-400">
                      <ImageIcon className="w-5 h-5" />
                    </div>
                  )}
                  <div className="min-w-0">
                    <p className="font-medium text-gray-900 truncate">
                      {ev.title}
                    </p>
                    <p className="text-sm text-gray-500">
                      {new Date(ev.date).toLocaleString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      ev.status
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {ev.status ? "Activo" : "Borrador"}
                  </span>
                  <Link
                    href="/dashboard/eventos"
                    className="text-xs text-gray-600 hover:text-gray-900"
                  >
                    Abrir
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Latest Testimonials */}
        <div className="bg-white rounded-lg shadow p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">
              Últimos comentarios
            </h2>
            <Link
              href="/dashboard/comentarios"
              className="text-sm text-gray-600 hover:text-gray-900"
            >
              Ver todos
            </Link>
          </div>
          <ul className="space-y-3">
            {loadingTestimonials && (
              <li className="text-sm text-gray-500">Cargando comentarios…</li>
            )}
            {!loadingTestimonials && recentTestimonials.length === 0 && (
              <li className="text-sm text-gray-500">No hay comentarios aún</li>
            )}
            {recentTestimonials.map((t) => (
              <li
                key={t.$id}
                className="p-3 bg-gray-50 rounded flex items-start gap-3"
              >
                {t.image ? (
                  <div className="relative w-10 h-10 rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
                    <Image
                      src={t.image}
                      alt={t.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-sm flex-shrink-0">
                    {t.name?.charAt(0).toUpperCase() || "U"}
                  </div>
                )}
                <div>
                  <p className="text-sm text-gray-700 line-clamp-3">
                    “{t.text}”
                  </p>
                  <p className="mt-1 text-xs text-gray-500">— {t.name}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Sponsors preview */}
      <div className="bg-white rounded-lg shadow p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">
            Patrocinadores
          </h2>
          <Link
            href="/dashboard/patrocinadores"
            className="text-sm text-gray-600 hover:text-gray-900"
          >
            Gestionar
          </Link>
        </div>
        {loadingSponsors ? (
          <p className="text-sm text-gray-500">Cargando patrocinadores…</p>
        ) : recentSponsors.length === 0 ? (
          <p className="text-sm text-gray-500">Sin patrocinadores aún</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4">
            {recentSponsors.map((s) => {
              const card = (
                <div className="flex flex-col items-center justify-center h-24 rounded border border-gray-100 bg-gray-50 text-gray-700 p-2">
                  {s.image ? (
                    <div className="relative w-full h-12 mb-2">
                      <Image
                        src={s.image}
                        alt={s.name}
                        fill
                        className="object-contain"
                      />
                    </div>
                  ) : (
                    <div className="flex items-center justify-center w-full h-12 mb-2 text-gray-400">
                      <ImageIcon className="w-6 h-6" />
                    </div>
                  )}
                  <span className="text-xs truncate w-full text-center">
                    {s.name}
                  </span>
                </div>
              );
              return s.link ? (
                <a
                  key={s.$id}
                  href={s.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  {card}
                </a>
              ) : (
                <div key={s.$id}>{card}</div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
