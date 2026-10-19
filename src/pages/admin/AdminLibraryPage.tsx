import { Plus, PencilLine, Search, Eye } from "lucide-react";
import { AdminBadge, AdminEmptyState } from "../../layouts/AdminLayout";

const libraryResources = [
  { id: 1, title: "Muntu et civilisation", category: "Pensée", type: "Essai", cover: "M", status: "Publié" },
  { id: 2, title: "Le manifeste de l'Afrique vivante", category: "Manifestes", type: "Manifeste", cover: "M", status: "À valider" },
  { id: 3, title: "La transmission du savoir", category: "Formation", type: "Vidéo", cover: "V", status: "Brouillon" },
];

export default function AdminLibraryPage() {
  return (
    <div className="space-y-6">
      <section className="rounded-[28px] border border-[#d7cfba] bg-[#fffdf9] p-6 shadow-sm md:p-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#7a6b3d]">Bibliothèque du Muntu</p>
            <h2 className="mt-2 font-serif text-3xl text-[#0f2d22]">Gestion des ressources</h2>
          </div>

          <button type="button" className="inline-flex items-center gap-2 rounded-xl bg-[#0f2d22] px-4 py-3 text-sm font-medium text-white hover:bg-[#173b2d]">
            <Plus size={16} />
            Ajouter une ressource
          </button>
        </div>
      </section>

      <section className="rounded-[24px] border border-[#d7cfba] bg-white p-5 shadow-sm">
        <div className="mb-5 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <label className="flex w-full max-w-md items-center gap-2 rounded-xl border border-[#d7cfba] bg-[#fffdf9] px-3 py-2 text-sm text-[#4d4d4d]">
            <Search size={16} className="text-[#6e5d35]" />
            <input placeholder="Rechercher une ressource" className="w-full border-0 bg-transparent text-sm text-[#1f2a1f] outline-none placeholder:text-[#8a827b]" />
          </label>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {libraryResources.map((resource) => (
            <article key={resource.id} className="overflow-hidden rounded-2xl border border-[#e8dfcd] bg-[#fffdf9]">
              <div className="flex h-36 items-center justify-center bg-[linear-gradient(180deg,#0f2d22,#254d3d)] text-4xl font-serif text-[#f5f1e6]">
                {resource.cover}
              </div>
              <div className="p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs uppercase tracking-[0.12em] text-[#7a6b3d]">{resource.category}</p>
                    <h3 className="mt-2 font-serif text-xl text-[#0f2d22]">{resource.title}</h3>
                  </div>
                  <AdminBadge status={resource.status} />
                </div>

                <div className="mt-4 flex items-center justify-between text-sm text-[#5d564e]">
                  <span>{resource.type}</span>
                  <span className="font-medium text-[#0f2d22]">#{resource.id}</span>
                </div>

                <div className="mt-5 flex gap-2">
                  <button type="button" className="flex items-center gap-2 rounded-xl border border-[#d7cfba] bg-white px-3 py-2 text-sm text-[#0f2d22]">
                    <Eye size={16} />
                    Voir
                  </button>
                  <button type="button" className="flex items-center gap-2 rounded-xl border border-[#d7cfba] bg-white px-3 py-2 text-sm text-[#0f2d22]">
                    <PencilLine size={16} />
                    Modifier
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-6">
          <AdminEmptyState
            title="Aucune ressource supplémentaire"
            description="L'interface de gestion de la bibliothèque est prête pour l’ajout de nouvelles ressources et de contenus éditoriaux."
          />
        </div>
      </section>
    </div>
  );
}
