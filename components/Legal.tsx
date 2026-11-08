// Pages légales : textes repris tels quels du site actuel (lib/legal.json), mise en page éditoriale.
import legal from "@/lib/legal.json";
import { Eyebrow } from "./ui";

type Block = [string, string];

export default function Legal({ id }: { id: "mentions-legales" | "politique-confidentialite" | "cgv" }) {
  const blocks = (legal as unknown as Record<string, Block[]>)[id];
  const kicker = blocks[0][1];
  const title = blocks[1][1].replace(/­/g, "").replace(/\.$/, "");
  const rest = blocks.slice(2);
  const out: React.ReactNode[] = [];
  let list: string[] = [];
  const flush = (k: number) => {
    if (list.length) out.push(<ul key={`l${k}`} className="my-4 grid list-disc gap-1.5 pl-5 marker:text-text-subtle">{list.map((t) => <li key={t}>{t}</li>)}</ul>);
    list = [];
  };
  rest.forEach(([tag, text], k) => {
    if (tag === "li") return void list.push(text);
    flush(k);
    if (tag === "h2") out.push(<h2 key={k} className="mt-14 text-[24px] t-h3  text-ink">{text}</h2>);
    else if (tag === "h3") out.push(<h3 key={k} className="mt-8 text-[18px] font-semibold text-ink">{text}</h3>);
    else out.push(<p key={k} className="mt-4">{text}</p>);
  });
  flush(rest.length);
  return (
    <main className="bg-paper pt-[72px]">
      <div className="wrap grid gap-12 py-20 lg:grid-cols-[0.6fr_1.4fr] lg:py-28">
        <div>
          <Eyebrow>{kicker}</Eyebrow>
          <h1 className="t-h2 mt-5">{title}</h1>
        </div>
        <article className="max-w-[72ch] text-[16px] leading-relaxed text-text-muted">{out}</article>
      </div>
    </main>
  );
}
