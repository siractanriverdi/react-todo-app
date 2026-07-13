import { FILTERS } from "../interfaces/Todo";

const LABELS = {
  [FILTERS.ALL]: "Tümü",
  [FILTERS.ACTIVE]: "Yapılacak",
  [FILTERS.DONE]: "Tamamlanan",
};

/**
 * Görevleri duruma göre filtreleyen sekme çubuğu.
 * @param {{ filter: string, onChange: (f: string) => void, counts: Record<string, number> }} props
 */
function FilterBar({ filter, onChange, counts }) {
  return (
    <div role="tablist" aria-label="Görev filtresi" className="flex gap-1 rounded-lg bg-ink/5 p-1">
      {Object.values(FILTERS).map((f) => (
        <button
          key={f}
          role="tab"
          aria-selected={filter === f}
          onClick={() => onChange(f)}
          className={`flex-1 rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
            filter === f
              ? "bg-white text-ink shadow-sm"
              : "text-graphite hover:text-ink"
          }`}
        >
          {LABELS[f]} ({counts[f]})
        </button>
      ))}
    </div>
  );
}

export default FilterBar;
