import { useEffect, useState } from "react";

export default function FilterSize({ filter, setFilter }) {
  let sizes = [
    { name: "XS" },
    { name: "S" },
    { name: "M" },
    { name: "L" },
    { name: "XL" },
    { name: "XXL" },
  ];

  const [addedSize, setAddedSize] = useState(filter.size);

  useEffect(() => {
    setAddedSize(filter.size);
  }, [filter.size]);

  useEffect(() => {
    setFilter((filter) => ({ ...filter, size: addedSize }));
    console.log(addedSize);
  }, [addedSize]);

  return (
    <>
      <div className="flex flex-col p-3 gap-1">
        <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-widest px-2 py-2">
          Méret
        </h2>
        <div className="flex flex-wrap gap-2">
          {sizes.map((s, index) => (
            <div
              key={index}
              onClick={() =>
                setAddedSize(
                  addedSize.includes(s.name)
                    ? addedSize.filter((aS) => aS !== s.name)
                    : [...addedSize, s.name],
                )
              }
              className={`cursor-pointer rounded-lg px-3 py-1.5 text-sm font-medium border transition-all duration-200 ${
                addedSize.includes(s.name)
                  ? "bg-violet-500/20 text-violet-400 border-violet-500/30"
                  : "text-slate-400 border-slate-700/60 hover:border-violet-500/30 hover:text-violet-400"
              }`}
            >
              {s.name}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
