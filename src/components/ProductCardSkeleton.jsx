export default function ProductCardSkeleton() {
  return (
    <div className="cursor-pointer bg-slate-900 border border-slate-700/60 rounded-2xl overflow-hidden shadow-lg animate-pulse">
      {/* Image */}
      <div className="w-full h-36 bg-slate-800" />

      {/* Content */}
      <div className="p-3 flex flex-col gap-2">
        {/* Category   */}
        <div className="h-3 w-32 bg-slate-800 rounded-full" />

        {/* Title + Price */}
        <div className="flex justify-between items-center gap-2">
          <div className="h-4 w-28 bg-slate-800 rounded-full" />
          <div className="h-4 w-16 bg-slate-800 rounded-full" />
        </div>

        {/* Delivery Location */}
        <div className="h-3 w-24 bg-slate-800 rounded-full" />
      </div>
    </div>
  );
}
