import { useFadeIn } from "../../hooks/useFadeIn";
import { pillars } from "../../data/siteData";
import { cn } from "../../utils/cn";
import africaIcon from "../../assets/icons/Africa.png";
import elimbaIcon from "../../assets/icons/elimba.jpeg";
import transmissionIcon from "../../assets/icons/transmission.png";
import academieIcon from "../../assets/icons/academie.png";
import bibliothequeIcon from "../../assets/icons/bibliotheque.png";
import renaissanceImg from "../../assets/images/renaissance.png";
import elimbaImg from "../../assets/images/elimba.png";
import transmissionImg from "../../assets/images/transmission.png";
import academieImg from "../../assets/images/academie.png";
import bibliothequeImg from "../../assets/images/bibliotheque.png";

const images: Record<string, string> = {
  "renaissance.png": renaissanceImg,
  "elimba.png": elimbaImg,
  "transmission.png": transmissionImg,
  "academie.png": academieImg,
  "bibliotheque.png": bibliothequeImg,
};

/** Pages dédiées des piliers (lien interne via pushState). */
const pillarRoutes: Record<string, string> = {
  "renaissance-des-peuples": "/#piliers",
  elimba: "/elimba",
  "bibliotheque-muntu": "/bibliotheque",
  "transmission-muntu": "/transmission-muntu",
  "academie-muntu": "/academie-muntu",
};

function PillarMedallion({ id }: { id: number }) {
  const base =
    "absolute left-1/2 top-full z-10 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center overflow-hidden rounded-full border-[3px] border-creme bg-white shadow-md";

  if (id === 1) {
    return (
      <div className={base}>
        <img src={africaIcon} alt="" className="h-full w-full object-cover object-left" />
      </div>
    );
  }
  if (id === 2) {
    return (
      <div className={base}>
        <img src={elimbaIcon} alt="" className="h-full w-full object-cover object-left" />
      </div>
    );
  }
  if (id === 3) {
    return (
      <div className={base}>
        <img src={transmissionIcon} alt="" className="h-full w-full object-cover object-left" />
      </div>
    );
  }
  if (id === 4) {
    return (
      <div className={base}>
        <img src={academieIcon} alt="" className="h-full w-full object-cover object-left" />
      </div>
    );
  }
  return (
    <div className={base}>
      <img src={bibliothequeIcon} alt="" className="h-full w-full object-cover object-left" />
    </div>
  );
}

export default function Piliers() {
  const { ref, visible } = useFadeIn<HTMLElement>();

  return (
    <section
      id="piliers"
      ref={ref}
      className="bg-creme px-4 py-14 md:px-8 md:py-16 lg:px-10 lg:py-20"
      aria-labelledby="piliers-title"
    >
      <div className="mx-auto max-w-[1440px]">
        <div className="mb-10 flex items-center justify-center gap-4 md:mb-14 md:gap-6">
          <span className="hidden h-px flex-1 max-w-40 bg-or/60 sm:block" aria-hidden />
          <h2
            id="piliers-title"
            className="text-center font-serif text-xl font-semibold uppercase tracking-wide text-vert md:text-2xl lg:text-3xl"
          >
            Nos 5 piliers fondamentaux
          </h2>
          <span className="hidden h-px flex-1 max-w-40 bg-or/60 sm:block" aria-hidden />
        </div>

        <div
          className={cn(
            "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5 lg:gap-4 xl:gap-5",
            visible && "animate-fade-in",
          )}
        >
          {pillars.map((pillar) => (
            <article
              key={pillar.id}
              id={pillar.slug === "elimba" ? "elimba" : undefined}
              className={cn(
                "group flex flex-col overflow-hidden rounded-2xl border border-or/30 bg-creme-clair",
                "shadow-sm transition-shadow duration-300 hover:shadow-md",
              )}
            >
              <div className="relative">
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={images[pillar.image]}
                    alt=""
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    loading="lazy"
                  />
                </div>
                <PillarMedallion id={pillar.id} />
              </div>

              <div className="flex flex-1 flex-col px-4 pb-5 pt-10 text-center">
                <h3 className="font-serif text-sm font-bold uppercase leading-snug text-vert md:text-[13px] xl:text-sm">
                  {pillar.id}. {pillar.title}
                </h3>
                <p className="mt-2 flex-1 font-sans text-[11px] leading-relaxed text-anthracite/80">
                  {pillar.themes.join(" • ")}
                </p>
                
                <a
                  href={pillarRoutes[pillar.slug] ?? `#${pillar.slug}`}
                  onClick={(event) => {
                    const href = pillarRoutes[pillar.slug] ?? `#${pillar.slug}`;
                    if (href.startsWith("/")) {
                      event.preventDefault();
                      window.history.pushState({}, "", href);
                      window.dispatchEvent(new Event("routechange"));
                    }
                  }}
                  className={cn(
                    "mt-4 inline-flex items-center justify-center rounded-md border border-or/50 bg-creme px-4 py-2",
                    "font-sans text-[11px] font-semibold uppercase tracking-wide text-vert",
                    "transition-colors duration-200 hover:border-or hover:bg-or/10",
                  )}
                >
                  Découvrir
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}