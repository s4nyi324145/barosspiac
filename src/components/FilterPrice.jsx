export default function FilterPrice({ filter, setFilter }) {
  return (
    <div className="flex flex-col p-3 gap-1">
      <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-widest px-2 py-2">
        Ár
      </h2>

      <div className="flex items-center gap-2">
        <div className="flex-1 flex items-center bg-slate-800/60 border border-slate-700/60 rounded-xl px-3 py-2 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20 transition-all duration-200">
          <input
            type="number"
            placeholder="Min"
            value={filter.priceMin || ""}
            onChange={(e) => setFilter({ ...filter, priceMin: e.target.value })}
            className="w-full bg-transparent text-xs text-slate-200 placeholder-slate-600 outline-none"
          />
          <span className="text-slate-600 text-xs shrink-0">Ft</span>
        </div>

        <span className="text-slate-600 text-xs shrink-0">—</span>

        <div className="flex-1 flex items-center bg-slate-800/60 border border-slate-700/60 rounded-xl px-3 py-2 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20 transition-all duration-200">
          <input
            type="number"
            placeholder="Max"
            value={filter.priceMax || ""}
            onChange={(e) => setFilter({ ...filter, priceMax: e.target.value })}
            className="w-full bg-transparent text-xs text-slate-200 placeholder-slate-600 outline-none"
          />
          <span className="text-slate-600 text-xs shrink-0">Ft</span>
        </div>
      </div>
    </div>
  );
}
