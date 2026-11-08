import { Button, Eyebrow } from "@/components/ui";

export default function NotFound() {
  return (
    <main className="flex min-h-[80svh] items-center bg-paper pt-[72px]">
      <div className="wrap">
        <Eyebrow>Erreur 404</Eyebrow>
        <h1 className="t-display mt-6 text-[clamp(2.6rem,9vw,8rem)]">Hors <span className="text-text-subtle">carte.</span></h1>
        <p className="mt-6 max-w-md text-[18px] text-text-muted">Même nos robots ne trouvent pas cette page. Elle a peut-être changé d&rsquo;adresse avec la refonte du site.</p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Button href="/robots">Voir les robots</Button>
          <Button href="/" variant="line">Accueil</Button>
        </div>
      </div>
    </main>
  );
}
