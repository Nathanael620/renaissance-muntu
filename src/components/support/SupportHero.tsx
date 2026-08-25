import { heroContent } from "../../data/siteData";
import elimbaLogo from "../../assets/icons/elimba.jpeg";
import menerLogo from "../../assets/images/Mener_Autrement.png";

export default function SupportHero() {
  return (
    <section className="bg-creme-clair px-4 py-14 md:py-20 lg:py-24">
      <div className="mx-auto max-w-[1200px]">
        <div className="mb-5 flex flex-wrap items-center gap-x-10 gap-y-4 sm:gap-x-14">
          <img
            src={elimbaLogo}
            alt="Logo Elimb'a Dikalo"
            className="h-20 w-auto object-contain sm:h-24"
          />
          <span className="hidden h-24 w-px bg-vert/25 sm:block" aria-hidden="true" />
          <img
            src={menerLogo}
            alt="Logo Mener Autrement"
            className="h-16 w-auto object-contain sm:h-[74px]"
          />
        </div>
        <h1 className="font-serif text-3xl font-semibold uppercase text-vert">
          Soutenez le programme Elimb’a Dikalo de Mener Autrement
        </h1>
        <p className="mt-4 max-w-3xl font-sans text-sm text-anthracite">
          {heroContent.pillarCard?.tagline ?? "Soutenez nos actions et nos programmes."}
        </p>
      </div>
    </section>
  );
}
