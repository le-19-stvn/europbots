// d'après sections.md « cartes projets » (dafolle : image intérieure 108 % → 100 %) + fiche technique Europbots (réf. en mono).
import Link from "next/link";
import type { Robot } from "@/lib/robots";
import { Arrow, Stage } from "./ui";

export default function RobotCard({ robot, index, priority }: { robot: Robot; index?: number; priority?: boolean }) {
  const lead = robot.stats.slice(0, 2);
  return (
    <Link href={`/robots/${robot.slug}`} className="group flex h-full flex-col">
      <Stage className="aspect-[4/5] overflow-hidden">
        <div className="absolute left-5 top-5 z-10 flex items-center gap-2">
          <span className="t-mono text-text-subtle">{index !== undefined ? String(index + 1).padStart(2, "0") : robot.maker}</span>
        </div>
        <span className="t-mono absolute right-5 top-5 z-10 rounded-full bg-paper px-2.5 py-1 text-[12px] text-text-muted">{robot.label}</span>
        <span className="floor-glow" />
        <img
          src={robot.image}
          alt={`${robot.name}, robot ${robot.category === "nettoyage" ? "de nettoyage" : robot.category === "logistique" ? "logistique" : "de service"} ${robot.maker}`}
          loading={priority ? "eager" : "lazy"}
          className="absolute inset-x-[12%] bottom-[9%] top-[13%] m-auto h-[78%] w-[76%] object-contain mix-blend-multiply transition-transform duration-[900ms] ease-[cubic-bezier(.32,.72,0,1)] group-hover:scale-[1.06]"
        />
        {robot.photo && (
          <img
            src={robot.photo}
            alt=""
            loading="lazy"
            className="absolute inset-0 h-full w-full scale-[1.08] object-cover opacity-0 transition-[opacity,transform] duration-[700ms] ease-[cubic-bezier(.32,.72,0,1)] group-hover:scale-100 group-hover:opacity-100"
          />
        )}
        <div className="absolute inset-x-0 bottom-0 z-10 flex translate-y-full gap-px transition-transform duration-[450ms] ease-[cubic-bezier(.32,.72,0,1)] group-hover:translate-y-0">
          {lead.map((s) => (
            <div key={s.label} className="flex-1 bg-ink/90 px-4 py-3 text-on-dark backdrop-blur">
              <div className="text-[18px] t-h3 ">{s.value}</div>
              <div className="t-mono text-[12px] text-on-dark-muted">{s.label}</div>
            </div>
          ))}
        </div>
      </Stage>
      <div className="flex items-start justify-between gap-4 pt-5">
        <div>
          <p className="t-mono text-text-subtle">{robot.maker}</p>
          <h3 className="mt-1 text-[24px] t-h3 leading-tight ">{robot.name}</h3>
          <p className="mt-2 text-[15px] leading-snug text-text-muted">{robot.tagline}</p>
        </div>
        <span className="mt-1 grid h-10 w-10 shrink-0 place-items-center rounded-full border border-border transition-colors duration-300 group-hover:border-ink group-hover:bg-ink group-hover:text-lime">
          <Arrow size={15} />
        </span>
      </div>
    </Link>
  );
}
